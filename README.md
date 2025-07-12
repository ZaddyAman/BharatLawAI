# ⚖️ BharatLawAI – AI Legal Assistant for Indian Law

> A Retrieval-Augmented Generation (RAG)-powered assistant that lets users query Indian laws (IPC, CrPC, CPC, etc.) using natural language. Powered by local LLMs and vector search for accurate, explainable answers.

![Streamlit](https://img.shields.io/badge/Interface-Streamlit%20%7C%20React-blueviolet)
![RAG](https://img.shields.io/badge/RAG-Enabled-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎥 Demo Video

[![Watch the demo](https://img.youtube.com/vi/LFJNSSbH3hc/maxresdefault.jpg)](https://youtu.be/LFJNSSbH3hc)

Click the thumbnail above to watch how BharatLawAI works — from asking legal questions to retrieving grounded answers from Indian acts using local AI.


## 💡 Why BharatLawAI?

Legal knowledge in India is vast, fragmented, and not easily accessible to most people. This project solves that by enabling:

* Natural language search for legal sections
* Real-time AI-generated answers grounded in law
* Easy browsing of Indian statutes (IPC, CrPC, etc.)
* Logged user queries and feedback for continuous improvement

* 

---

## 🧠 Core Features

✅ AI Q\&A Chatbot powered by local LLM
✅ Secure user authentication and chat history
✅ Stop response generation mid-way
✅ Section Explorer with search + pagination
✅ Source attribution (legal DB vs LLM guess)
✅ Fully responsive UI
✅ Feedback capture with logging


---

## 📚 Datasets Used

| Source | Format | Content |
|--------|--------|---------|
| [Zenodo Legal Corpus (1838–2020)](https://zenodo.org/record/4277318) | JSONL | Acts, Sections |
| [IndiaLaw – CivicTech](https://github.com/civictech-india/indian-laws-data) | JSON / SQLite | IPC, CrPC, CPC, MVA, HMA, etc. |

---

## 🧩 Project Variants

## ⚙️ Tech Stack

| Layer        | Tools                                               |
| ------------ | --------------------------------------------------- |
| Frontend     | React, TypeScript, Vite, Tailwind CSS, Lucide, GSAP |
| Backend      | FastAPI, Uvicorn, Pydantic, SQLAlchemy, Passlib     |
| Embeddings   | Sentence-Transformers (BAAI/bge-small-en-v1.5)      |
| Vector DB    | ChromaDB (local persistent client)                  |
| LLM          | Groq API / Ollama + LLaMA3                          |
| Data Sources | Indian Bare Acts (IPC, CrPC, CPC, MVA, HMA, etc.)   |


### Streamlit Version (Lightweight RAG Prototype)

| Layer | Stack |
|-------|-------|
| UI | Streamlit |
| RAG | ChromaDB + BAAI/bge-small-en-v1.5 |
| LLM | Ollama (LLaMA3) |
| Features | Tabs, Query logs, Feedback capture |

---

## 📁 Project Structure

```bash
BharatLawAI/
├── app/                 # Streamlit app and tabs
├── backend/             # FastAPI backend logic
│   ├── api/             # Routes
│   ├── rag/             # Embedding, query, fallback
│   ├── tools/           # Search utils, fallback LLMs
│   └── main.py
├── bharatlaw-frontend/  # React frontend app
├── chroma_db/           # Vector DB storage
├── data/                # Acts, feedback logs
├── ingest/              # Data ingestion scripts
├── requirements.txt     # Python dependencies




## 🧪 How It Works (RAG Flow)

1. **Ingest**: Parse and chunk legal sections
2. **Embed**: Convert sections into vectors using Sentence-Transformers
3. **Store**: Store vectors in ChromaDB
4. **Query**: Embed user question → retrieve top-k relevant sections
5. **Prompt**: Merge query + context and send to LLM (Groq/Ollama)
6. **Fallback**: If no context → fallback to raw LLM response
7. **Log**: Save queries, responses, and feedback

---

## 🔐 User Workflow

* **Sign Up / Log In**
* **Ask legal questions via chat**
* **Browse laws in the Section Explorer**
* **View or continue past chats**
* **Give feedback on responses**

---

## 🧾 Sample Questions

* What is the punishment under Section 302 of IPC?
* What does Section 498A say about cruelty?
* Explain divorce under Hindu Marriage Act.
* Which section covers motor vehicle insurance?

---

## 📈 Monitoring & Logging

| Feature                      | Status                                               |
| ---------------------------- | ---------------------------------------------------- |
| Query Feedback               | ✅ Thumbs up/down stored in `data/feedback_log.jsonl` |
| Metrics Tab                  | ✅ View total queries and responses                   |
| External Dashboard (Grafana) | ❌ Planned                                            |

---

## 🛠️ Tech Stack

| Layer            | Tools                  |
| ---------------- | ---------------------- |
| Interface        | Streamlit / React      |
| LLM              | Ollama (LLaMA3)        |
| Embedding        | BAAI/bge-small-en-v1.5 |
| Vector DB        | ChromaDB               |
| Backend          | FastAPI                |
| Styling          | Tailwind CSS           |
| Containerization | Docker (WIP)           |



## 📦 Setup Guide

### Prerequisites

* Python 3.9+
* Node.js (LTS)
* Ollama (for local inference) or Groq API key

---

### Backend Setup (FastAPI)

```bash
cd backend
pip install -r requirements.txt

# Create .env file
echo 'SECRET_KEY=your-secret-key' > .env
echo 'GROQ_API_KEY=your-groq-api-key' >> .env

# Start the backend
uvicorn main:app --reload --port 8000
```

---

### Frontend Setup (React)

```bash
cd bharatlaw-frontend
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:8000
npm run dev
```

---

### Ingest Legal Data (if needed)

```bash
python ingest/load_acts.py
```

## 🤝 Contributing

Pull requests welcome!

1. Fork this repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes
4. Open a PR

---

## ⚠️ Disclaimer

BharatLawAI is for educational and informational use only. It does **not** provide legal advice. Always consult a licensed lawyer for legal matters.

---


