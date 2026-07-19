"""
chat_models.py

Models used by the chat API.
"""

from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str