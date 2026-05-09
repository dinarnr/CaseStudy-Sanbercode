# 🧪 CaseStudy Sanbercode — QA Automation with Cypress

Repositori ini berisi kumpulan tugas dan proyek akhir dari program pelatihan **Quality Assurance (QA) Automation** di [Sanbercode](https://sanbercode.com/). Semua pengujian ditulis menggunakan **Cypress** dengan JavaScript dan struktur Page Object Model (POM) agar kode lebih modular, mudah dibaca, scalable, dan mudah di-maintain.

---

# 🎯 Tujuan Pengujian

- Memverifikasi fungsi login menggunakan credential valid dan invalid
- Memastikan fitur Forgot Password menampilkan pesan sukses dan kembali ke halaman login
- Menguji fitur Directory:
    - Search employee
    - Reset filter
    - No Results Found
- Memvalidasi kesesuaian data UI dengan response API menggunakan Cypress Intercept

---

## 📁 Struktur Proyek

```
CaseStudy-Sanbercode/
├── cypress/                    # Konfigurasi dan file bawaan Cypress
├── tugas16_intercept/          # Tugas 16 — Network Intercept dengan Cypress
├── tugas17_automationPOM/      # Tugas 17 — Automation menggunakan Page Object Model (POM)
├── tugas18_APIAutomation/      # Tugas 18 — API Automation Testing
├── ProjectAkhir/               # Proyek Akhir — End-to-End Test Suite
├── cypress.config.js           # Konfigurasi Cypress
├── package.json                # Dependensi project
└── .gitignore
```

---

## 📚 Deskripsi Modul

### 🔹 `tugas16_intercept`
Pengujian menggunakan fitur **`cy.intercept()`** untuk melakukan *mocking* dan *spying* pada request HTTP. Modul ini mencakup:
- Intercepting request GET/POST
- Mocking response dari API
- Memvalidasi data yang dikirim dan diterima

### 🔹 `tugas17_automationPOM`
Implementasi pola **Page Object Model (POM)** untuk membuat test yang lebih terstruktur dan mudah di-maintain. Modul ini mencakup:
- Pembuatan Page Object untuk setiap halaman
- Reusability komponen test
- Pengujian alur UI secara end-to-end

### 🔹 `tugas18_APIAutomation`
Pengujian otomatis terhadap **REST API** menggunakan Cypress. Modul ini mencakup:
- Pengujian endpoint GET, POST, PUT, DELETE
- Validasi status code dan response body
- Penggunaan token autentikasi

### 🔹 `ProjectAkhir`
Proyek akhir yang mengintegrasikan semua materi yang telah dipelajari, meliputi:
- UI Testing dengan POM
- Network Intercept
- End-to-end test scenario yang komprehensif

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi |
|---|---|
| [Cypress](https://www.cypress.io/) | ^14.0.2 |
| Node.js | ≥ 18.x |
| JavaScript | ES6+ |

---

## 🚀 Cara Menjalankan

### 1. Clone repositori

```bash
git clone https://github.com/dinarnr/CaseStudy-Sanbercode.git
cd CaseStudy-Sanbercode
```

### 2. Install dependensi

```bash
npm install
```

### 3. Jalankan Cypress (Mode GUI)

```bash
npx cypress open
```

### 4. Jalankan Cypress (Mode Headless)

```bash
npx cypress run
```

### 5. Menjalankan folder tertentu

```bash
npx cypress run --spec "ProjectAkhir/**/*.cy.js"
```

---

## 🧩 Fitur yang Diuji

1. Login
    - **Positive Case**
    * Login menggunakan credential valid (Admin / admin123)
    - **Negative Case**
    * Login menggunakan username atau password yang salah
    - **Validasi**
    * Memastikan error message muncul
    * Memastikan redirect ke dashboard berhasil

2. Forgot Password
    * Membuka halaman Forgot your password?
    * Menginput username yang terdaftar
    * Klik tombol Reset Password
    * Memastikan pesan sukses muncul
    * Memastikan navigasi kembali ke halaman login

3. Directory
    * Search berdasarkan nama employee
    * Search berdasarkan job title
    * Search berdasarkan location

---

## 👤 Author

**dinarnr**
- GitHub: [@dinarnr](https://github.com/dinarnr)

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dalam program pelatihan **Sanbercode QA Automation Bootcamp**.