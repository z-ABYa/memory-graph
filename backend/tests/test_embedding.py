from app.rag.document_loader import load_document
from app.rag.embeddings import EmbeddingGenerator

url = "https://fastapi.tiangolo.com/"

chunks = load_document(url)

embedding_generator = EmbeddingGenerator()

chunks = embedding_generator.generate_embeddings(chunks)

print(chunks[0].keys())

print()

print(len(chunks[0]["embedding"]))