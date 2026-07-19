"""
graph_store.py

Stores Knowledge Graph using NetworkX.
"""

import os
import json
import networkx as nx
from app.config.settings import DATA_PATH
from app.utils.logger import logger


class GraphStore:

    def __init__(self):

        self.file_path = os.path.join(DATA_PATH, "graph_store.json")

        os.makedirs(DATA_PATH, exist_ok=True)

        self.load_graph()

    def load_graph(self):

        if os.path.exists(self.file_path):

            try:

                with open(self.file_path, "r") as f:

                    data = json.load(f)

                    self.graph = nx.node_link_graph(data)

                    logger.info(f"Loaded persistent graph from {self.file_path} with {self.graph.number_of_nodes()} nodes.")

                    return

            except Exception as e:

                logger.error(f"Error loading graph from {self.file_path}: {e}")

        logger.info("Initializing new in-memory NetworkX DiGraph.")

        self.graph = nx.DiGraph()

    def save_graph(self):

        try:

            data = nx.node_link_data(self.graph)

            with open(self.file_path, "w") as f:

                json.dump(data, f, indent=2)

        except Exception as e:

            logger.error(f"Error saving graph to {self.file_path}: {e}")

    def add_entity(

        self,

        entity_name,

        entity_type,

    ):

        self.graph.add_node(

            entity_name,

            type=entity_type,

        )

        self.save_graph()

    def add_relation(

        self,

        source,

        relation,

        target,

    ):

        self.graph.add_edge(

            source,

            target,

            relation=relation,

        )

        self.save_graph()

    def get_neighbors(

        self,

        entity,

    ):

        if entity not in self.graph:

            return []

        data = []

        for neighbor in self.graph.neighbors(entity):

            data.append(

                {

                    "entity": neighbor,

                    "relation": self.graph[entity][neighbor]["relation"],

                }

            )

        return data

    def has_entity(

        self,

        entity,

    ):

        return entity in self.graph

    def clear(self):

        self.graph.clear()

        self.save_graph()