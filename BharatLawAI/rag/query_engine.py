from sentence_transformers import SentenceTransformer
from chromadb import PersistentClient
import ollama

# Init embedder and DB
embedder = SentenceTransformer("BAAI/bge-small-en-v1.5")
chroma = PersistentClient(path="./chroma_db")
collection = chroma.get_collection("legal_assistant")

def query_legal_assistant(question: str, k: int = 5) -> str:
    # Step 1: Embed the query
    query_embedding = embedder.encode(question).tolist()

    # Step 2: Retrieve relevant docs
    results = collection.query(query_embeddings=[query_embedding], n_results=k)
    docs = results["documents"][0]
    metadatas = results["metadatas"][0]

    if not docs:
        # Fallback to base LLM when no RAG context
        prompt = f"""You are a helpful Indian Legal Assistant.

Answer the following legal question to the best of your general knowledge (even if no documents are provided):

Question: {question}
Answer:"""

        response = ollama.chat(
            model="llama3",
            messages=[{"role": "user", "content": prompt}]
        )

        return "⚠️ *No relevant sections found in the database. This is a general response:*\n\n" + response["message"]["content"]

    # Step 3: Build context from retrieved
    context = "\n\n".join([
        f"{m['section_no']} - {m['heading']}\n{doc}"
        for doc, m in zip(docs, metadatas)
    ])

    # Step 4: Ask LLM with context
    prompt = f"""You are a helpful Indian Legal Assistant.
Use the following legal sections to answer the user's question.

{context}

Question: {question}
Answer:"""

    response = ollama.chat(
        model="llama3",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]
