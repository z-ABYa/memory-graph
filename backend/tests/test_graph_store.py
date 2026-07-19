from app.graph.graph_models import (
    Entity,
    Relationship,
)

from app.graph.graph_store import GraphStore

graph = GraphStore()

graph.add_entity(

    Entity(

        "PERSON",

        "Chetan",

    )

)

graph.add_entity(

    Entity(

        "CITY",

        "Jaipur",

    )

)

graph.add_relationship(

    Relationship(

        "Chetan",

        "LIVES_IN",

        "Jaipur",

    )

)

print(

    graph.get_neighbors(

        "Chetan"

    )

)