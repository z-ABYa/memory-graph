from app.rag.retriever import Retriever

retriever = Retriever()

query = "What is FastAPI?"

results = retriever.retrieve(query)

print()

print("=" * 80)

print("Retrieved Chunks")

print("=" * 80)

for i, doc in enumerate(results["documents"][0], start=1):

    print(f"\nChunk {i}\n")

    print(doc)

    print("-" * 80)