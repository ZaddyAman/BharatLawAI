# ⚖️ BharatLawAI – AI Legal Assistant for Indian Law

> A Retrieval-Augmented Generation (RAG)-powered assistant that lets users query Indian laws (IPC, CrPC, CPC, etc.) using natural language. Powered by local LLMs and vector search for accurate, explainable answers.

![Streamlit](https://img.shields.io/badge/Interface-Streamlit%20%7C%20React-blueviolet)
![RAG](https://img.shields.io/badge/RAG-Enabled-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎥 Demo Video

[![Watch the demo](https://img.youtube.com/vi/LFJNSSbH3hc/maxresdefault.jpg)](https://youtu.be/LFJNSSbH3hc)

Click the thumbnail above to watch how BharatLawAI works — from asking legal questions to retrieving grounded answers from Indian acts using local AI.

---

## 🧠 Problem Statement

Legal knowledge in India is vast, scattered, and hard to navigate. BharatLawAI aims to:

- Let users ask legal questions in natural language
- Return context-aware, grounded responses using real acts
- Support feedback and iterative fine-tuning

---

## 📚 Datasets Used

| Source | Format | Content |
|--------|--------|---------|
| [Zenodo Legal Corpus (1838–2020)](https://zenodo.org/record/4277318) | JSONL | Acts, Sections |
| [IndiaLaw – CivicTech](https://github.com/civictech-india/indian-laws-data) | JSON / SQLite | IPC, CrPC, CPC, MVA, HMA, etc. |

---

## 🧩 Project Variants

### Full-Stack Version (React + FastAPI)

| Layer | Stack |
|-------|-------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | FastAPI, Uvicorn |
| RAG | ChromaDB + Sentence-Transformers |
| LLM | Ollama (LLaMA3) |
| Interface | Responsive multi-page SPA |

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
