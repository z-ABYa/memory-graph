# Memory-Graph Chatbot Architecture

## Overview

The Memory-Graph Chatbot is an AI assistant that combines:

- Retrieval Augmented Generation (RAG)
- Long-Term Memory
- Knowledge Graph
- Web Search
- Large Language Model (Gemini)

Unlike traditional chatbots, this system remembers previous interactions and combines personal memories, uploaded documents, knowledge graph relations, and real-time web information before generating responses.

---

# High Level Architecture

                    User
                      │
                      ▼
             React Frontend
                      │
                REST API Calls
                      │
                      ▼
             FastAPI Backend
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼

Retriever Memory Manager Web Search
│ │ │
▼ ▼ ▼
ChromaDB Memory Store Scraper
│
▼
Prompt Builder
│
▼
Gemini API
│
▼
Final Response

---

# Project Structure

backend/

    app/
        api/
        rag/
        memory/
        graph/
        llm/
        scraper/
        models/
        utils/

frontend/

    src/
        pages/
        components/
        services/

docs/

    architecture.md
    api_documentation.md
    workflow.md

---

# Major Components

## 1. Frontend

Technology:

- React
- Tailwind CSS
- Axios

Responsibilities:

- Chat Interface
- Upload Documents
- Web Search
- Memory Viewer
- Knowledge Graph Viewer

---

## 2. FastAPI Backend

Acts as the central controller.

Responsibilities:

- Receive user requests
- Call retriever
- Query memory
- Search documents
- Build prompts
- Call Gemini
- Return response

---

## 3. Retriever

Responsible for document retrieval.

Workflow:

Documents
↓

Chunking
↓

Embedding
↓

Vector Search
↓

Relevant Context

Technologies:

- ChromaDB
- Sentence Transformers

---

## 4. Long-Term Memory

Stores important user information.

Examples:

- User preferences
- Previous conversations
- Personal facts

Supports:

- Add Memory
- Retrieve Memory
- Update Memory

---

## 5. Knowledge Graph

Represents entities and relationships.

Example

User
│
├── likes → Java
├── studying → Spring Boot
└── project → Memory Chatbot

Benefits:

- Better reasoning
- Connected information
- Structured retrieval

---

## 6. Prompt Builder

Combines

- User Question
- Retrieved Documents
- Memories
- Knowledge Graph
- Web Search Results

into one optimized prompt.

---

## 7. Gemini LLM

Receives the final prompt and generates the answer.

---

# Data Flow

User Question

↓

API

↓

Retrieve Documents

↓

Retrieve Memory

↓

Retrieve Knowledge Graph

↓

(Optional Web Search)

↓

Prompt Builder

↓

Gemini

↓

Response

---

# Advantages

✓ Long-term memory

✓ Retrieval-Augmented Generation

✓ Knowledge Graph reasoning

✓ Real-time information

✓ Scalable architecture

✓ Modular design

---

# Future Improvements

- Authentication
- User Profiles
- Conversation History
- Redis Caching
- Multi-user Memory
- Streaming Responses
- Docker Deployment
- Kubernetes Support
- CI/CD Pipeline
