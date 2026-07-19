from dotenv import load_dotenv
import os

load_dotenv()

# ==========================
# API Keys
# ==========================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ==========================
# Models
# ==========================

MODEL_NAME = os.getenv(
    "MODEL_NAME",
    "gemini-2.0-flash"
)

EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "all-MiniLM-L6-v2"
)

# ==========================
# Chroma DB
# ==========================

CHROMA_DB_PATH = os.getenv(
    "CHROMA_DB_PATH",
    "app/vector_db"
)

COLLECTION_NAME = os.getenv(
    "COLLECTION_NAME",
    "knowledge_base"
)

# ==========================
# Data
# ==========================

DATA_PATH = os.getenv(
    "DATA_PATH",
    "app/data"
)

# ==========================
# Chunk Settings
# ==========================

CHUNK_SIZE = int(
    os.getenv("CHUNK_SIZE", 800)
)

CHUNK_OVERLAP = int(
    os.getenv("CHUNK_OVERLAP", 150)
)

MONGODB_URI = os.getenv("MONGODB_URI")