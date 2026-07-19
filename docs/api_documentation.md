# API Documentation

Base URL

http://localhost:8000

---

# Health Check

GET /health

Description

Checks whether the backend server is running.

Response

{
    "status":"healthy"
}

---

# Chat

POST /chat

Description

Main chatbot endpoint.

Request

{
    "question":"What is RAG?"
}

Response

{
    "answer":"..."
}

---

# Upload Document

POST /upload

Description

Uploads PDF files into the vector database.

Request

multipart/form-data

file: sample.pdf

Response

{
    "message":"Document uploaded successfully"
}

---

# Scrape Website

POST /scrape

Request

{
    "url":"https://example.com"
}

Response

{
    "message":"Website scraped successfully"
}

---

# Memory

GET /memory

Returns stored memories.

Response

[
    {
        "memory":"User likes Java"
    }
]

---

POST /memory

Stores memory.

Request

{
    "memory":"User prefers Spring Boot"
}

Response

{
    "message":"Memory stored successfully"
}

---

# Knowledge Graph

GET /graph

Returns graph nodes and relationships.

Response

{
    "nodes":[],
    "edges":[]
}

---

# Evaluation

POST /evaluate

Evaluates chatbot performance.

Request

{
    "question":"...",
    "answer":"..."
}

Response

{
    "score":0.93
}

---

# Response Codes

200

Success

400

Bad Request

404

Resource Not Found

500

Internal Server Error

---

# Error Format

{
    "detail":"Error Message"
}

---

# API Flow

Client

↓

FastAPI

↓

Business Logic

↓

Database / Vector DB

↓

Gemini

↓

Response
