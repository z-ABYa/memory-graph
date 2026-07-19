"""
chat.py

Chat API powered by LangGraph.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.langgraph_flow.router import LangGraphRouter

router = APIRouter()

langgraph = LangGraphRouter()


class ChatRequest(BaseModel):
    user_id: str = "default_user"
    question: str


@router.post("/")
def chat(request: ChatRequest):

    try:

        result = langgraph.run(
            user_id=request.user_id,
            question=request.question,
        )

        return {
            "success": True,
            "answer": result.get("answer", ""),
            "memory": result.get("memory", []),
            "graph": result.get("graph", []),
            "rag": result.get("rag", []),
            "rag_chunks": len(result.get("rag", [])),
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )