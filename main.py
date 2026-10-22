from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(
    title="AI-Match Ecosystem API",
    description="Vector Matching Engine & Talent Management Microservices",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class MatchRequest(BaseModel):
    talent_name: str
    talent_skills: list[str]
    experience_years: int = 3
    project_required_skills: list[str]

class TalentNode(BaseModel):
    id: str
    name: str
    role: str
    skills: list[str]
    availability: str = "Available"

class ProjectNode(BaseModel):
    id: str
    title: str
    required_skills: list[str]
    budget: str = "Flexible"

# Mock Databases
talents_db = [
    {"id": "t1", "name": "Sarah Connor", "role": "AI Architect", "skills": ["Python", "FastAPI", "React", "Vector DB"]},
    {"id": "t2", "name": "Alex Mercer", "role": "Frontend Lead", "skills": ["React", "Tailwind CSS", "JavaScript", "UI/UX"]},
    {"id": "t3", "name": "Elena Rostova", "role": "Data Scientist", "skills": ["Python", "scikit-learn", "TensorFlow", "Pandas"]}
]

projects_db = [
    {"id": "p1", "title": "Neural Matchmaker", "required_skills": ["Python", "FastAPI", "React", "scikit-learn"]},
    {"id": "p2", "title": "Cyber Portal", "required_skills": ["React", "Tailwind CSS", "UI/UX"]}
]

# Endpoints
@app.get("/", tags=["Health"])
def read_root():
    return {"status": "AI-Match Ecosystem Backend Active", "version": "1.0.0"}

@app.get("/api/stats", tags=["Analytics"])
def get_stats():
    return {
        "compatibility_index": 92.4,
        "talent_pool_count": len(talents_db),
        "active_projects": len(projects_db),
        "matched_pairs_today": 18
    }

@app.get("/api/talents", tags=["Talents"])
def get_all_talents():
    return {"talents": talents_db}

@app.get("/api/projects", tags=["Projects"])
def get_all_projects():
    return {"projects": projects_db}

@app.post("/api/match", tags=["Matching Engine"])
def run_match(data: MatchRequest):
    talent_str = " ".join(data.talent_skills)
    project_str = " ".join(data.project_required_skills)
    
    if not talent_str.strip() or not project_str.strip():
        score = 50.0
    else:
        vectorizer = TfidfVectorizer()
        matrix = vectorizer.fit_transform([talent_str, project_str])
        sim = cosine_similarity(matrix[0:1], matrix[1:2])
        score = float(sim[0][0]) * 70 + min(data.experience_years * 6, 30)
        score = round(min(max(score, 0.0), 100.0), 1)

    matched = list(set(data.talent_skills).intersection(set(data.project_required_skills)))
    missing = [s for s in data.project_required_skills if s not in data.talent_skills]

    recommendation = "Highly Recommended" if score >= 75 else "Good Fit"

    return {
        "talent_name": data.talent_name,
        "compatibility_score": score,
        "recommendation": recommendation,
        "matched_skills": matched,
        "missing_skills": missing
    }
        
    