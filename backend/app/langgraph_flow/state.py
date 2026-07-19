"""
state.py

State shared across the LangGraph workflow.
"""

from typing import TypedDict


class ChatState(TypedDict):
    user_id: str
    question: str

    context: dict

    prompt: str

    answer: str