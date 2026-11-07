# Portofolio

Website portofolio pengembang perangkat lunak yang dibangun menggunakan React, Vite, dan Tailwind CSS. Repositori ini dilengkapi dengan simulasi kartu ID 3D interaktif berbasis fisika tali (*rope joints*) menggunakan Three.js, React Three Fiber (R3F), dan Rapier Physics.

## Gambaran Umum

* **Simulasi Fisika 3D Lanyard:** ID Card dapat ditarik (*draggable*) dengan kalkulasi inersia dan pergerakan tali yang realistis menggunakan `@react-three/rapier`.
* **Proses Build Cepat:** Menggunakan Vite untuk performa kompilasi lokal yang cepat dan *Hot Module Replacement* (HMR).
* **Komponen Antarmuka Modular:** Struktur kode terbagi rapi ke dalam modul proyek, daftar keahlian teknis, riwayat pengalaman, dan form kontak.
* **Desain Responsif:** Tampilan adaptif pada berbagai ukuran layar, baik perangkat mobile maupun desktop.

## Teknologi yang Digunakan

### Fondasi & Antarmuka

* [React](https://react.dev/) — Library antarmuka pengguna
* [Vite](https://vitejs.dev/) — *Build tool* dan *development server*
* [Tailwind CSS](https://tailwindcss.com/) — Framework styling berbasis utility-first

### Grafis 3D & Fisika

* [Three.js](https://threejs.org/) — Library grafis WebGL 3D
* [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) — React *reconciler* untuk Three.js
* [@react-three/drei](https://github.com/pmndrs/drei) — Koleksi helper dan abstraksi untuk R3F
* [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) — Integrasi mesin fisika Rapier untuk WebGL
* [meshline](https://github.com/spite/THREE.MeshLine) — Geometri dinamis untuk merender pita tali lanyard

### Utilitas Tambahan

* [Lucide React](https://lucide.dev/) — Koleksi ikon aplikasi
* [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) — Manajemen kelas CSS kondisional

## Persiapan & Menjalankan Proyek

### Prasyarat Sistem

Pastikan perangkat sudah terpasang:

* [Node.js](https://nodejs.org/) (versi 18.0 ke atas disarankan)
* Package manager: `npm`, `pnpm`, atau `yarn`
* `git`

### Panduan Instalasi

1. **Clone repositori:**

   ```bash
   https://github.com/Nur-Sidik/Portofolio_2026.git
   cd Portofolio_2026
   ```

2. **Pasang dependensi (*packages*):**

   Jika menjalankan proyek hasil clone:
   ```bash
   npm install
   ```

   > Catatan instalasi jika mengonfigurasi proyek dari awal:
   >
   > ```bash
   > # Instalasi utilitas UI & ikon
   > npm install lucide-react clsx tailwind-merge
   >
   > # Instalasi pustaka grafis 3D dan mesin fisika
   > npm install three @react-three/fiber @react-three/drei @react-three/rapier meshline
   > ```

### Menjalankan Server Pengembangan

Jalankan perintah berikut untuk membuka server lokal:

```bash
npm run dev
```

Buka peramban (*browser*) dan arahkan ke alamat `http://localhost:5173/`.

### Pembuatan File Produksi (*Build*)

Untuk mengompilasi dan mengoptimalkan kode sebelum diunggah ke layanan hosting:

```bash
npm run build
```

Untuk menguji hasil build produksi secara lokal:

```bash
npm run preview
```

## Struktur Direktori

```text
portofolio/
├── public/                  # Aset statis dan berkas ikon favicon
├── src/
│   ├── assets/              # Gambar dan tekstur (ID Card.png, Lanyard.png, dll.)
│   ├── components/          # Komponen tampilan utama
│   │   ├── Navbar.jsx       # Menu navigasi
│   │   ├── Hero.jsx         # Bagian pengenalan utama berisi 3D Canvas
│   │   ├── Skills.jsx       # Daftar keahlian teknis
│   │   ├── Projects.jsx     # Galeri proyek unggulan
│   │   ├── Experience.jsx   # Riwayat pengalaman kerja dan organisasi
│   │   ├── Contact.jsx      # Bagian formulir kontak
│   │   └── ui/              # Komponen visual & efek grafis
│   │       ├── Lanyard.jsx  # Objek kartu identitas 3D berbasis Rapier
│   │       ├── Meteors.jsx  # Efek animasi meteor latar belakang
│   │       └── GlobalBackground.jsx
│   ├── data/
│   │   └── portfolioData.js # Pusat data teks, tautan proyek, dan riwayat kerja
│   ├── lib/
│   │   └── utils.js         # Fungsi helper penggabungan kelas Tailwind
│   ├── App.jsx              # Komponen tata letak utama
│   ├── index.css            # Berkas CSS global & direktif Tailwind
│   └── main.jsx             # Titik masuk utama aplikasi React
├── package.json             # Daftar dependensi dan script eksekusi
├── tailwind.config.js       # Konfigurasi kustom tema Tailwind
└── vite.config.js           # Konfigurasi build Vite
```

## Special Thanks To

Proyek ini terinspirasi dan mengambil referensi teknis maupun visual dari repositori berikut:

* [sanidhyy/3d-portfolio](https://github.com/sanidhyy/3d-portfolio) — Referensi integrasi elemen 3D pada layout portofolio.
* [seraprogrammer/portfolio](https://github.com/seraprogrammer/portfolio) — Referensi perancangan struktur antarmuka Tailwind CSS yang bersih dan modular.
* [Jenin82/SpacePortfolio](https://github.com/Jenin82/SpacePortfolio) — Referensi efek visual latar belakang bertema luar angkasa dan aksen futuristik.
* [zain-ahmad/zain-portofolio](https://github.com/zain-ahmad/zain-portofolio) — Referensi utama mekanisme interaksi kartu dan sambungan fisika lanyard 3D.

## Profil Pengembang

**Nur Sidik Zainu Ahmad**  
Mahasiswa Teknologi Informasi, Universitas Muhammadiyah Yogyakarta  
* GitHub: https://github.com/Nur-Sidik
* Instagram: https://www.instagram.com/n.sidk
* Tiktok: https://www.tiktok.com/n.sidk

## Lisensi

Proyek ini didistribusikan di bawah lisensi [MIT License](LICENSE).
