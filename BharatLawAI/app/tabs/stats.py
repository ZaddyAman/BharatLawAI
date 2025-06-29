import streamlit as st
import pandas as pd
import json
import os
from collections import Counter
import plotly.express as px

def render():
    st.title("📊 Feedback Analytics & Monitoring")

    log_file = "data/feedback_log.jsonl"

    if not os.path.exists(log_file) or os.path.getsize(log_file) == 0:
        st.warning("No feedback found yet. Ask some questions and submit votes first.")
        return

    with open(log_file, "r", encoding="utf-8") as f:
        feedback_data = [json.loads(line) for line in f if line.strip()]

    df = pd.DataFrame(feedback_data)

    # ✅ Summary stats
    st.subheader("✅ Feedback Summary")
    up_count = (df["feedback"] == "thumbs_up").sum()
    down_count = (df["feedback"] == "thumbs_down").sum()

    col1, col2 = st.columns(2)
    col1.metric("👍 Thumbs-Up", up_count)
    col2.metric("👎 Thumbs-Down", down_count)

    # 🔥 Controversial questions (got both 👍 and 👎)
    st.subheader("🔥 Controversial Questions")
    controversial = (
        df.groupby("question")["feedback"]
        .nunique()
        .reset_index()
        .query("feedback > 1")
    )

    if controversial.empty:
        st.info("No controversial questions yet.")
    else:
        st.dataframe(controversial)

    # 📅 Daily vote trends
    st.subheader("📅 Daily Voting Trends")
    df["date"] = pd.to_datetime(df["timestamp"]).dt.date
    vote_counts = df.groupby(["date", "feedback"]).size().reset_index(name="count")

    fig = px.line(
        vote_counts,
        x="date",
        y="count",
        color="feedback",
        title="Votes Over Time",
        markers=True
    )
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)

    # 📝 Full feedback table
    st.subheader("📝 Full Feedback Log")
    st.dataframe(df.sort_values(by="timestamp", ascending=False)[["timestamp", "question", "feedback"]])
