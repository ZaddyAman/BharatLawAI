# app/tabs/search_by_section.py

import streamlit as st
import json
from pathlib import Path
import re

def normalize_section(section):
    """Strip prefixes like 'Section', dots, etc."""
    return re.sub(r"[^a-zA-Z0-9]", "", section.lower().replace("section", "").strip())

def render():
    st.subheader("📄 Find Legal Section")

    file_path = Path("data/parsed_acts.jsonl")
    legal_sections = []
    acts = set()

    if file_path.exists():
        with open(file_path, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    row = json.loads(line)
                    act_name = row.get("act", "Unknown Act").strip()
                    section_no = row.get("section_no", "").strip()
                    heading = row.get("heading", "").strip()
                    text = row.get("text", "").strip()

                    legal_sections.append({
                        "act": act_name,
                        "section_no": section_no,
                        "heading": heading,
                        "text": text,
                        "part": row.get("part", "")
                    })

                    acts.add(act_name)
                except Exception as e:
                    print(f"⚠️ Error parsing line: {e}")
                    continue

    acts = ["All Acts"] + sorted(list(acts))
    selected_act = st.selectbox("Select Act", acts)
    section_input = st.text_input("Enter Section No (e.g., 498A, 302, 13)", "")

    if st.button("🔍 Search"):
        clean_input = normalize_section(section_input)

        found = False
        for row in legal_sections:
            raw_section = normalize_section(row["section_no"])

            # 🔍 Match section + act or all
            if (selected_act == "All Acts" or row["act"] == selected_act) and raw_section == clean_input:
                st.success(f"✅ Found: {row['section_no']} — {row['heading']}")
                st.markdown(f"**Act**: {row['act']}")
                if row.get("part"):
                    st.markdown(f"**Part**: {row['part']}")
                st.write(row["text"])
                found = True
                break

        if not found:
            st.warning("❌ Section not found.")
            st.caption(f"Debug: Searched for normalized section → `{clean_input}`")
