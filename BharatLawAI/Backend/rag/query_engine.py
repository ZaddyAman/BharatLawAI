import asyncio
import functools
from sentence_transformers import SentenceTransformer
from chromadb import PersistentClient
import ollama

from rag.intent_classifier import classify_intent

# Initialize embedder and vector DB client
embedder = SentenceTransformer("BAAI/bge-small-en-v1.5")
chroma = PersistentClient(path="./chroma_db")
collection = chroma.get_collection("legal_assistant")

# Similarity threshold
SIMILARITY_THRESHOLD = 0.75


def get_quick_reply(intent: str) -> str:
    responses = {
        "greeting": "👋 Hello! How can I assist you with any legal matters today?",
        "chitchat": "🧠 Let's stay on topic—feel free to ask a legal question.",
        "thanks": "You're welcome! If you need help with Indian laws, just ask.",
        "goodbye": "Goodbye! Stay safe and legally informed.",
        "feedback": "Thanks for your kind words. I'm here to help!",
    }
    return responses.get(intent, "How can I assist you with your legal question?")


async def query_legal_assistant(question: str, k: int = 5) -> dict:
    loop = asyncio.get_event_loop()

    # 🧠 Step 1: Classify intent (greeting, thanks, legal_query, etc.)
    # classify_intent uses transformers pipeline, which is synchronous.
    intent = await loop.run_in_executor(
        None, functools.partial(classify_intent, question)
    )

    if intent != "legal_query":
        return {
            "answer": get_quick_reply(intent),
            "source": "intent_classifier"
        }

    # 🧠 Step 2: Embed and search vector DB
    # embedder.encode is synchronous, run in executor
    query_embedding = await loop.run_in_executor(
        None, functools.partial(embedder.encode, question)
    )
    query_embedding = query_embedding.tolist()

    # collection.query is synchronous, run in executor
    results = await loop.run_in_executor(
        None, functools.partial(
            collection.query,
            query_embeddings=[query_embedding],
            n_results=k,
            include=["documents", "distances", "metadatas"]
        )
    )

    docs = results["documents"][0]
    distances = results["distances"][0]
    metadatas = results["metadatas"][0]

    # 🤖 Step 3: Decide if relevant enough for RAG
    if not docs or distances[0] > (1 - SIMILARITY_THRESHOLD):
        prompt = f"""You are a helpful Indian Legal Assistant.

Answer the following legal question using your general legal knowledge.

Question: {question}
Answer:"""
        response = await loop.run_in_executor(
            None, functools.partial(
                ollama.chat,
                model="llama3:8b-instruct-q4_K_M",
                messages=[{"role": "user", "content": prompt}]
            )
        )
        return {
            "answer": response["message"]["content"],
            "source": "fallback_llm"
        }

    # 📚 Step 4: Build context for RAG
    context = "\n\n".join([
        f"{m['section_no']} - {m['heading']}\n{doc}"
        for doc, m in zip(docs, metadatas)
    ])

    prompt = f"""You are a helpful Indian Legal Assistant.
Use the following legal sections to answer the user's question:

{context}

Question: {question}
Answer:"""

    response = await loop.run_in_executor(
        None, functools.partial(
            ollama.chat,
            model="llama3",
            messages=[{"role": "user", "content": prompt}]
        )
    )

    return {
        "answer": response["message"]["content"],
        "source": "vector_db"
    }
