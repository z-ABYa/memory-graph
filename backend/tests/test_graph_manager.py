from app.graph.graph_manager import GraphManager

graph = GraphManager()

graph.build_graph(

    "chetan",

    "My favourite language is Java"

)

graph.build_graph(

    "chetan",

    "I live in Jaipur"

)

graph.build_graph(

    "chetan",

    "My name is Chetan"

)

print(

    graph.retrieve(

        "chetan"

    )

)