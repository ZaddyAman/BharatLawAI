import asyncio
from rag.query_engine import query_legal_assistant

async def main():
    question = "What is Section 246 of IPC?"
    try:
        result = await query_legal_assistant(question)
        print(f"\n✅ Answer: {result['answer']}\n📚 Source: {result['source']}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

