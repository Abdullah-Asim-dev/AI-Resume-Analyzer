import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# Agar local MongoDB hai toh mongodb://localhost:27017 use karein, warna Atlas URI
MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.resume_analyzer

# Collections
users_collection = database.get_collection("users")
history_collection = database.get_collection("analysis_history")
