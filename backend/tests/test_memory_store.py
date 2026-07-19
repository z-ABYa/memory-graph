from app.memory.memory_models import Memory
from app.memory.memory_store import MemoryStore


store = MemoryStore()

memory = Memory(

    user_id="user123",

    question="My favourite language is Java",

    answer="Your favourite language is Java."

)

store.save_memory(memory)

print(

    store.get_memories("user123")

)