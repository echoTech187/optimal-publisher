# Changelog

All notable changes to this project will be documented in this file.

---

## 2025-10-25
- **[Refactor]** Merombak halaman pembayaran untuk meningkatkan pengalaman pengguna dan kualitas kode:
  - Menambahkan margin vertikal pada halaman pembayaran untuk meningkatkan tata letak.
  - Memperbarui komponen halaman pembayaran untuk menggunakan `async/await` dan menangani parameter `code` yang nullable.
  - Mengganti `self.crypto.randomUUID()` dengan `index` sebagai `key` dalam perulangan metode pembayaran untuk meningkatkan konsistensi.

## 2025-10-21
- **[Changed]** Memperbarui komponen `BookCard` untuk meningkatkan tata letak dan keterbacaan (`049ab09`):
  - Menambahkan `justify-between` untuk menyeimbangkan ruang vertikal di dalam kartu.
  - Menerapkan `line-clamp-2` untuk membatasi nama penulis menjadi dua baris, mencegah teks meluap.
  - Menebalkan label "Oleh" untuk penegasan visual.

## 2025-10-20
- **[Refactor]** Mengubah `ProgramCard` menjadi tautan yang interaktif (`e1b3f2c`):
  - Menambahkan efek `hover` dan mengubah tata letak untuk memusatkan konten.
- **[Refactor]** Merombak total halaman detail buku dan komponen terkait (`aa2baec`):
  - Desain ulang halaman detail buku dengan layout dua kolom yang modern dan informatif.
  - Menambahkan komponen `NotFound` untuk menangani buku yang tidak ditemukan.
  - Memperluas tipe data `Book` dengan detail tambahan (ISBN, penerbit, dll.).
  - Mengubah tombol pembelian menjadi tautan "Pesan via WhatsApp".
  - Memperbarui `BookCard` untuk menampilkan daftar penulis dan meningkatkan layout.

## 2025-10-17
- **[Feature]** Merombak total halaman daftar buku dengan fungsionalitas modern (`91ae19d`):
  - Mengubah halaman dari Server Component menjadi Client Component untuk interaktivitas tinggi.
  - Mengimplementasikan **pencarian (search)** dengan *debouncing* untuk performa optimal.
  - Menambahkan **filter berdasarkan kategori**.
  - Mengimplementasikan **infinite scrolling** untuk memuat buku secara otomatis saat pengguna scroll.
  - Membuat komponen UI baru: `BookCard`, `SkeletonCard` untuk loading, `PopularBooks`, dan `BookListLoading`.
  - Memperkenalkan hook `useDebounce` untuk efisiensi input pencarian.
  - Meningkatkan `type-safety` dengan mendefinisikan interface `Book` yang jelas.

## 2025-10-16
- **[UX]** Meningkatkan User Experience di halaman dashboard (`471092b`):
  - Mengganti pesan "No programs found" dengan tampilan *skeleton loading* (`ProgramCardSkeleton`). Ini memberikan feedback visual yang lebih baik saat data kosong atau sedang dimuat.
- **[Style]** Menambahkan gaya CSS baru untuk menangani teks panjang pada label radio button agar tidak merusak layout (`471092b`).
- **[Chore]** Melakukan pembaruan rutin pada beberapa dependensi proyek (`471092b`).

## 2025-10-15
- **[Feature]** Merombak total halaman Dashboard dengan desain dan fungsionalitas baru (`7bf6f9d`):
  - Mengubah layout dashboard menjadi client component (`DashboardLayoutClient`) untuk mengelola state UI seperti sidebar.
  - Halaman utama dashboard kini secara dinamis memuat dan menampilkan daftar "Programs" dari API, lengkap dengan status *loading skeleton*.
  - Mendesain ulang `DashboardSidebar` dengan tema baru dan membuatnya responsif untuk tampilan mobile (bisa dibuka/tutup).
  - Menambahkan komponen-komponen baru: `DashboardHeader`, `ProgramFilters`, serta widget `Calendar` dan `OnlineUsers`.
  - Memperbarui gaya `ProgramCard` dan `ProgramCardSkeleton` agar sesuai dengan desain daftar yang baru.

