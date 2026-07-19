"""
workflow.py

Creates the LangGraph workflow.
"""

from langgraph.graph import StateGraph, START, END

from app.langgraph_flow.state import ChatState

from app.langgraph_flow.nodes import (
    retrieve_context,
    build_prompt,
    generate_answer,
    save_memory,
)


def create_workflow():

    workflow = StateGraph(ChatState)

    # Nodes
    workflow.add_node(
        "retrieve_context",
        retrieve_context,
    )

    workflow.add_node(
        "build_prompt",
        build_prompt,
    )

    workflow.add_node(
        "generate_answer",
        generate_answer,
    )

    workflow.add_node(
        "save_memory",
        save_memory,
    )

    # Edges
    workflow.add_edge(
        START,
        "retrieve_context",
    )

    workflow.add_edge(
        "retrieve_context",
        "build_prompt",
    )

    workflow.add_edge(
        "build_prompt",
        "generate_answer",
    )

    workflow.add_edge(
        "generate_answer",
        "save_memory",
    )

    workflow.add_edge(
        "save_memory",
        END,
    )

    return workflow.compile()


graph = create_workflow()