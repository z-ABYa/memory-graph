from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def health_check():
    return {
        "status": "running",
        "message": "Memory Augmented Chatbot API is working."
    }