from flask import Flask, render_template, jsonify, url_for
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

# University and Club Information
UNIVERSITY = {
    "name": "Đại học HUTECH",
    "fullName": "Trường Đại học Công nghệ TP.HCM (HUTECH)",
    "website": "https://www.hutech.edu.vn",
    "location": "475A Điện Biên Phủ, Phường 25, Bình Thạnh, TP.HCM",
    "phone": "(028) 3622 4808",
    "description": "Trường đại học trong lĩnh vực công nghệ thông tin và kỹ thuật tại thành phố Hồ Chí Minh",
    "founded": 2007,
    "logo": "/static/img/hutech-logo.png"
}   

CLUB = {
    "name": "Câu lạc bộ An Ninh Mạng HUTECH",
    "shortName": "Cybersecurity Club HUTECH",
    "description": "Câu lạc bộ chuyên về an ninh mạng, hacker security, và Capture The Flag",
    "founded": 2020,
    "members_count": 50,
    "email": "cybersecurity.hutech@gmail.com",
    "achievements": [
        "Đạt giải 3 tại CTF 2024 - Security Conference Vietnam",
        "Tham gia DUCTF 2024",
        "Tổ chức các buổi workshop về bảo mật",
        "Top 10 các team CTF trong khu vực"
    ]
}

# Team data - 6h4T9pTpR0
TEAM = {
    "name": "6h4T9pTpR0",
    "fullName": "6h4T9pTpR0 - HUTECH Cybersecurity Team",
    "tag": "6h4T9pTpR0",
    "logo": "/static/img/logo.png",
    "club": CLUB,
    "university": UNIVERSITY,
    "ctftime": "https://ctftime.org/team/412747/",
    "description": "6h4T9pTpR0 là một team CTF chuyên nghiệp từ Đại học HUTECH, tập trung vào các lĩnh vực pentesting, reverse engineering, web security và forensics.",
    "tagline": "Security Through Capture The Flag",
    "founded": 2023,
    "members": [
        {"name": "BaoZ", "role": "Team Lead/Forensics", "handle": "BaoZ", "avatar": "/static/img/BaoZ.jpg", "email": "baoz@hutech.edu.vn"},
        {"name": "74nhM0i", "role": "Web/Pwn", "handle": "74nhM0i", "avatar": "/static/img/Tanh.jpg", "email": "tanh@hutech.edu.vn"},
    ],
    "socials": {
        "twitter": "https://twitter.com/example",
        "github": "https://github.com/example",
        "facebook": "https://facebook.com/6h4t9ptr0",
        "discord": "#"
    },
    "skills": ["Web Security", "Pwn", "Reverse Engineering", "Forensics", "Cryptography", "Misc"]
}

# Sample writeups
WRITEUPS = [
    # {"title": "Easy Web Challenge - RCE", "ctf": "ExampleCTF 2025", "url": "#"},
    # {"title": "Pwn: heapfun", "ctf": "ExampleCTF 2024", "url": "#"},
    # {"title": "Forensics: Hidden Secrets", "ctf": "CTF 2025", "url": "#"},
    # {"title": "Reverse Engineering: Binary Analysis", "ctf": "Security Con 2025", "url": "#"}
]

@app.route('/')
def index():
    return render_template('index.html', team=TEAM)

@app.route('/team')
def team():
    return render_template('team.html', team=TEAM)

@app.route('/writeups')
def writeups():
    return render_template('writeups.html', team=TEAM, writeups=WRITEUPS)

# API endpoints
@app.route('/api/team.json')
def api_team():
    return jsonify(TEAM)

@app.route('/api/writeups.json')
def api_writeups():
    return jsonify({"writeups": WRITEUPS})

# 404 error handler
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html', team=TEAM), 404

# 500 error handler
@app.errorhandler(500)
def server_error(error):
    return render_template('500.html', team=TEAM), 500

if __name__ == '__main__':
    # Allow running with `python app.py` in development
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
