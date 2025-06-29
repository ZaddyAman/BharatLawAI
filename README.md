# ⚖️ BharatLawAI

> A Retrieval-Augmented Generation (RAG) based AI Legal Assistant for Indian Law (1838–2020)

![Streamlit](https://img.shields.io/badge/Built%20with-Streamlit-orange)
![RAG](https://img.shields.io/badge/RAG-Enabled-blue)
![License](https://img.shields.io/badge/License-MIT-green)

BharatLawAI is an AI-powered legal assistant that helps users query Indian legal acts (like IPC, CrPC, CPC, etc.) using natural language. It leverages RAG with a vector database + local LLM to provide accurate, explainable answers grounded in law.

---

## 🚀 Demo

![Demo Preview](demo.gif)  
> *(Live app link coming soon if deployed)*

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

