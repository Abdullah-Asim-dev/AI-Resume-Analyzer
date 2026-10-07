from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from database import users_collection, history_collection
from auth import hash_password, verify_password, create_access_token, get_current_user
from bson import ObjectId

router = APIRouter(prefix="/api/auth", tags=["Authentication"])
history_router = APIRouter(prefix="/api/history", tags=["History"])

# Input Validation Schemas
class UserRegister(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@router.post("/register")
async def register(user: UserRegister):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = hash_password(user.password)
    await users_collection.insert_one({"email": user.email, "password": hashed})
    return {"success": True, "message": "User registered successfully"}

@router.post("/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    token = create_access_token(data={"sub": str(db_user["_id"])})
    return {"success": True, "token": token}

@history_router.get("/")
async def get_history(user_id: str = Depends(get_current_user)):
    cursor = history_collection.find({"user_id": user_id}).sort("timestamp", -1)
    history = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        history.append(document)
    return {"success": True, "history": history}
