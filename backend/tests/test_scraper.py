from app.rag.document_loader import load_document

url = "https://fastapi.tiangolo.com/"

text = load_document(url)

print(text[:1500])