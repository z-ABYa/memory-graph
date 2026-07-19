# 🧠 MemoryGraph chatbot

A Memory-Graph AI Chatbot that combines **Retrieval-Augmented Generation (RAG)**, **Long-Term Memory**, **Knowledge Graph**, and **Real-Time Web Search** to deliver context-aware and personalized responses.

Unlike traditional chatbots that rely only on recent conversation history, this project enables persistent memory, document retrieval, structured reasoning, and access to up-to-date web information.

---

## Features

- 📄 Retrieval-Augmented Generation (RAG)
- 🧠 Long-Term Memory Management
- 🌐 Real-Time Web Search
- 🕸️ Knowledge Graph Integration
- 📚 PDF Document Upload & Retrieval
- 💬 Context-Aware Conversations
- ⚡ FastAPI Backend
- 🎨 React + Tailwind Frontend
- 🔍 Semantic Search with ChromaDB
- 🤖 Gemini API Integration

---

## 🛠️ Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios

### Backend

- FastAPI
- Python
- Pydantic

### AI & ML

- Gemini API
- Sentence Transformers
- ChromaDB
- LangChain

### Data Storage

- ChromaDB
- Local Memory Store

---

## 📂 Project Structure

```
Memory-Graph/
│
├── backend/
│   ├── app/
│   ├── data/
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docs/
│   ├── architecture.md
│   ├── workflow.md
│   └── api_documentation.md
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/z-abya/memory-graph
cd memory-graph
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| GET    | `/health`   | Health Check         |
| POST   | `/chat`     | Chat with AI         |
| POST   | `/upload`   | Upload PDF           |
| POST   | `/scrape`   | Scrape Website       |
| GET    | `/memory`   | Retrieve Memory      |
| POST   | `/memory`   | Store Memory         |
| GET    | `/graph`    | View Knowledge Graph |
| POST   | `/evaluate` | Evaluate Response    |

---

## 📖 Documentation

- `docs/architecture.md`
- `docs/workflow.md`
- `docs/api_documentation.md`