## 2025-10-14
- **[Refactor]** Melakukan refactoring arsitektur besar-besaran ke "Feature-Sliced Design" (`9a325a9`):
  - Merestrukturisasi direktori `src/app` menggunakan Route Groups (`(auth)`, `(dashboard)`, `(main)`) untuk organisasi yang lebih baik.
  - Memindahkan logika bisnis, hooks, dan fungsi data-fetching dari `lib` ke dalam folder fitur masing-masing (misalnya, `features/auth`, `features/program`).
  - Mengkonsolidasikan dan menata ulang komponen UI ke dalam `src/components` yang dikelompokkan berdasarkan fitur.
- **[Refactor]** Menyederhanakan struktur layout utama (`82d665f`):
  - Memindahkan tag `<html>` dan `<body>` dari sub-layout ke `RootLayout` tunggal untuk mengikuti praktik Next.js App Router.
- **[Refactor]** Mengubah pengambilan data sesi pengguna dari client-side ke server-side (`3373870`):
  - `DashboardLayout` kini mengambil data pengguna di server dan meneruskannya sebagai *props*, menghilangkan kebutuhan `useEffect` di komponen header.
- **[Fix]** Menonaktifkan sementara middleware otentikasi untuk route `/dashboard` dengan mengomentari matcher-nya (`e3fbcf9`).
- **[Chore]** Membersihkan kode dengan menghapus komentar `@ts-expect-error` yang tidak lagi diperlukan dan properti `priority` yang duplikat pada komponen `Image` (`e178416`).

## 2025-10-13
- **[Feature]** Mengembangkan alur pendaftaran program "Monograf" (`e5cca1b`):
  - Membuat komponen `MonografPack` dan form `FormProgramMonograf` untuk menangani logika pendaftaran program monograf secara spesifik.
  - Menambahkan logika pada halaman paket untuk menampilkan komponen yang sesuai berdasarkan kategori program.
- **[UX]** Meningkatkan pengalaman pengguna pada form multi-langkah (`e5cca1b`):
  - Memperbaiki komponen `Stepper` agar tidak kehilangan *state* (isian form) saat berpindah antar langkah.
  - Menambahkan *smooth scroll* ke form pemesanan setelah paket dipilih.
  - Mengganti teks "Loading..." dengan ikon *spinner* yang lebih modern pada halaman registrasi.
- **[Fix]** Memperbaiki logika redirect setelah login/registrasi dari "program" menjadi "isbn" (`14d3c7e`).
- **[Fix]** Memperbaiki `useForm` hook agar dapat menangani input checkbox dengan benar (`e5cca1b`).
- **[Chore]** Mengganti avatar pengguna dari URL eksternal ke placeholder lokal (`14d3c7e`).

## 2025-10-10
- **[Feature]** Merombak total halaman Pembayaran untuk membuatnya dinamis dan lebih informatif (`8f5c8c2`, `22b9a30`):
  - **Halaman Status Pembayaran**: Membuat tampilan halaman penuh yang berbeda untuk setiap status transaksi (Berhasil, Dibatalkan, Ditolak, Diproses, Kadaluarsa, dll.). Setiap status memiliki ikon, warna, dan pesan yang jelas untuk pengguna.
  - **Pilihan Metode Pembayaran Dinamis**: Halaman pembayaran kini mengambil daftar metode pembayaran dari API, tidak lagi statis (hardcoded). Pengguna dapat memilih dari daftar yang tersedia.
- **[Fix]** Memperbaiki endpoint untuk pengiriman form pemesanan dari `/upload` menjadi `/order` (`8f5c8c2`).
- **[Chore]** Membersihkan kode dengan menghapus `console.log` dan properti duplikat pada komponen `Image` (`22b9a30`).

