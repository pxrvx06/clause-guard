@echo off
echo Starting backend...
echo.
echo Make sure to set your Gemini API key below!
echo.

cd backend

:: ── Set your Gemini API key here ───────────────────────────────
set GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

call venv\Scripts\activate.bat
uvicorn main:app --reload
