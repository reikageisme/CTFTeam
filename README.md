CTF Team Website (Flask)

This is a minimal Flask-based website for a CTF team (Team CFT). It's intended to be a small, self-hostable profile/showcase for CTFtime and competitions with a team logo, members, and writeups.

Structure
- app.py — Flask backend and routes
- templates/ — external HTML files (Jinja2 templates)
- static/css, static/js, static/img — static assets
- requirements.txt — Python dependencies

Run locally (Windows PowerShell):

1) Create a virtual environment, install requirements:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2) Start app:

```powershell
python app.py
```

3) Open http://127.0.0.1:5000 in your browser.

Next steps / suggestions
- Replace `static/img/logo.png` with your team logo (square preferably).
- Update `TEAM` dict in `app.py` with real members and links, or connect to a small data store.
- Add a page for adding/publishing writeups (authentication) if desired.
- Optionally deploy to a small VPS or use Gunicorn + Nginx for production.
