
````markdown
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
````

---

## 🧪 RAG Pipeline

1. **Ingestion**: Acts parsed & chunked
2. **Embedding**: Chunks → vectors via SentenceTransformer
3. **Storage**: Stored in ChromaDB
4. **Querying**: Top-k chunks retrieved per user query
5. **Prompting**: Retrieved chunks + query → passed to Ollama (LLaMA3)
6. **Fallback**: If retrieval fails → LLM-only response
7. **Monitoring**: Logs, feedback saved

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

---

## 🐳 Setup Instructions

### Prerequisites

* Python 3.9+
* Node.js (for full-stack version)
* Ollama (`https://ollama.ai/`)

---

### Option 1 – Streamlit Version

```bash
git clone https://github.com/your-username/BharatLawAI.git
cd BharatLawAI
pip install -r requirements.txt

# Start LLM
ollama run llama3

# Embed data
python rag/embed_store.py

# Launch UI
streamlit run app/streamlit_app.py
```

---

### Option 2 – Full-Stack (React + FastAPI)

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Frontend

```bash
cd ../bharatlaw-frontend
npm install
cp .env.example .env
npm run dev
```

---

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

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file.

```

---

Let me know if you also want:
- A pinned GitHub issue template for bugs or features
- A `docs/` folder with architectural diagrams
- GitHub Pages or Streamlit Cloud deployment instructions

Happy shipping!
```
