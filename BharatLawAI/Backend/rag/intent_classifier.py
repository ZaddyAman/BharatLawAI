INTENTS = {
    "greeting": ["hi", "hello", "hey", "good morning", "good evening"],
    "goodbye": ["bye", "goodbye", "see you", "take care"],
    "thanks": ["thanks", "thank you", "much appreciated"],
    "chitchat": ["what's up", "how are you", "lol", "cool", "great", "nice"],
    "feedback": ["you’re helpful", "good answer", "awesome", "love it"],
    "legal_query": ["section", "act", "law", "ipc", "procedure", "legal"]
}

def classify_intent(text: str) -> str:
    """
    Classifies the user's message as a predefined intent
    using keyword matching (fallback to 'legal_query').
    """
    text_lower = text.lower()
    for intent, keywords in INTENTS.items():
        if intent == "legal_query": # legal_query is the fallback, check others first
            continue
        for keyword in keywords:
            if keyword in text_lower:
                return intent
    return "legal_query"
