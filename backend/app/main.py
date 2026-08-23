import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.chat import router as chat_router
from app.api.scrape import router as scrape_router
from app.api.upload import router as upload_router
from app.api.memory import router as memory_router
from app.api.graph import router as graph_router
from app.api.evaluate import router as evaluate_router
from app.api.analytics import router as analytics_router


from google import genai

# This will look for your GEMINI_API_KEY environment variable
client = genai.Client()

# Fetch and print all models your key can access
print("--- Available Models for Your Key ---")
for model in client.models.list():
    print(f"Model ID: {model.name}")


app = FastAPI(
    title="Memory Augmented Chatbot",
    version="1.0.0",
    description="Hybrid RAG + Knowledge Graph + Long-Term Memory Chatbot",
)

# -----------------------------
# CORS Configuration
# -----------------------------
# FRONTEND_URL is set via environment variable in production (e.g., your Vercel URL)
FRONTEND_URL = os.getenv("FRONTEND_URL", "")

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

if FRONTEND_URL:
    allowed_origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# API Routes
# -----------------------------
app.include_router(health_router, prefix="/health", tags=["Health"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])
app.include_router(scrape_router, prefix="/scrape", tags=["Scraping"])
app.include_router(upload_router, prefix="/upload", tags=["Upload"])
app.include_router(memory_router, prefix="/memory", tags=["Memory"])
app.include_router(graph_router, prefix="/graph", tags=["Knowledge Graph"])
app.include_router(evaluate_router, prefix="/evaluate", tags=["Evaluation"])
app.include_router(analytics_router, prefix="/analytics", tags=["Analytics"])


@app.get("/")
def root():
    return {
        "message": "Welcome to the Memory Augmented Chatbot API"
    }