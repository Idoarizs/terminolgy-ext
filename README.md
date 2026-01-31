# 🚀 Project Setup Guide

Panduan singkat dan mudah dipahami untuk menyiapkan serta menjalankan project ini di lingkungan lokal.

---

## 🧩 Kebutuhan Sistem

Pastikan perangkat Anda telah memenuhi persyaratan berikut:

- 🟢 **Node.js** `v22.19.0`
- 📦 **Node Package Manager (NPM)** `v10.9.3`

## Cara Menggunakan
1. Mengunduh projek.

2. Install depedensi yang digunakan pada perangkat anda dengan mengetik "npm i" pada CLI apapun dengan syarat path berada di projek utama agar bisa mendeteksi file package.json.

3. Bikin file .env, lalu isi dengan API key yang anda dapatkan melalui platform OpenRouterAI untuk bisa mengakses model AI open-source yg dipakai

4. Pastikan isi file .env seperti ini:
WXT_BASE_API_URL=https://openrouter.ai
WXT_OPENROUTER_API_KEY=<api_key_anda>

5. Jalankan projek dengan mengetik "npm run dev"
