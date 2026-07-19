from app.rag.document_loader import load_document

url = "https://fastapi.tiangolo.com/"

document = load_document(url)

print("=" * 80)

print("Document ID :", document.document_id)

print("Source :", document.source)

print("Total Chunks :", len(document.chunks))

print("=" * 80)

print(document.chunks[0])