from pymongo import MongoClient

from app.config.settings import MONGODB_URI

client = MongoClient(MONGODB_URI)

db = client["memory_chatbot"]

result = db["memories"].delete_many({})

print(f"Deleted {result.deleted_count} memories.")