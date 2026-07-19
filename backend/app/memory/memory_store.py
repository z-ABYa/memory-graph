"""
memory_store.py

Handles MongoDB operations for long-term memory.
"""

from pymongo import MongoClient

from app.config.settings import MONGODB_URI
from app.utils.logger import logger


class MemoryStore:

    def __init__(self):

        self.client = MongoClient(MONGODB_URI)

        self.db = self.client["memory_chatbot"]

        self.collection = self.db["memories"]

        logger.info("Connected to MongoDB Memory Database.")

    def save_memory(self, memory):

        existing = self.collection.find_one(

            {
                "user_id": memory.user_id,
                "key": memory.key,
                "value": memory.value,
            }

        )

        if existing:

            logger.info("Memory already exists.")

            return

        self.collection.insert_one(
            memory.to_dict()
        )

        logger.info("Memory stored successfully.")

    def retrieve_relevant_memories(

        self,

        user_id,

        question,

        limit=5,

    ):

        question = question.lower()

        keywords = question.split()

        memories = self.collection.find(

            {
                "user_id": user_id
            }

        )

        results = []

        for memory in memories:

            # Skip old or invalid documents
            key = memory.get("key")
            value = memory.get("value")

            if key is None or value is None:
                continue

            text = f"{key} {value}".lower()

            score = 0

            for word in keywords:

                if word in text:
                    score += 1

            if score > 0:

                memory["score"] = score

                results.append(memory)

        results.sort(

            key=lambda x: x["score"],

            reverse=True,

        )

        return results[:limit]

    def get_all_memories(

        self,

        user_id,

    ):

        return list(

            self.collection.find(

                {
                    "user_id": user_id
                }

            )

        )

    def delete_memories(

        self,

        user_id,

    ):

        self.collection.delete_many(

            {
                "user_id": user_id
            }

        )

        logger.info(

            f"Deleted all memories for {user_id}"

        )