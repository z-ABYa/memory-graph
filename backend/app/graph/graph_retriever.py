"""
graph_retriever.py

Retrieves graph knowledge for answering queries.
"""

from app.graph.graph_manager import GraphManager


class GraphRetriever:

    def __init__(self):

        self.manager = GraphManager()

    def retrieve(

        self,

        user_id,

    ):

        nodes = self.manager.retrieve(user_id)

        if not nodes:

            return ""

        context = ""

        for node in nodes:

            context += (

                f"{user_id} "

                f"{node['relation']} "

                f"{node['entity']}\n"

            )

        return context