## 2025-10-09
- **[Refactor]** Merombak total form pengajuan program (`private.tsx`) menjadi komponen-komponen kecil yang dapat digunakan kembali (`a5a846e`):
  - Form dipecah menjadi sub-komponen seperti `UserInfo`, `BookInfo`, `FileUpload`, `Address`, dan `SubmitButton` untuk meningkatkan keterbacaan dan pemeliharaan kode.
  - Mengadopsi `useActionState` untuk manajemen state form yang modern dan penanganan *error* yang lebih baik.
- **[Feature]** Membuat *custom hooks* baru (`useProgramPrivateForm`, `useProgramReferenceForm`) untuk mengisolasi logika pengambilan data (fetch) dari komponen UI.
- **[Feature]** Menambahkan halaman detail pembayaran baru pada route `/payment/[...code]` untuk menampilkan informasi transaksi.
- **[Chore]** Meningkatkan kualitas kode dengan menambahkan direktif `"use server"` dan `"use client"` serta mengganti tag `<img>` dengan komponen `Image` dari Next.js.

## 2025-10-08
- **[Feature]** Membuat komponen `Stepper` baru yang canggih dan dapat digunakan kembali (`2732017`):
  - Dibangun dengan *compound component pattern* (`Stepper.Nav`, `Stepper.Step`, dll.) untuk fleksibilitas maksimum.
  - Menggunakan React Context untuk manajemen state terpusat.
- **[Refactor]** Merombak form registrasi multi-langkah untuk menggunakan komponen `Stepper` yang baru (`2732017`):
  - Logika validasi disederhanakan, di mana tombol "Lanjutkan" akan nonaktif jika isian pada langkah saat ini belum valid.
- **[Feature]** Membuat form "Private Program" menjadi dinamis (`2732017`):
  - Mengimplementasikan *cascading dropdowns*, di mana pilihan "Jurusan" akan memuat "Judul Buku" yang relevan dari API, dan seterusnya.

## 2025-10-07
- **[Security]** Mengimplementasikan sistem otentikasi terpusat menggunakan Middleware dan HttpOnly Cookies (`5647bc3`):
  - Memindahkan logika otentikasi dari `localStorage` (client-side) ke `HttpOnly` cookies (server-side) untuk meningkatkan keamanan.
  - Membuat Middleware (`src/middleware.ts`) untuk melindungi rute-rute privat secara otomatis di level server.
  - Membuat API route (`/api/auth/session`) untuk menyediakan data sesi ke komponen klien dengan aman.
- **[Refactor]** Memigrasikan halaman dari Client-Side Rendering (CSR) ke Server-Side Rendering (SSR) dengan Server Components (`a40ff92`):
  - Halaman `Program` dan `Home` diubah menjadi Server Component, di mana data diambil di server sebelum halaman dikirim ke klien, meningkatkan performa load awal.
  - Menambahkan file `loading.tsx` untuk memanfaatkan Next.js Suspense dan menampilkan UI loading instan.
- **[Refactor]** Melanjutkan pembersihan arsitektur dengan memindahkan logika ke direktori `lib` (`a40ff92`):
  - Memusatkan Server Actions (`login`, `register`, `logout`) di `lib/actions/auth.ts`.
  - Membuat hook `useForm` generik dan mengubah validasi ke TypeScript untuk meningkatkan type safety.
  - Menghapus file-file utilitas JavaScript yang lama.

