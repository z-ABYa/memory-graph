from fastapi import APIRouter
from app.rag.vector_store import VectorStore
from app.memory.memory_store import MemoryStore
from app.graph.graph_manager import GraphManager

router = APIRouter()


@router.get("/")
def get_analytics(user_id: str = "default_user"):
    # 1 & 2: Chunks and unique document sources from ChromaDB
    try:
        vector_store = VectorStore()
        chunks_count = vector_store.collection.count()
        
        # Get unique sources
        metadatas = vector_store.collection.get(include=["metadatas"])["metadatas"] or []
        unique_sources = {m.get("source") for m in metadatas if m and m.get("source")}
        documents_count = len(unique_sources)
    except Exception:
        chunks_count = 0
        documents_count = 0

    # 3: Memory count from MongoDB
    try:
        memory_store = MemoryStore()
        memories = memory_store.get_all_memories(user_id)
        memory_count = len(memories)
    except Exception:
        memory_count = 0

    # 4 & 5: Nodes and relations from persistent graph store
    try:
        graph_manager = GraphManager()
        g = graph_manager.store.graph
        nodes_count = g.number_of_nodes()
        relations_count = g.number_of_edges()
    except Exception:
        nodes_count = 0
        relations_count = 0

    return {
        "documents": documents_count,
        "chunks": chunks_count,
        "memory": memory_count,
        "nodes": nodes_count,
        "relations": relations_count
    }
