from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, ARRAY
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer(), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    hashed_password = Column(String(100), nullable=False)
    created_on = Column(DateTime(), default=datetime.now)