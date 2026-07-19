from app.memory.memory_manager import MemoryManager

manager = MemoryManager()

manager.save_memory(

    "chetan",

    "My favourite language is Java",

)

manager.save_memory(

    "chetan",

    "I live in Jaipur",

)

manager.save_memory(

    "chetan",

    "Explain FastAPI",

)

memories = manager.retrieve_memories("chetan")

for memory in memories:

    print(memory)