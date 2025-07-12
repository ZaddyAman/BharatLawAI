from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from rag.query_engine import query_legal_assistant
from api.acts import router as acts_router  # <-- your optimized engine

app = FastAPI()

# ✅ Allow frontend to talk to backend (localhost + deployed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update if needed for deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📦 Request schema
class ChatRequest(BaseModel):
    question: str

# 📦 Response schema
class ChatResponse(BaseModel):
    answer: str
    source: str

# 🧠 Core chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat_with_user(payload: ChatRequest):
    question = payload.question.strip()

    if not question:
        return {"answer": "⚠️ Please enter a valid legal question.", "source": "fallback_llm"}

    print(f"[Agent] User question: {question}")
    
    result = await query_legal_assistant(question)

    print(f"[Agent] Response Source: {result['source']}")
    return result

app.include_router(acts_router, prefix="/api")

# ✅ Health check (optional)
@app.get("/")
async def root():
    return {"status": "Legal AI Backend is running ✅"}

# 🧪 Local run (optional)
if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
