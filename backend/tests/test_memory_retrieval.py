from app.memory.memory_manager import MemoryManager

manager = MemoryManager()

manager.save_memory(

    "chetan",

    "My name is Chetan"

)

manager.save_memory(

    "chetan",

    "I live in Jaipur"

)

manager.save_memory(

    "chetan",

    "My favourite language is Java"

)

context = manager.retrieve_memory_context(

    "chetan",

    "What is my favourite language?"

)

print(context)