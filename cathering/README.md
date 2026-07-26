# 🍱 Cathering

> Steve Valentino Wijaya — 242310026**
> Quiz 2 — Pemrograman Perangkat Bergerak

Cathering adalah aplikasi mobile pemesanan makanan & minuman kantin, dibuat dengan React Native (Expo) untuk memenuhi Quiz 2 mata kuliah Pemrograman Perangkat Bergerak. Aplikasi ini dijalankan menggunakan Expo Go versi 57.0.2.

Nama "Cathering" merupakan plesetan dari kata Catering + Cathering (canteen + gathering) — menggambarkan aplikasi tempat berkumpulnya menu-menu kantin dalam satu genggaman.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🔐 Autentikasi | Login menggunakan [FakeStoreAPI](https://fakestoreapi.com/) (`POST /auth/login`). Sesi login disimpan lokal via `AsyncStorage` sehingga user tidak perlu login ulang tiap buka app. |
| 🍽️ List Menu | Menampilkan daftar menu makanan & minuman kantin lengkap dengan gambar (emoji), harga, badge (Best Seller/Pedas/Manis/dll), dan fitur pencarian + filter kategori. |
| 🛒 Keranjang & Total Pesanan | Tambah/kurangi jumlah item, hitung otomatis subtotal, biaya layanan, dan total bayar. |
| 🧾 History & Transaksi | Setiap checkout tersimpan sebagai transaksi baru (disimpan permanen di `AsyncStorage`), lengkap dengan ID transaksi, tanggal, daftar item, dan status. |
| 👤 Profil | Menampilkan data user hasil login (username/nama/email dari FakeStoreAPI) beserta ringkasan total pesanan & total belanja, serta tombol logout. |

---

## UI/UX

UI dibuat dengan:
- Gradient header (oranye → kuning) menggunakan `expo-linear-gradient`
- Kartu menu dengan badge warna-warni & efek shadow
- Bottom tab navigation dengan ikon dinamis (`@expo/vector-icons`)
- Cart bar mengambang (floating) yang muncul otomatis saat ada item di keranjang
- Riwayat transaksi yang bisa di-*expand* untuk melihat detail item

---

## Tech Stack

- Expo SDK 57 (React Native 0.86, React 19.2)
- React Navigation (Bottom Tabs)
- AsyncStorage — penyimpanan sesi login & riwayat transaksi
- expo-linear-gradient — efek gradient pada header
- @expo/vector-icons — ikon aplikasi
- FakeStoreAPI — `https://fakestoreapi.com/auth/login` untuk autentikasi

---

## 📁 Struktur Folder

```
cathering/
├── App.js                     # Entry point, providers & navigasi
├── theme.js                   # Warna, shadow, radius global
├── data/
│   └── menuData.js            # Data menu makanan & minuman
├── context/
│   ├── AuthContext.js         # Login/logout via FakeStoreAPI
│   ├── CartContext.js         # State keranjang & perhitungan total
│   └── OrderContext.js        # Riwayat pesanan/transaksi
├── components/
│   ├── MenuCard.js            # Kartu item menu
│   └── CategoryPill.js        # Tombol filter kategori
└── screens/
    ├── LoginScreen.js
    ├── MenuScreen.js
    ├── CartScreen.js
    ├── HistoryScreen.js
    └── ProfileScreen.js
```

---

## Cara Menjalankan

1. Pastikan sudah install Node.js dan aplikasi Expo Go (versi 57.0.2) di HP.
2. Clone/download project ini, lalu masuk ke foldernya:
   ```bash
   cd cathering
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Jalankan project:
   ```bash
   npx expo start
   ```
5. Scan QR code yang muncul menggunakan aplikasi Expo Go di HP (Android/iOS).

---

## Akun Demo Login

Aplikasi menggunakan akun demo resmi dari FakeStoreAPI (sudah otomatis terisi di form login):

```
Username : mor_2314
Password : 83r5^_
```

---

## Alur Aplikasi

1. Login → user login memakai akun FakeStoreAPI.
2. Menu → user melihat & mencari menu, menambahkan ke keranjang.
3. Keranjang → user mengecek jumlah & total pesanan, lalu checkout.
4. History → transaksi yang sudah checkout otomatis tersimpan & bisa dilihat kembali.
5. Profil → user melihat ringkasan aktivitas & bisa logout.

---