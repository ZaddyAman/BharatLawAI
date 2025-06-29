# rag/embed_store.py

from chromadb import PersistentClient
from sentence_transformers import SentenceTransformer
import json, os, re
from tqdm import tqdm

# Initialize Sentence Transformer model
model = SentenceTransformer("BAAI/bge-small-en-v1.5")

# Initialize Chroma persistent client
chroma_client = PersistentClient(path="./chroma_db")

# Optional: delete old collection to start clean
chroma_client.delete_collection("legal_assistant")

# Create fresh collection
collection = chroma_client.get_or_create_collection("legal_assistant")

# Chunking function (split by word count)
def chunk_text(text, max_words=200):
    words = text.split()
    return [" ".join(words[i:i+max_words]) for i in range(0, len(words), max_words)]

# Load parsed legal sections
with open("data/parsed_acts.jsonl", "r", encoding="utf-8") as f:
    for line in tqdm(f, desc="🔁 Embedding & Storing"):
        record = json.loads(line)
        chunks = chunk_text(record["text"])

        for idx, chunk in enumerate(chunks):
            # Generate stable ID
            act = record.get("act", "UNKNOWN_ACT").replace(" ", "_")
            section = re.sub(r"[^\w]", "", record["section_no"])  # clean section_no
            uid = f"{act}_{section}_{idx}"

            embedding = model.encode(chunk).tolist()
            metadata = {
                "section_no": record["section_no"],
                "heading": record["heading"],
                "part": record.get("part", ""),
                "act": record.get("act", "UNKNOWN_ACT"),
                "chunk_index": idx
            }

            # Add chunk to ChromaDB
            collection.add(
                documents=[chunk],
                ids=[uid],
                metadatas=[metadata],
                embeddings=[embedding]
            )

print("✅ Done: All chunks embedded and stored in ChromaDB.")
