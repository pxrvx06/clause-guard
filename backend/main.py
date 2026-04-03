from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pdfplumber
import google.generativeai as genai
import io
import os
from prompts import ANALYZE_PROMPT, EMAIL_PROMPT

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY_HERE"))
model = genai.GenerativeModel("gemini-2.5-flash")


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    contents = await file.read()
    text = ""
    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return {"text": text[:8000]}


class TextInput(BaseModel):
    text: str

@app.post("/analyze")
async def analyze(data: TextInput):
    prompt = ANALYZE_PROMPT.format(text=data.text)
    response = model.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"}
    )
    return {"result": response.text}


class ClauseList(BaseModel):
    clauses: list[str]

@app.post("/email")
async def generate_email(data: ClauseList):
    clauses_text = "\n".join(f"- {c}" for c in data.clauses)
    prompt = EMAIL_PROMPT.format(clauses=clauses_text)
    response = model.generate_content(prompt)
    return {"email": response.text}


@app.get("/")
def root():
    return {"status": "Terms Negotiator API is running"}
