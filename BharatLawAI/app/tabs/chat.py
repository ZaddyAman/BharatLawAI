import streamlit as st
import sys, os, json, time
from datetime import datetime

# ✅ Access root project modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from rag.query_engine import query_legal_assistant

# ✅ Typing animation
def typing_effect(text, delay=0.01):
    full = ""
    placeholder = st.empty()
    for char in text:
        full += char
        placeholder.markdown(full + "▌")
        time.sleep(delay)
    placeholder.markdown(full)

def render():
    st.title("⚖️ AI Indian Legal Assistant")
    st.markdown("Ask legal questions based on Indian Acts (1838–2020)")

    # ✅ Ask form
    with st.form(key="chat_form"):
        question = st.text_input("📩 Your legal question:")
        submitted = st.form_submit_button("Ask")

        if submitted and question.strip():
            st.session_state["question"] = question
            st.session_state["generate"] = True
            st.session_state["feedback"] = None
            st.session_state["timestamp"] = datetime.now().isoformat()

    # ✅ Run model only if flagged
    if st.session_state.get("generate"):
        with st.spinner("🤖 Thinking..."):
            st.session_state["answer"] = query_legal_assistant(st.session_state["question"])
            st.session_state["generate"] = False

    # ✅ Show answer if available
    if "answer" in st.session_state:
        st.markdown("#### 🤖 Assistant:")
        typing_effect(st.session_state["answer"], delay=0.005)

        st.divider()
        st.subheader("📨 User Feedback")

        col1, col2, col3 = st.columns(3)
        with col1:
            if st.button("👍 Good Answer"):
                st.session_state["feedback"] = "thumbs_up"
        with col2:
            if st.button("👎 Needs Improvement"):
                st.session_state["feedback"] = "thumbs_down"
        with col3:
            if st.button("🔁 Regenerate"):
                st.session_state["generate"] = True
                st.experimental_rerun()

        # ✅ Save feedback to file
        if st.session_state.get("feedback"):
            feedback_record = {
                "timestamp": st.session_state["timestamp"],
                "question": st.session_state.get("question", ""),
                "answer": st.session_state.get("answer", ""),
                "feedback": st.session_state["feedback"]
            }

            os.makedirs("data", exist_ok=True)
            with open("data/feedback_log.jsonl", "a", encoding="utf-8") as f:
                f.write(json.dumps(feedback_record) + "\n")

            st.success(f"✅ Feedback recorded: {st.session_state['feedback']}")
            st.session_state["feedback"] = None
