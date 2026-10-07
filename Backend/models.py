from pydantic import BaseModel
from typing import List, Optional

class BulletPointRewrite(BaseModel):
    original: str
    improved: str

class AnalysisData(BaseModel):
    ats_score: int
    summary_feedback: str
    missing_skills: List[str]
    rewritten_bullet_points: List[BulletPointRewrite]
    jd_match_percentage: Optional[float] = 0.0

class AnalysisResponse(BaseModel):
    success: bool
    data: AnalysisData
