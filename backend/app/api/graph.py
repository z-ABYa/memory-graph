from fastapi import APIRouter
from app.graph.graph_manager import GraphManager

router = APIRouter()


@router.get("/")
def get_graph():
    manager = GraphManager()
    g = manager.store.graph

    nodes = []
    for node_id, attrs in g.nodes(data=True):
        nodes.append({
            "id": node_id,
            "label": node_id,
            "type": attrs.get("type", "UNKNOWN")
        })

    relationships = []
    for u, v, attrs in g.edges(data=True):
        relationships.append({
            "source": u,
            "target": v,
            "type": attrs.get("relation", "RELATED_TO").upper()
        })

    return {
        "nodes": nodes,
        "relationships": relationships
    }


# Also keep POST for compatibility
@router.post("/")
def get_graph_post():
    return get_graph()