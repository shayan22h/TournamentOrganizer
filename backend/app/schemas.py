from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    fullName: str
    username: str
    password: str
    email: str
