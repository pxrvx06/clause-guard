@echo off
echo.
echo ========================================
echo   Terms Negotiator - Windows Setup
echo ========================================
echo.

:: ── Backend setup ──────────────────────────────────────────────
echo [1/4] Creating Python virtual environment...
cd backend
python -m venv venv
if errorlevel 1 (
    echo ERROR: Python not found. Install from https://python.org
    pause
    exit /b 1
)

echo [2/4] Installing backend dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt
call venv\Scripts\deactivate.bat
cd ..

:: ── Frontend setup ─────────────────────────────────────────────
echo.
echo [3/4] Setting up frontend...
cd frontend
call npm create vite@latest . -- --template react 2>nul
if errorlevel 1 (
    echo NOTE: Vite already initialized or prompt appeared - continuing...
)

echo [4/4] Installing frontend dependencies...
call npm install
call npm install axios
cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo HOW TO RUN (open 2 separate terminals):
echo.
echo   Terminal 1 - Backend:
echo     cd backend
echo     venv\Scripts\activate.bat
echo     set GEMINI_API_KEY=your_key_here
echo     uvicorn main:app --reload
echo.
echo   Terminal 2 - Frontend:
echo     cd frontend
echo     npm run dev
echo.
echo   Then open: http://localhost:5173
echo ========================================
pause
