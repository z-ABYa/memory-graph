"""
memory_manager.py
"""

from app.memory.memory_models import Memory
from app.memory.memory_store import MemoryStore
from app.memory.memory_utils import MemoryExtractor


class MemoryManager:

    def __init__(self):

        self.store = MemoryStore()

        self.extractor = MemoryExtractor()

    def save_memory(

        self,

        user_id,

        message,

    ):

        memory = self.extractor.extract(message)

        if memory is None:

            return False

        obj = Memory(

            user_id=user_id,

            category=memory["category"],

            key=memory["key"],

            value=memory["value"],

        )

        self.store.save_memory(obj)

        return True

    def retrieve_memory_context(

        self,

        user_id,

        question,

    ):

        memories = self.store.retrieve_relevant_memories(

            user_id,

            question,

        )

        context = ""

        for memory in memories:

            context += (

                f'{memory["key"]}: '

                f'{memory["value"]}\n'

            )

        return context

    def get_all_memories(

        self,

        user_id,

    ):

        return self.store.get_all_memories(

            user_id

        )