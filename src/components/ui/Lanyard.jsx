import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

import idCardTexture from "../../assets/ID Card.png";
import lanyardTexture from "../../assets/Lanyard 2.png";

extend({ MeshLineGeometry, MeshLineMaterial });

// ====== Ukuran-ukuran utama (ubah di sini kalau mau menyesuaikan) ======
const CARD_W = 1.6; // lebar kartu
const CARD_H = 2.5; // tinggi kartu
const HOLE_Y = CARD_H / 2 - 0.22; // posisi lubang (dari tengah kartu)
const HOLE_W = 0.5; // lebar lubang
const HOLE_H = 0.1; // tinggi lubang
const ROPE_SEG = 0.72; // panjang tiap ruas tali (3 ruas)
const STRAP_WIDTH = 2.8; // lebar tali
const STRAP_REPEAT = 1.5; // berapa kali gambar tali diulang di sepanjang tali

// Membuat bentuk kartu: sudut membulat + lubang di atas
function makeCardGeometry(w, h, r, depth) {
    const x = -w / 2;
    const y = -h / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    // Lubang berbentuk kapsul (ujung-ujungnya membulat)
    const hr = HOLE_H / 2;
    const hole = new THREE.Path();
    hole.moveTo(-HOLE_W / 2 + hr, HOLE_Y - hr);
    hole.lineTo(HOLE_W / 2 - hr, HOLE_Y - hr);
    hole.absarc(HOLE_W / 2 - hr, HOLE_Y, hr, -Math.PI / 2, Math.PI / 2, false);
    hole.lineTo(-HOLE_W / 2 + hr, HOLE_Y + hr);
    hole.absarc(-HOLE_W / 2 + hr, HOLE_Y, hr, Math.PI / 2, (Math.PI * 3) / 2, false);
    shape.holes.push(hole);

    const geo = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: false,
        curveSegments: 12,
    });
    geo.translate(0, 0, -depth / 2);

    // Atur ulang posisi gambar supaya pas menutupi kartu
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
        uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
    }
    return geo;
}

export const Lanyard = () => {
    return (
        <div className="w-full h-[520px] md:h-[620px] flex items-center justify-center relative touch-none select-none">
            <Canvas
                dpr={[2, 2]}
                camera={{ position: [0, -0.2, 8.8], fov: 25 }}
                gl={{ alpha: true, antialias: true }}
                onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
            >
                <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                    <Band />
                </Physics>
            </Canvas>
        </div>
    );
};

function Band({ maxSpeed = 50, minSpeed = 10 }) {
    const band = useRef(),
        fixed = useRef(),
        j1 = useRef(),
        j2 = useRef(),
        j3 = useRef(),
        card = useRef();

    const vec = new THREE.Vector3(),
        ang = new THREE.Vector3(),
        rot = new THREE.Vector3(),
        dir = new THREE.Vector3();

    const segmentProps = {
        type: "dynamic",
        canSleep: true,
        colliders: false,
        angularDamping: 2,
        linearDamping: 2,
    };

    // 1. Load Textures
    const { gl } = useThree();
    const maxAniso = gl.capabilities.getMaxAnisotropy();

    const cardTex = useTexture(idCardTexture);
    cardTex.anisotropy = maxAniso;
    cardTex.generateMipmaps = true;
    cardTex.minFilter = THREE.LinearMipmapLinearFilter;

    const strapTex = useTexture(lanyardTexture);
    strapTex.wrapS = strapTex.wrapT = THREE.RepeatWrapping;
    strapTex.anisotropy = maxAniso;

    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ])
    );

    const [dragged, drag] = useState(false);
    const [hovered, hover] = useState(false);
    const [cardGeo] = useState(() => makeCardGeometry(CARD_W, CARD_H, 0.12, 0.02));

    // Tali terdiri dari 3 ruas, ujung terakhir tersambung tepat di lubang kartu
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ROPE_SEG]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ROPE_SEG]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ROPE_SEG]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, HOLE_Y, 0]]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? "grabbing" : "grab";
            return () => void (document.body.style.cursor = "auto");
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            });
        }

        if (fixed.current) {
            [j1, j2].forEach((ref) => {
                if (!ref.current) return;
                if (ref.current.lerped) {
                    ref.current.lerped.lerp(
                        ref.current.translation(),
                        delta * (minSpeed + ref.current.wind * (maxSpeed - minSpeed))
                    );
                } else {
                    ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                    ref.current.wind = Math.random();
                }
            });

            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(32));

            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
    });

    curve.curveType = "chordal";

    return (
        <>
            {/* Titik gantung tali, dinaikkan agar kartu muat di canvas */}
            <group position={[0, 3.6, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.1, 0, 0]} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.05]} />
                </RigidBody>
                <RigidBody position={[0.2, 0, 0]} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.05]} />
                </RigidBody>
                <RigidBody position={[0.3, 0, 0]} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.05]} />
                </RigidBody>

                <RigidBody
                    ref={card}
                    {...segmentProps}
                    type={dragged ? "kinematicPosition" : "dynamic"}
                    enabledRotations={[true, true, true]}
                    position={[0.3, -0.2, 0]}
                >
                    <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.02]} />

                    <group
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e) => {
                            e.target.releasePointerCapture(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e) => {
                            e.target.setPointerCapture(e.pointerId);
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
                        }}
                    >
                        {/* Badan kartu berlubang: [0] = permukaan depan/belakang, [1] = sisi tepi */}
                        <mesh geometry={cardGeo}>
                            <meshBasicMaterial attach="material-0" map={cardTex} toneMapped={false} />
                            <meshBasicMaterial attach="material-1" color="#d4d4d8" toneMapped={false} />
                        </mesh>
                    </group>
                </RigidBody>
            </group>

            {/* Tali lanyard: digambar duluan, jadi kartu menutupi tali dan tali hanya terlihat di atas kartu serta di dalam lubang */}
            <mesh ref={band} renderOrder={1}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="#ffffff"
                    depthTest={false}
                    depthWrite={false}
                    toneMapped={false}
                    lineWidth={STRAP_WIDTH}
                    repeat={[STRAP_REPEAT, -1]}
                    useMap={1}
                    map={strapTex}
                />
            </mesh>
        </>
    );
}