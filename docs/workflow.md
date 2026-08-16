# Project Workflow

## Complete Workflow

   User
    ↓
React Frontend
    ↓
FastAPI Endpoint
    ↓
Request Validation
    ↓
Retrieve Relevant Documents
    ↓
Retrieve Long-Term Memory
    ↓
Retrieve Knowledge Graph Context
    ↓
Build Prompt
    ↓
Gemini API
    ↓
Response
    ↓
Store Important Memory
    ↓
Return Final Response

---

# Detailed Workflow

## Step 1

User asks a question.

Example:

"What project am I currently working on?"

---

## Step 2

Frontend sends request

POST

/chat

---

## Step 3

Backend receives request.

Request is validated.

---

## Step 4

Retriever searches vector database.

Relevant document chunks are retrieved.

---

## Step 5

Memory module searches previous conversations.

Example:

User

Current Project

Memory-Graph Chatbot

---

## Step 6

Knowledge Graph retrieves connected entities.

Example

Project

↓

Uses

↓

Spring Boot

↓

Gemini

↓

ChromaDB

---

## Step 7

If required,

Web scraper fetches latest information.

Example

"What is the latest version of LangChain?"

---

## Step 8

Prompt Builder combines

Question

-

Retrieved Documents

-

Memories

-

Knowledge Graph

-

Web Context

---

## Step 9

Gemini generates the answer.

---

## Step 10

Backend decides whether the conversation should be stored as memory.

If important:

Store Memory

Otherwise:

Ignore

---

## Step 11

Response is returned to frontend.

---

# Document Upload Workflow

Upload PDF

↓

Read Document

↓

Chunk Text

↓

Generate Embeddings

↓

Store in ChromaDB

---

# Memory Workflow

Conversation

↓

Extract Important Facts

↓

Store Memory

↓

Future Retrieval

---

# Knowledge Graph Workflow

Text

↓

Entity Extraction

↓

Relationship Extraction

↓

Store Graph

↓

Graph Query

---

# Web Search Workflow

User Query

↓

Search

↓

Extract Content

↓

Summarize

↓

Add to Prompt

---

# Overall Pipeline

User

↓

Frontend

↓

Backend

↓

RAG

↓

Memory

↓

Knowledge Graph

↓

Web Search

↓

Prompt Builder

↓

Gemini

↓

Frontend
