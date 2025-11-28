# Optimal Penerbit - Platform Layanan Penerbitan & Edukasi

**Optimal Penerbit** adalah platform web modern yang dirancang untuk memfasilitasi layanan penerbitan buku (ISBN), pendaftaran Hak Kekayaan Intelektual (HKI), pendaftaran acara/lomba, serta penyediaan materi edukasi dan artikel. Aplikasi ini dibangun menggunakan **Next.js 14+ (App Router)** dengan **TypeScript** dan **Tailwind CSS**.

## 🚀 Teknologi yang Digunakan

  * **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
  * **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  * **UI Components:** [FlyonUI](https://flyonui.com/) (berbasis Tailwind)
  * **Icons:** [Iconify](https://iconify.design/)
  * **State Management & Data Fetching:** React Server Components (RSC), Server Actions, & Custom Hooks.
  * **Backend Integration:** REST API (Laravel/PHP Backend - *External*)

## 📋 Prasyarat

Sebelum memulai, pastikan kamu telah menginstal:

  * [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru direkomendasikan)
  * [npm](https://www.npmjs.com/) atau yarn/pnpm

## 🛠️ Cara Instalasi & Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal (local machine):

1.  **Clone Repository**

    ```bash
    git clone https://github.com/echoTech187/optimal-publisher
    cd optimal-penerbit
    ```

2.  **Instal Dependensi**

    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Environment Variable**
    Buat file `.env.local` di root folder proyek. Salin konfigurasi berikut dan sesuaikan dengan URL backend API kamu:

    ```env
    # .env.local
    NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
    ```

    *(Ganti `http://127.0.0.1:8000` dengan URL backend production jika sudah dideploy).*

4.  **Jalankan Development Server**

    ```bash
    npm run dev
    ```

5.  **Buka Aplikasi**
    Buka browser dan kunjungi [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## 📂 Struktur Folder

Proyek ini menggunakan struktur **Feature-based** yang dikombinasikan dengan App Router Next.js untuk skalabilitas yang lebih baik.

```
src/
├── app/                    # Routing utama (Next.js App Router)
│   ├── (auth)/             # Route group untuk autentikasi (login, register)
│   ├── (dashboard)/        # Route group untuk dashboard user (protected)
│   ├── (main)/             # Route group untuk halaman publik (landing, book, event)
│   ├── api/                # Next.js API Routes (Proxy ke Backend)
│   ├── favicon.ico         # Ikon website
│   ├── globals.css         # Global styles & Tailwind directives
│   └── layout.tsx          # Root layout
│
├── components/             # Komponen UI yang dapat digunakan kembali
│   ├── ui/                 # Komponen dasar (Button, Alert, Loader, Pagination)
│   ├── forms/              # Komponen form & input (Dynamic Forms, FileUpload)
│   ├── layout/             # Header, Footer, Sidebar
│   ├── pack/               # Komponen tampilan paket penerbitan
│   ├── book/               # Komponen list & detail buku
│   └── ... (article, event, hki, dll)
│
├── context/                # React Context Providers
│   └── LoadingContext.tsx  # Global loading state
│
├── features/               # Logika bisnis (Business Logic)
│   ├── auth/               # Actions, hooks, & validasi autentikasi
│   ├── book/               # Data fetching & hooks untuk buku
│   ├── event/              # Data fetching & actions untuk event
│   ├── hki/                # Logika pendaftaran HKI
│   ├── pack/               # Logika dynamic form paket
│   ├── payment/            # Logika pembayaran & upload bukti
│   ├── program/            # Data & actions program penerbitan
│   └── transactions/       # Hooks & data riwayat transaksi
│
├── lib/                    # Utilitas & Helper functions
│   ├── hooks/              # Custom hooks (useForm, useFileUpload, useDebounce)
│   ├── services/           # Service helper (fileService)
│   └── utils/              # Fungsi utilitas (image path, token, validation)
│
├── types/                  # Definisi TypeScript Interfaces/Types
│   ├── user.ts             # Tipe data User
│   ├── transaction.ts      # Tipe data Transaksi
│   ├── program.ts          # Tipe data Program & Form Fields
│   ├── book.ts             # Tipe data Buku
│   └── ...
│
└── middleware.ts           # Middleware untuk proteksi route & validasi sesi
```

## ✨ Fitur Utama

### 1\. Autentikasi & Pengguna (`src/features/auth`)

  * **Login & Register:** Menggunakan validasi server-side dan client-side.
  * **Session Management:** Menggunakan Cookies untuk menyimpan token autentikasi.
  * **Middleware:** Memproteksi halaman dashboard dari akses tanpa login.
  * **Profil:** Pengguna dapat memperbarui data diri dan avatar.

### 2\. Penerbitan Buku (ISBN) (`src/features/program`)

  * **Pilihan Paket:** Menampilkan berbagai paket penerbitan (Single, Multi, Monograf).
  * **Dynamic Form Builder:** Formulir pendaftaran dibuat secara dinamis berdasarkan konfigurasi paket dari backend (mendukung input teks, file upload, repeater fields untuk anggota penulis).
  * **Pengajuan Naskah:** Upload naskah buku (.docx) dengan progress bar.

### 3\. Hak Kekayaan Intelektual (HKI) (`src/features/hki`)

  * **Kategori HKI:** Informasi lengkap mengenai jenis karya yang bisa didaftarkan.
  * **Pendaftaran HKI:** Form pendaftaran pencipta (support multiple creators) dan upload dokumen pendukung (KTP, Surat Pernyataan, Karya).
  * **Pricing:** Pemilihan paket harga untuk pendaftaran HKI.

### 4\. Event & Lomba (`src/features/event`)

  * **Listing Event:** Menampilkan daftar acara/lomba terbaru.
  * **Pendaftaran Event:** User dapat mendaftar event (gratis/berbayar).
  * **Status Pendaftaran:** Pengecekan otomatis apakah user sudah terdaftar.

### 5\. Katalog Buku & Artikel (`src/features/book`, `src/features/article`)

  * **Pencarian & Filter:** Mencari buku berdasarkan judul, penulis, atau kategori.
  * **Detail Buku:** Informasi lengkap buku termasuk harga dan tombol pembelian via WhatsApp.
  * **Artikel:** Blog/Artikel edukasi untuk pengguna.

### 6\. Transaksi & Pembayaran (`src/features/payment`)

  * **Riwayat Transaksi:** Tabel lengkap riwayat transaksi ISBN, HKI, dan Event.
  * **Upload Bukti Bayar:** Fitur untuk mengunggah bukti transfer manual.
  * **Status Order:** Pelacakan status (Menunggu Pembayaran, Diproses, Selesai, Dibatalkan).
  * **Invoice & Resi:** Akses ke dokumen invoice dan bukti pembayaran.

### 7\. Dashboard User (`src/app/(dashboard)`)

  * **Sidebar Navigasi:** Akses cepat ke menu utama.
  * **Ringkasan:** Widget ringkasan aktivitas pengguna.
  * **Responsif:** Tampilan dashboard yang optimal di mobile dan desktop.

## ⚙️ Pengembangan (Development Notes)

  * **Dynamic Forms:** Sistem formulir di `src/components/pack/DynamicFormFields.tsx` sangat bergantung pada struktur JSON yang dikirim dari backend. Pastikan respon API sesuai dengan tipe `FormField` di `src/types/program.ts`.
  * **Image Handling:** Helper `getImageUrl` di `src/lib/utils/image.ts` digunakan untuk meresolve path gambar dari storage backend.
  * **Server Actions:** Sebagian besar mutasi data (POST/PUT) menggunakan Next.js Server Actions untuk keamanan dan performa yang lebih baik.



**Optimal Penerbit** - *Mewujudkan Karya Untuk Negeri.*
