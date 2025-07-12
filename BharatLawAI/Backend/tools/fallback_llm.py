# tools/fallback_llm.py

import ollama
import asyncio
import functools
from typing import List, Dict

async def fallback_llm_response(query: str, history: List[Dict[str, str]]) -> str:
    """
    Fallback LLM with Grok-style humor and memory support.
    """
    prompt = f"""You are a witty but helpful Indian Legal Assistant AI.
When a user asks a question that has no basis in actual Indian law,
respond clearly but with light humor — especially if the question is absurd or confusing.
Still try to be respectful, but don’t hesitate to point out when something makes no legal sense.

Now answer the question below.

Question: {query}
Answer:"""

    messages = history + [{"role": "user", "content": prompt}]

    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(
        None, functools.partial(
            ollama.chat,
            model="llama3:8b-instruct-q4_K_M",
            messages=messages
        )
    )

    return response["message"]["content"]
