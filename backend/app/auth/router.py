import logging
from fastapi import APIRouter, Depends, Response, HTTPException
from sqlalchemy.orm import Session
from app.schemas import LoginRequest
from app.database import get_db
from app.auth.service import authenticate_user
from app.auth.security import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login(
    data: LoginRequest,
    response: Response,
    db: Session = Depends(get_db)
):
    logging.info("Login attempt for user: %s", data.email)
    user = authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(str(user.id))

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,      # true in production (HTTPS)
        samesite="lax"
    )

    return {"status": "ok"}
