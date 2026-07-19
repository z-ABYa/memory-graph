from app.graph.graph_manager import GraphManager
from app.graph.graph_retriever import GraphRetriever

graph = GraphManager()

graph.build_graph(

    "chetan",

    "My favourite language is Java"

)

graph.build_graph(

    "chetan",

    "I live in Jaipur"

)

retriever = GraphRetriever()

print(

    retriever.retrieve(

        "chetan"

    )

)