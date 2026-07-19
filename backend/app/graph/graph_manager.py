"""
graph_manager.py
"""

from app.graph.graph_store import GraphStore
from app.graph.entity_extractor import EntityExtractor
from app.graph.relation_extractor import RelationExtractor


class GraphManager:

    def __init__(self):

        self.store = GraphStore()

        self.entity = EntityExtractor()

        self.relation = RelationExtractor()

    def build_graph(

        self,

        user_id,

        text,

    ):

        entities = self.entity.extract(text)

        relations = self.relation.extract(

            user_id,

            entities,

        )

        for relation in relations:

            self.store.add_entity(

                relation["source"],

                "USER",

            )

            self.store.add_entity(

                relation["target"],

                relation["type"],

            )

            self.store.add_relation(

                relation["source"],

                relation["relation"],

                relation["target"],

            )

    def retrieve(

        self,

        entity,

    ):

        return self.store.get_neighbors(entity)