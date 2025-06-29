import sys
import os
import streamlit as st

# ✅ Fix sys.path to import `rag` from root
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# ✅ Import modular tabs
from tabs import chat, stats

# ✅ Layout UI
tab1, tab2 = st.tabs(["🧠 Ask Legal Question", "📊 Stats & Monitoring"])

with tab1:
    chat.render()

with tab2:
    stats.render()
