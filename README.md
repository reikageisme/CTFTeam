# 🎯 6h4T9pTpR0 CTF Team Website

Website chuyên nghiệp cho team CTF **6h4T9pTpR0** từ **Đại học HUTECH** - Được thiết kế với giao diện hiện đại, hiệu ứng hacker aesthetic, axolotl mascot cute, và background matrix đầy sắc màu! 🌈

---

## 📋 Cấu Trúc Project

```
CTFTeamSite/
├── app.py                  # Flask backend - routes & dữ liệu team
├── requirements.txt        # Python dependencies
├── templates/              # HTML templates (Jinja2)
│   ├── index.html         # Trang chủ (hero + club + team preview)
│   ├── team.html          # Danh sách thành viên
│   ├── writeups.html      # Danh sách writeups
│   ├── 404.html           # Error page
│   └── 500.html           # Error page
├── static/
│   ├── css/style.css      # All animations & responsive design (1356+ lines)
│   ├── js/main.js         # Axolotl + cursor effects + matrix background
│   └── img/               # Logos & avatars
└── README.md
```

---

## 🚀 Chạy Cục Bộ (Windows PowerShell)

### 1️⃣ Setup Environment

```powershell
# Tạo virtual environment
python -m venv .venv

# Kích hoạt (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# Cài đặt dependencies
pip install -r requirements.txt
```

### 2️⃣ Chạy App

```powershell
python app.py
```

Mở http://127.0.0.1:5000 trong browser 🌐

---

## 🎨 Features

✨ **Modern Design**
- Rainbow gradient animations trên tất cả headings
- Matrix background code với hex codes (0xdeadbeef, 0xcafebabe, etc.)
- Responsive design (desktop, tablet, mobile)

🐙 **Cute Mascot**
- Pink axolotl cursor follower với blink & gill animations
- Smooth mouse tracking với easing effect

🕸️ **Cursor Effects**
- Trail particles tạo web connections
- Click burst effect với 12 particles
- Dense hacker aesthetic

🎭 **20+ CSS Animations**
- rainbow-text, rainbow-border, neon-glow, glow-pulse
- matrix-flow, slide-in, float-y, float-particle, reveal
- color-shift, pulse-glow, hero-fade-in, stat-counter, trail-fade

---

## 📝 Chỉnh Sửa Dữ Liệu

Tất cả dữ liệu team được lưu trong `app.py`:

### Team Info
```python
TEAM = {
    "name": "6h4T9pTpR0",
    "tagline": "Security Through Capture The Flag",
    "ctftime": "https://ctftime.org/team/412747/",
    "members": [
        {"name": "BaoZ", "role": "Team Lead/Forensics", "handle": "BaoZ", "avatar": "/static/img/BaoZ.jpg"},
        # Thêm thành viên ở đây
    ],
    "socials": {
        "twitter": "https://twitter.com/...",
        "github": "https://github.com/...",
    }
}
```

### Club & University Info
```python
CLUB = {
    "name": "Câu lạc bộ An Ninh Mạng HUTECH",
    "description": "...",
    "achievements": [...]
}

UNIVERSITY = {
    "name": "Đại học HUTECH",
    "website": "https://www.hutech.edu.vn",
    # ...
}
```

---

## 🌍 Deploy Lên Host (VPS/Web Hosting)

### 📤 Option 1: Setup Nhanh (SSH + Git)

#### Lần Đầu Setup

```bash
# SSH vào host
ssh user@your-host.com

# Clone repository
cd /home/user/apps
git clone <repo-url> ctf-website
cd ctf-website

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate

# Cài dependencies
pip install -r requirements.txt
pip install gunicorn

# Test chạy
python app.py
```

#### Update Code Trên Host

**Quick Method:**

```bash
# Trên local machine
git add .
git commit -m "Update: [describe]"
git push origin main

# Trên host
cd /home/user/apps/ctf-website
git pull origin main
sudo systemctl restart ctf-website
```

---

### 🔧 Option 2: Setup Systemd (Production)

#### Create Service File

```bash
sudo nano /etc/systemd/system/ctf-website.service
```

Copy & paste:
```ini
[Unit]
Description=6h4T9pTpR0 CTF Team Website
After=network.target

[Service]
User=www-data
WorkingDirectory=/home/user/apps/ctf-website
ExecStart=/home/user/apps/ctf-website/venv/bin/gunicorn -w 4 -b 0.0.0.0:5000 app:app
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

#### Enable Service

```bash
sudo systemctl daemon-reload
sudo systemctl enable ctf-website
sudo systemctl start ctf-website
sudo systemctl status ctf-website
```

#### Auto-Restart After Code Update

```bash
cd /home/user/apps/ctf-website
git pull origin main
sudo systemctl restart ctf-website
```

---

### 🌐 Option 3: Nginx Reverse Proxy

#### Config Nginx

```bash
sudo nano /etc/nginx/sites-available/ctf-website
```

Copy & paste:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /home/user/apps/ctf-website/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Enable & Test

```bash
sudo ln -s /etc/nginx/sites-available/ctf-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### 🔐 SSL/HTTPS với Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
sudo systemctl reload nginx
```

Certbot sẽ tự động config SSL! ✅

---

## ⚡ Update Code Workflow

### Fastest Way

**Lần đầu - Local setup:**
```powershell
git init
git add .
git commit -m "Initial commit"
git push origin main
```

**Mỗi lần sửa code - Local:**
```powershell
# 1. Sửa file
# 2. Test: python app.py
# 3. Push:
git add .
git commit -m "Fix: [chi tiết sửa]"
git push origin main
```

**Auto-update on host - Run this once:**
```bash
# Setup auto-pull cron job
(crontab -l 2>/dev/null; echo "*/5 * * * * cd /home/user/apps/ctf-website && git pull origin main && sudo systemctl restart ctf-website") | crontab -
```

Now code updates automatically every 5 minutes! 🚀

---

## 🐛 Troubleshooting

**Port conflict?**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000
# Kill it
taskkill /PID <PID> /F
```

**Module not found?**
```bash
pip install -r requirements.txt --upgrade
```

**Static files broken?**
- Verify `/static/` path in templates
- Check `static/css/`, `static/js/`, `static/img/` exist

**Animations not working?**
- Open DevTools (F12) → Console
- Check for JavaScript errors
- Verify `main.js` loads

---

## 📚 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Flask (Python) |
| **Frontend** | HTML5, CSS3 (1356+ lines), JavaScript ES6+ |
| **Server** | Gunicorn (app), Nginx (reverse proxy) |
| **Animations** | 20+ CSS keyframes + RequestAnimationFrame |
| **SSL** | Let's Encrypt (Free HTTPS) |
| **Deployment** | Linux VPS / Web Hosting |

---

## 📞 Team Info

- **Team Name:** 6h4T9pTpR0
- **Organization:** Câu lạc bộ An Ninh Mạng HUTECH
- **University:** Đại học HUTECH, TP.HCM
- **CTFtime:** https://ctftime.org/team/412747/
- **Founded:** 2023

---

**Last Updated:** November 13, 2025 ✨
**Made with 💚 for cybersecurity enthusiasts**
