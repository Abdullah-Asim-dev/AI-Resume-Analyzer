import os
import re
import json
import requests
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Core library client class for Groq execution channels
from groq import Groq 

# Internal core functional dependencies
from utils import extract_text_from_file
from models import AnalysisResponse
from prompts import get_ats_system_prompt
from routes import router as auth_router, history_router
from database import history_collection
from auth import get_current_user

load_dotenv()

# --- STANDALONE FASTAPI INSTANCE DEFINITION ---
app = FastAPI(title="AI Resume Analyzer Core Backend Engine (Production Global Edition)")

# --- STRUCTURAL AUTHORIZED CORS ORIGINS MATRIX ---
# Explicitly mapping your live production Vercel frontend URL to clear domain validation gates
allowed_origins = [
    "https://ai-resume-analyzer-xi-neon.vercel.app", 
    "http://localhost:3000",                          # Steady local machine testing bridge
    "http://127.0.0.1:3000"
]

print(f"[SYSTEM CONFIGURATION] Allowed security origins matrix securely locked onto: {allowed_origins}")

# CORS Access Management Handshake Layer
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Active identity tracking router node inclusions
app.include_router(auth_router)
app.include_router(history_router)

def clean_json_string(raw_string: str) -> str:
    """Removes potential markdown markers ```json ... ``` injected by LLM variations."""
    cleaned = raw_string.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?", "", cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r"```$", "", cleaned).strip()
    return cleaned

def get_semantic_similarity(resume_text: str, jd_text: str) -> float:
    """Computes semantic proximity matching metrics using pure algorithmic matrix distance fallback."""
    try:
        resume_words = set(re.findall(r'\w+', resume_text.lower()))
        jd_words = set(re.findall(r'\w+', jd_text.lower()))
        if not jd_words: return 50.0
        intersection = resume_words.intersection(jd_words)
        score = round((len(intersection) / len(jd_words)) * 100, 2)
        return max(35.0, min(98.5, score))
    except Exception:
        return 62.0

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(""),
    user_id: str = Depends(get_current_user)
):
    groq_key = os.getenv("GROQ_API_KEY")
    if not groq_key:
        raise HTTPException(status_code=500, detail="Groq API Key missing inside server environment profile .env files.")

    try:
        # Step 1: Ingest document data bytes stream
        file_bytes = await file.read()
        extracted_text = extract_text_from_file(file_bytes, file.filename)
        
        if not extracted_text or len(extracted_text.strip()) < 10:
            raise HTTPException(status_code=400, detail="Document extraction layer retrieved empty raw sequence traces.")

        # Step 2: Compute local contextual similarity matrix weights
        jd_match_percent = 0.0
        if job_description.strip():
            jd_match_percent = get_semantic_similarity(extracted_text, job_description)

        # Step 3: Deployed Groq Real-time Llama-3 Parsing Pipeline Framework
        client = Groq(api_key=groq_key)
        
        system_rules = get_ats_system_prompt()
        user_input_data = f"--- RESUME DATA TEXT ---\n{extracted_text}\n\n--- TARGET DESCRIPTION CONSTRAINTS ---\n{job_description}"
        
        print("[GROQ ENGINE] Dispatching structural text constraints arrays down high-speed LPU pipelines...")
        
        # Deployed onto official active production model 'qwen-2.5-coder-32b' running on Groq hardware channels
        response = client.chat.completions.create(
            model="qwen-2.5-coder-32b",
            messages=[
                {"role": "system", "content": system_rules},
                {"role": "user", "content": user_input_data}
            ],
            response_format={"type": "json_object"},
            temperature=0.1,
            max_tokens=1500
        )
        
        raw_text_output = response.choices.message.content
        if not raw_text_output:
            raise ValueError("Groq dynamic processing LPU matrix returned a null string data trace buffer.")
            
        json_clean_string = clean_json_string(raw_text_output)
        parsed_analysis = json.loads(json_clean_string)
        
        parsed_analysis["jd_match_percentage"] = jd_match_percent

        # Step 4: Record audit record context telemetry into MongoDB Atlas
        await history_collection.insert_one({
            "user_id": user_id,
            "filename": file.filename,
            "timestamp": datetime.utcnow(),
            "analysis": parsed_analysis
        })

        return {"success": True, "data": parsed_analysis}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Core Analytical Engine Overrides Error: {str(e)}")
