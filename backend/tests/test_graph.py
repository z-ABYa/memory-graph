from app.graph.graph_manager import GraphManager

graph = GraphManager()

graph.add_memory(

    {

        "user_id":"chetan",

        "category":"personal",

        "key":"name",

        "value":"Chetan"

    }

)

graph.add_memory(

    {

        "user_id":"chetan",

        "category":"location",

        "key":"city",

        "value":"Jaipur"

    }

)

print(

    graph.retrieve(

        "chetan"

    )

)