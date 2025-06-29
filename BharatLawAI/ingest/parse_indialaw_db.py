# ingest/parse_indialaw_db.py

import sqlite3
import json
from pathlib import Path

DB_PATH = Path("data/raw_acts/indialaw.db")
OUT_FILE = Path("data/parsed_acts.jsonl")

# Mapping of table names to full Act titles
ACT_TABLES = {
    "ipc": "Indian Penal Code, 1860",
    "crpc": "Code of Criminal Procedure, 1973",
    "cpc": "Civil Procedure Code, 1908",
    "hma": "Hindu Marriage Act, 1955",
    "ida": "Indian Divorce Act, 1869",
    "iea": "Indian Evidence Act, 1872",
    "nia": "Negotiable Instruments Act, 1881",
    "mva": "Motor Vehicles Act, 1988",
}

def already_exists(section_no, act_title):
    if not OUT_FILE.exists():
        return False
    with open(OUT_FILE, "r", encoding="utf-8") as f:
        for line in f:
            try:
                data = json.loads(line)
                if data.get("section_no") == section_no and data.get("act") == act_title:
                    return True
            except:
                continue
    return False

def parse_and_append():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    with open(OUT_FILE, "a", encoding="utf-8") as out_f:
        for table, act_title in ACT_TABLES.items():
            print(f"\n📘 Parsing {act_title} ({table})")
            try:
                cursor.execute(f"SELECT * FROM {table}")
                rows = cursor.fetchall()

                for row in rows:
                    section_no = str(row[0]).strip()
                    heading = str(row[1]).strip()
                    text = str(row[2]).strip()

                    if not text:
                        continue

                    record = {
                        "section_no": f"Section {section_no}.",
                        "heading": heading,
                        "text": text,
                        "part": f"PART FROM {act_title}",
                        "act": act_title
                    }

                    if not already_exists(record["section_no"], record["act"]):
                        out_f.write(json.dumps(record, ensure_ascii=False) + "\n")
                        print(f"✅ Added {record['section_no']} from {act_title}")
                    else:
                        print(f"⏭️ Skipped duplicate {record['section_no']}")

            except Exception as e:
                print(f"⚠️ Failed to parse table {table}: {e}")

    conn.close()
    print("\n✅ Done parsing all acts into parsed_acts.jsonl")

if __name__ == "__main__":
    parse_and_append()
