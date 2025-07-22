```txt

 ░▒▓███████▓▒░ ░▒▓██████▓▒░  ░▒▓██████▓▒░ ░▒▓████████▓▒░░▒▓███████▓▒░  ░▒▓██████▓▒░░▒▓████████▓▒░ 
░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░     
░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░       ░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░     
 ░▒▓██████▓▒░ ░▒▓████████▓▒░░▒▓█▓▒▒▓███▓▒░░▒▓██████▓▒░  ░▒▓███████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░     
       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░     
       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░       ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░     
░▒▓███████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓██████▓▒░ ░▒▓████████▓▒░░▒▓███████▓▒░  ░▒▓██████▓▒░   ░▒▓█▓▒░
```

# 🤖 Discord Sage-Bot (Bahasa Indonesia, Dialek Palu)

Bot Discord cerdas buatan sendiri yang bisa cek cuaca, gempa, jadwal sholat, dan lainnya. Didesain dengan gaya bahasa khas Sulawesi Tengah (Palu), spesial untuk server Sage E-Sprott.

> Mind you, this Bot is still in development (I developed this Bot in just 2 days 😆) — so there's more commands to be utilized soon!

---

## ✨ Fitur Utama

| Perintah Bot     | Fungsi                                                                 |
|------------------|------------------------------------------------------------------------|
| `/cuaca`         | Lihat cuaca real-time di kota anggota Sage bermukim di Indonesia       |
| `/gempa`         | Tampilkan info gempa terkini dari BMKG                                 |
| `/jadwalsholat`  | Tampilkan jadwal sholat dari wilayah yang dipilih                      |
| `/namalist`      | Lihat dan kelola nama asli pengguna untuk sapaan personal              |
| `/setname`       | Simpan nama aslimu di bot supaya lebih akrab                           |
| `/cekjodoh`      | Cocokin dua nama buat lihat presentase kecocokan                       |
| `/serverinfo`    | Info lengkap tentang server Discord saat ini                           |

---

## 🧠 Teknologi yang Digunakan

- [Discord.js v14](https://discord.js.org) – Untuk bot & handle slash commands  
- [Open-Meteo API](https://open-meteo.com/) – Info cuaca harian  
- [BMKG Gempa Feed](https://data.bmkg.go.id/gempabumi/) – Data gempa terkini  
- [Jadwal Sholat API (MyQuran)](https://api.myquran.com/v1/sholat) – Jadwal waktu sholat  

---

## 🚀 Cara Jalankan di Lokal

### 1. Clone Project

```bash
git clone https://github.com/username/discord-ai-bot.git
cd discord-ai-bot
```

### 2. Instal Dependency

```bash
npm install
```

### 3. Setup File `.env`

Buat file `.env` dan isi dengan token dan API key yang dibutuhkan:

```
DISCORD_TOKEN=your_bot_token
OPENAI_API_KEY=your_openai_key
BINDERBYTE_API_KEY=your_binderbyte_key
```

### 4. Jalankan Bot

```bash
node index.js
```

---

## 🛡️ Keamanan

Pastikan file `.env` masuk dalam `.gitignore` agar token dan API key tidak ikut ter-push ke GitHub.  
Jika sudah pernah ter-commit, hapus riwayatnya dengan:

```bash
git rm --cached .env
git commit -m "Remove .env"
```

---

Kalau kamu mau tambahin badge GitHub, contoh hasil, atau dokumentasi lebih lanjut per command, tinggal bilang aja!