## 2025-10-06
- **[Refactor]** Merombak total alur registrasi dan login (`5d7c79c`, `2c3e615`, `09517f7`):
  - **Form Registrasi Multi-Langkah**: Mengimplementasikan validasi per-langkah, di mana tombol "Lanjutkan" akan nonaktif jika data pada langkah saat ini tidak valid.
  - **Struktur Halaman Login**: Halaman login dipecah menjadi komponen container (untuk logika) dan komponen presentasional (`SignInForm.jsx`) untuk UI.
  - **Pemisahan Header**: Membuat komponen header terpisah untuk halaman otentikasi (`AuthHeader`) dan dashboard (`DashboardHeader`).
  - **Utilitas Form**: Membuat utilitas baru di `/utils` untuk validasi (`validation.js`) dan manajemen state form (`useForm.js`).
- **[Perf]** Mengganti latar belakang video dengan gambar statis pada halaman login dan registrasi untuk meningkatkan kecepatan *load* halaman (`5d7c79c`).
- **[Fix]** Memperbaiki berbagai tautan otentikasi di seluruh aplikasi agar mengarah ke route `/auth/signin` yang baru (`5d7c79c`).
- **[Chore]** Membersihkan meta tag yang tidak perlu dari layout utama (`bba7d0a`).

## 2025-10-05
- **[Feature]** Membuat komponen `Alert` baru yang sangat dapat dikonfigurasi dan digunakan kembali (`bafed73`):
  - Dilengkapi dengan *custom hook* `useAlert` untuk mempermudah pemicu alert dari komponen manapun.
  - Mendukung berbagai tipe (success, error, dll.), posisi, tombol aksi, dan durasi auto-close.
- **[UX]** Mengintegrasikan komponen `Alert` ke dalam form registrasi untuk memberikan feedback visual (pop-up) kepada pengguna setelah berhasil atau gagal mendaftar (`bafed73`).
- **[Chore]** Memusatkan URL API backend dalam satu file konstanta (`constants/api.js`) untuk pengelolaan yang lebih mudah (`bafed73`).

## 2025-09-19
- **[Feature]** Membangun halaman detail buku (`/book/[slug]`) (`5466bfc`):
  - Membuat halaman dinamis baru untuk menampilkan informasi lengkap satu buku, termasuk cover, deskripsi, penulis, dan harga.
  - Halaman ini juga mengambil dan menampilkan daftar buku lain yang direkomendasikan.
- **[Feature]** Membuat komponen dan halaman untuk daftar buku (`71a1365`):
  - Membangun struktur awal untuk halaman `/book` yang akan menampilkan daftar semua buku.
  - Menambahkan komponen untuk `BookSection`, `BookRecomend`, dan `SearchBook` sebagai dasar untuk fitur pencarian dan filter.
- **[UX]** Meningkatkan tampilan *loading* pada halaman buku dengan menambahkan lebih banyak *skeleton card* dan memperbaiki gayanya (`5466bfc`).
- **[Feature]** Mengembangkan form pemesanan paket yang dinamis (`71a1365`):
  - Membuat form kompleks yang dapat secara dinamis menambah atau mengurangi field input untuk anggota tim, tergantung pada paket yang dipilih.

## 2025-09-18
- **[Feature]** Membangun alur pendaftaran dan pembayaran untuk berbagai jenis program (`1627505`, `9f186f0`):
  - Membuat halaman pemilihan paket (`/pack`) yang dapat menampilkan paket-paket berbeda secara dinamis berdasarkan jenis program (Penerbitan Mandiri, Monograf, dll.).
  - Membuat halaman pembayaran (`/payment`) yang menampilkan rincian acara (jika mendaftar untuk event) dan berbagai metode pembayaran dalam format akordeon.
  - Mengarahkan pengguna dari form registrasi langsung ke halaman pembayaran yang sesuai setelah berhasil mendaftar untuk sebuah event.
- **[Feature]** Membuat halaman daftar program (`/program`) untuk menampilkan semua program unggulan yang tersedia (`1627505`).
- **[UX]** Form registrasi kini lebih pintar, dengan menampilkan field tambahan yang relevan hanya jika pengguna mendaftar untuk program ISBN (`1627505`).

