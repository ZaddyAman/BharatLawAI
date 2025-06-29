# ⚖️ BharatLawAI

> A Retrieval-Augmented Generation (RAG) based AI Legal Assistant for Indian Law (1838–2020)

![Streamlit](https://img.shields.io/badge/Built%20with-Streamlit-orange)
![RAG](https://img.shields.io/badge/RAG-Enabled-blue)
![License](https://img.shields.io/badge/License-MIT-green)

BharatLawAI is an AI-powered legal assistant that helps users query Indian legal acts (like IPC, CrPC, CPC, etc.) using natural language. It leverages RAG with a vector database + local LLM to provide accurate, explainable answers grounded in law.

---

## 🚀 Demo
![Screenshot 2025-06-29 145407](https://github.com/user-attachments/assets/504e2655-1d1e-4df5-ba56-45805c972119)
![Screenshot 2025-06-29 145441](https://github.com/user-attachments/assets/61d81fa6-85b3-46af-9fcf-b1264601b6ec)



---

## 🧠 Problem Statement

Legal information in India is vast, fragmented, and hard to access without expertise. This project solves that by:

- Making laws searchable via natural language questions
- Supporting fast and accurate legal lookups via RAG
- Allowing feedback, monitoring, and fine-tuning over time

---

## 📚 Datasets Used

| Source | Format | Acts Included |
|--------|--------|----------------|
| [Zenodo Legal Corpus (1838–2020)](https://zenodo.org/record/4277318) | JSONL | Acts, Sections |
| [IndiaLaw Bare Acts (CivicTech)](https://github.com/civictech-india/indian-laws-data) | JSON/SQLite | IPC, CrPC, CPC, MVA, HMA, IDA, IEA, NIA |

---

## 🛠️ Tech Stack

| Layer | Tools |
|-------|-------|
| **Interface** | `Streamlit` |
| **LLM** | `Ollama` (LLaMA3) |
| **Embedding Model** | `BAAI/bge-small-en-v1.5` |
| **Vector DB** | `ChromaDB` |
| **Ingestion** | Python scripts (custom loaders) |
| **Monitoring** | Streamlit metrics, feedback logging |
| **Containerization** | Docker-ready (optional) |

---

## 🧩 Project Structure
BharatLawAI/
├── app/            ✅ contains `streamlit_app.py` and `tabs/`
├── chroma_db/      ✅ vector DB from Chroma
├── data/           ✅ stores parsed data, feedback logs, etc.
├── ingest/         ✅ ingestion pipeline
├── rag/            ✅ contains `query_engine.py`
├── requirements.txt✅ includes all Python dependencies




---

## 🧪 RAG Pipeline

1. ✅ **Ingestion**: Legal acts are parsed and chunked
2. ✅ **Embedding**: SentenceTransformer encodes chunks
3. ✅ **Storage**: Chunks + embeddings stored in ChromaDB
4. ✅ **Query**: Questions embedded → top-k chunks retrieved
5. ✅ **LLM Prompting**: Prompt built → passed to LLaMA3 via Ollama
6. ✅ **Fallback**: If no chunks found → fallback to raw LLM
7. ✅ **Monitoring**: Answers saved, feedback logged

---

## 🧾 Sample Questions

- *What is the punishment under Section 302?*
- *Explain cruelty under Section 498A of IPC.*
- *What does the Hindu Marriage Act say about divorce?*
- *Which section talks about motor vehicle insurance?*

---

## 🧪 Evaluation

| Component         | Evaluation Done? | Details |
|------------------|------------------|---------|
| Problem Defined  | ✅ Yes | Described above |
| RAG Flow         | ✅ Yes | Vector DB + LLM |
| Retrieval Eval   | ✅ Yes | Top-k (varied), manual inspection |
| Prompt Eval      | ✅ Yes | Tested prompting styles |
| UI               | ✅ Yes | Streamlit multi-tab interface |
| Ingestion        | ✅ Yes | JSON ingestion, loaders |
| Monitoring       | ✅ Yes | Thumbs up/down, logs |
| Containerization | ✅ Optional | Dockerfile WIP |

---

## 📈 Monitoring Example

- ✅ User feedback stored in `data/feedback_log.jsonl`
- ✅ Stats tab visualizes total queries, good/bad feedback
- ❌ Advanced dashboards (Grafana) not yet added

---

## 🔐 Limitations & Next Steps

| Limitation | Plan |
|------------|------|
| Limited Sections | Add NLP section-linking + uploadable chunks |
| No OCR/Image Acts | Add OCR + visual document support |
| No advanced dashboards | Add Grafana/Kibana |
| No multilingual support | Add support for Hindi queries |

---

## 🚀 Setup Instructions

```bash
git clone https://github.com/your-username/BharatLawAI.git
cd BharatLawAI
pip install -r requirements.txt

# Start LLM (e.g., Ollama)
ollama run llama3

# Embed and store sections
python rag/embed_store.py

# Launch app
streamlit run app/streamlit_app.py


