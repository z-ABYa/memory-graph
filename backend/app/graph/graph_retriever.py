from app.graph.graph_manager import GraphManager

class GraphRetriever:
    def __init__(self):
        self.manager = GraphManager()

    def retrieve(self, user_id: str, question: str = "") -> str:
        # 1. Retrieve user-specific context (neighbors of the user_id node)
        user_nodes = self.manager.retrieve(user_id)
        context_triples = set()

        for node in user_nodes:
            context_triples.add(f"{user_id} {node['relation']} {node['entity']}")

        # 2. Retrieve question-specific general context
        if question:
            question_lower = question.lower()
            graph = self.manager.store.graph
            
            # Find any nodes in the graph that are referenced in the question
            matched_nodes = []
            for node_name in graph.nodes:
                if str(node_name).lower() in question_lower:
                    matched_nodes.append(node_name)
            
            # Fetch neighbors and edges for all matched nodes
            for m_node in matched_nodes:
                # Add outgoing edges
                for neighbor in graph.neighbors(m_node):
                    relation = graph[m_node][neighbor].get("relation", "RELATED_TO")
                    context_triples.add(f"{m_node} {relation} {neighbor}")
                
                # Add incoming edges
                for pred in graph.predecessors(m_node):
                    relation = graph[pred][m_node].get("relation", "RELATED_TO")
                    context_triples.add(f"{pred} {relation} {m_node}")

        if not context_triples:
            return ""

        return "\n".join(list(context_triples)) + "\n"