## 2025-09-17
- **[Feature]** Membangun fondasi untuk sistem otentikasi dan dashboard (`2236b4a`):
  - Membuat sistem layout dinamis yang dapat beralih antara layout untuk publik (`WebLayout`), otentikasi (`AuthLayout`), dan dashboard (`DashboardLayout`) berdasarkan URL.
  - Membuat halaman dan komponen awal untuk fungsionalitas **Login** (`/auth/signin`) dan **Registrasi** (`/auth/register`).
  - Mengimplementasikan form registrasi multi-langkah (stepper) yang memisahkan pengisian informasi personal dan institusi.
- **[Feature]** Menambahkan latar belakang video yang menarik secara visual pada halaman login dan registrasi (`2236b4a`).
- **[Feature]** Membuat komponen awal untuk `Sidebar` yang akan digunakan di dalam dashboard pengguna (`2236b4a`).

## 2025-09-16
- **[Feature]** Memperkaya halaman utama (Homepage) dengan menambahkan beberapa seksi baru (`155a5e3`):
  - **Seksi Buku**: Menambahkan area untuk mempromosikan koleksi buku.
  - **Seksi Berita & Acara**: Membuat carousel untuk menampilkan poster-poster acara dan berita terkini.
  - **Seksi Layanan**: Menampilkan layanan utama seperti pendaftaran ISBN, ISSN, dan HKI.
  - **Seksi Kontak**: Menambahkan *call-to-action* bagi pengguna untuk menghubungi via WhatsApp.
- **[UX]** Memperbarui menu navigasi utama dan sidebar mobile dengan menambahkan tautan ke seksi-seksi baru di homepage.
- **[Asset]** Menambahkan sejumlah besar aset gambar baru untuk mendukung tampilan visual seksi Berita, Layanan, dan Buku.

## 2025-09-15
- **[Branding]** Mengganti logo lama dengan `penerbit-logo.png` di seluruh header situs (`02c6076`).
- **[Fix]** Memperbarui tautan WhatsApp yang salah di beberapa komponen (FAQ, Paket) ke link yang benar (`fc38fd6`).
- **[UX]** Mengganti tombol "Daftar" dan "Masuk" di header dengan satu tombol "WhatsApp Kami" untuk menyederhanakan *call-to-action* (`02c6076`).
- **[Fix]** Halaman detail artikel kini menampilkan pesan "Article Not Found" dengan benar jika artikel tidak ditemukan, mencegah halaman dari error (`02c6076`).
- **[Chore]** Melakukan pembaruan versi pada beberapa dependensi proyek (`02c6076`).
- **[Style]** Memperbaiki tampilan banner pada halaman artikel agar gambar latar belakangnya tampil penuh dan proporsional (`e6d2887`).

## 2025-09-14
- **[Added]** Implement article navigation and update article titles to links (`7cd65ae`).
- **[Added]** Add article detail page and article listing with banner component (`131bc8a`).
- **[Fixed]** Refactor FAQs component to improve responsive design for contact section (`117b145`).
- **[Changed]** Enhance dark mode support across various components (`2c35dfc`).
- **[Fixed]** Update footer component to correct navigation links (`196ef7a`).
- **[Changed]** Update footer component to replace static descriptions with navigation links (`00b5083`).
- **[Changed]** Refactor footer component to update service links and enhance social media icons layout (`010fb59`).
- **[Changed]** Update next.config.ts to enhance experimental features and ESLint/TypeScript settings (`315e663`).
- **[Changed]** Update dev script in package.json to specify port (`a9b9f20`).
- **[Added]** Add mobile sidebar component and integrate into layout (`3ab7492`).

## 2025-09-13
- **[Changed]** Update logo (`4a47ea3`).
- **[Changed]** Update link logo (`51bdc20`, `0b73905`).
- **[Changed]** Update window title (`0647395`).
- **[Added]** Initial project starter (`9f6ac2f`, `9e27f3e`).
