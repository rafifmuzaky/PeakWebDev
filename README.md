# ✅ **README.md**

```md
# PeakWebDev – Landing Page Website Builder

Sebuah landing page profesional untuk layanan pembuatan website UMKM & startup, dibangun dengan HTML, CSS, dan JavaScript murni.  
Website ini memiliki animasi premium, mobile navigation, form order yang terhubung ke Google Sheets, serta optimasi SEO.

---

## 🚀 Fitur Utama

### 🔹 1. Hero Section Premium
- Background gambar Everest
- Overlay profesional
- Judul besar + call-to-action
- Animasi AOS (fade/zoom)

### 🔹 2. Benefit Section
- Ikon SVG custom
- Animasi AOS saat scroll
- Copywriting marketing untuk meningkatkan konversi

### 🔹 3. Pricing Section
- Tiga paket layanan
- Harga dapat diedit mudah
- Tombol “Pilih Paket” otomatis mengisi form order

### 🔹 4. Form Order dengan Google Sheets
Form order terhubung ke:
- Google Apps Script
- Google Sheets
- AJAX (fetch POST)

Pengguna bisa langsung mengirim pesanan melalui website tanpa backend tradisional.

### 🔹 5. Mobile Navigation
- Hamburger menu
- Smooth open/close
- Auto-close saat klik link
- Logo klik → scroll to hero

### 🔹 6. Sticky Navbar + Shadow Fade
- Navbar blur-glassmorphism
- Shadow muncul saat scroll
- Desain modern ala website SaaS

### 🔹 7. SEO Optimization
- Meta tags lengkap
- Open Graph (WA, IG, FB)
- JSON-LD Schema (Website + Organization)
- Sitemap.xml
- robots.txt
- Canonical URL
- Google Analytics GA4

### 🔹 8. Deployment
- Dapat dideploy ke **Vercel** atau **Netlify**
- Mendukung custom domain

---

## 📁 Struktur Folder

```

/
├── index.html
├── styles.css
├── script.js
├── sitemap.xml
├── robots.txt
└── assets/
├── img/
└── Logo/

````

---

## ⚙️ Cara Setup Google Sheets Integration

1. Buat Google Apps Script  
2. Tempel backend yang sudah dibuat  
3. Publish sebagai Web App (`/exec`)  
4. Ganti endpoint di `script.js` pada bagian:

```js
const ENDPOINT = "YOUR_GOOGLE_SCRIPT_URL_HERE";
````

5. Testing via DevTools atau form langsung.

---

## 📊 Tracking & Analytics

Website ini sudah mendukung Google Analytics 4 (GA4).
Tambahkan script GA ke `<head>` di `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

---

## 🎨 Teknologi yang Digunakan

* HTML5
* CSS3
* JavaScript (ES6)
* AOS (Animate on Scroll)
* Google Apps Script
* Google Sheets
* Vercel / Netlify

---

## 📦 Instalasi

Tidak membutuhkan build tools.

Cukup clone repo:

```bash
git clone https://github.com/username/peakwebdev.git
```

Buka `index.html` di browser, atau gunakan Live Server.

---

## 📌 Catatan

* Harga paket dapat diedit pada section Pricing di `index.html`
* Untuk auto-select paket pada order form, gunakan atribut:

  ```html
  data-package="Basic"
  ```
* Animasi AOS dapat dikonfigurasi di `script.js`

---

## 📜 Lisensi

Proyek ini bebas digunakan untuk kebutuhan pribadi dan portfolio.

---

## 🙋‍♂️ Author

**PeakWebDev**
Landing page builder untuk UMKM & startup digital.

```

---

Kalau kamu mau, gue bisa:

✅ bikin **README versi English**  
✅ tambahin **screenshots preview**  
✅ tambahin **status badges GitHub** (deploy, views, dll)  
✅ bikin **demo GIF** biar makin profesional  

Tinggal bilang.
```
