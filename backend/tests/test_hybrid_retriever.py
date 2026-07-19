from app.rag.hybrid_retriever import HybridRetriever

retriever = HybridRetriever()

context = retriever.retrieve(

    "chetan",

    "What is my favourite language?"

)

print(context)