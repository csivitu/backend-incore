from pydantic import BaseModel, Field
from typing_extensions import Optional

class RegisterModel(BaseModel):
    name: str
    password: str = Field(..., min_length=8)
    email: str

class LoginModel(BaseModel):
    email: str
    password: str = Field(..., min_length=8)
    
class TokenData(BaseModel):
    user_id: Optional[str] = None