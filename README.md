# ⚖️ Terms & Conditions Negotiator

An AI agent that reads legal documents, detects risky clauses, explains them in plain English, and generates a negotiation email.

---

## 🚀 First Time Setup

Double-click **`setup.bat`** — it will:
- Create a Python virtual environment
- Install all backend dependencies
- Set up the React frontend

---

## ▶️ Running the App (Every Time)

### Step 1 — Add your Gemini API key (Locally)
Open `run-backend.bat` in Notepad and replace:
  YOUR_GEMINI_API_KEY_HERE
with your actual key from https://aistudio.google.com.
*(Note: Never push this file to GitHub with your actual key still inside!)*

### Step 2 — Start the backend
Double-click **`run-backend.bat`** (keep this window open)

### Step 3 — Start the frontend
Double-click **`run-frontend.bat`** (keep this window open)

### Step 4 — Open the app
Go to http://localhost:5173 in your browser

---

## 📁 Project Structure

  terms-negotiator/
  ├── setup.bat            <- Run once to install everything
  ├── run-backend.bat      <- Start backend (add API key here)
  ├── run-frontend.bat     <- Start frontend
  ├── backend/
  │   ├── main.py
  │   ├── prompts.py
  │   └── requirements.txt
  └── frontend/
      └── src/
          └── App.jsx

---

## 🌍 Deployment

You can deploy this project for free:
1. **Backend (Render)**: Connect your GitHub, create a Web Service out of the `backend` folder, set the Build command to `pip install -r requirements.txt`, Start command to `uvicorn main:app --host 0.0.0.0 --port 10000`, and set `GEMINI_API_KEY` in their environment variables.
2. **Frontend (Vercel/Netlify)**: Connect your GitHub, point the root to the `frontend` folder, switch preset to Vite, and set `VITE_API_URL` to your live Render backend URL.

---

⚠️ AI-assisted analysis only — not legal advice.
