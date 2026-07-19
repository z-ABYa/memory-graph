from app.rag.document_loader import load_document
from app.rag.embeddings import EmbeddingGenerator
from app.rag.vector_store import VectorStore


url = "https://fastapi.tiangolo.com/"

document = load_document(url)

embedding_generator = EmbeddingGenerator()

embeddings = embedding_generator.generate_embeddings(
    document.chunks
)

vector_store = VectorStore()

vector_store.add_documents(
    document.chunks,
    embeddings,
)

print()

print("Knowledge Base Created Successfully!")

print()

print(f"Stored Chunks : {len(document.chunks)}")