import os
import hashlib
import hmac
import secrets
from datetime import datetime, timedelta
from typing import Optional
import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

SECRET_KEY = os.getenv("JWT_SECRET", "SUPER_SECRET_KEY_123_XYZ")
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    """Generates a secure random 16-byte salt and hashes the password using PBKDF2-SHA256."""
    salt = secrets.token_hex(16)
    # 100,000 iterations ensure top-tier industry security standard matching
    db_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
    return f"{salt}${db_hash.hex()}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Safely verifies the plain password against the stored salt and hash using constant-time comparison."""
    try:
        salt, db_hash = hashed_password.split('$')
        new_hash = hashlib.pbkdf2_hmac('sha256', plain_password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return hmac.compare_digest(new_hash.hex(), db_hash)
    except Exception:
        return False

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Generates a secure stateless JWT session token for the user."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)) -> str:
    """Validates the active session JWT token and returns the absolute user_id context."""
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token payload variables")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate dynamic session credentials")
