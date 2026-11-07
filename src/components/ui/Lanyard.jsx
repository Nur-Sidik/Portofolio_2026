import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Lightformer } from "@react-three/drei";
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
import lanyardTexture from "../../assets/Lanyard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

// Membuat bentuk kartu dengan sudut membulat
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
        <div className="w-full h-[480px] sm:h-[560px] lg:h-[680px] flex items-center justify-center relative touch-none select-none">
            <Canvas
                camera={{ position: [0, -0.2, 8.8], fov: 25 }}
                gl={{ alpha: true, antialias: true }}
                onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
            >
                <ambientLight intensity={2.2} />
                <directionalLight position={[5, 8, 5]} intensity={2.5} />
                <directionalLight position={[-5, 5, -2]} intensity={1.5} color="#a78bfa" />

                <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                    <Band />
                </Physics>
                <Environment blur={0.75}>
                    <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                </Environment>
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
    const cardTex = useTexture(idCardTexture);
    cardTex.generateMipmaps = true;
    cardTex.minFilter = THREE.LinearMipmapLinearFilter;

    const strapTex = useTexture(lanyardTexture);
    strapTex.wrapS = strapTex.wrapT = THREE.RepeatWrapping;
    strapTex.repeat.set(1, 3); // Pengulangan tekstur tali proporsional

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

    const [cardGeo] = useState(() => makeCardGeometry(1.6, 2.5, 0.12, 0.02));

    // Sambungan tali dirapatkan agar kartu terangkat ke tengah layar
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.6]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.6]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.6]);
    // Titik sangkut tepat di atas klip
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.4, 0]]);

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

    // Rasio standar ID Card: Lebar 1.6, Tinggi 2.5 (Aspek ~ 1 : 1.56)
    const cardW = 1.6;
    const cardH = 2.5;

    return (
        <>
            {/* Jangkar atas dinaikkan sedikit agar muat di canvas */}
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
                    <CuboidCollider args={[cardW / 2, cardH / 2, 0.02]} />

                    <group
                        position={[0, 0, 0]}
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
                        {/* Badan Kartu ID Card (Depan & Belakang proporsional) */}
                        <mesh geometry={cardGeo}>
                            <meshPhysicalMaterial
                                map={cardTex}
                                clearcoat={0.9}
                                clearcoatRoughness={0.15}
                                roughness={0.3}
                                metalness={0.05}
                            />
                        </mesh>

                        {/* Klip logam perak */}
                        <mesh position={[0, cardH / 2 + 0.04, 0]}>
                            <boxGeometry args={[0.32, 0.14, 0.06]} />
                            <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0.25} />
                        </mesh>

                        {/* Cincin menghadap depan */}
                        <mesh position={[0, cardH / 2 + 0.17, 0]}>
                            <torusGeometry args={[0.07, 0.02, 16, 32]} />
                            <meshStandardMaterial color="#e2e8f0" metalness={1} roughness={0.2} />
                        </mesh>
                    </group>
                </RigidBody>
            </group>

            {/* Pita Tali Lanyard Terkoneksi */}
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="#ffffff"
                    depthTest={false}
                    lineWidth={0.55}
                    useMap={1}
                    map={strapTex}
                />
            </mesh>
        </>
    );
}