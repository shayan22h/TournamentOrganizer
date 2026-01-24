from sqlalchemy.orm import Session
from app.models import User
from app.auth.security import verify_password, hash_password


def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


def register_user(db: Session, full_name: str, username: str, email: str, password: str):
    # Check if username already exists
    existing_username = db.query(User).filter(User.username == username).first()
    if existing_username:
        return None

    # Check if email already exists
    existing_email = db.query(User).filter(User.email == email).first()
    if existing_email:
        return None

    # Hash the password
    password_hash = hash_password(password)

    # Create new user
    new_user = User(
        full_name=full_name,
        username=username,
        email=email,
        password_hash=password_hash
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
