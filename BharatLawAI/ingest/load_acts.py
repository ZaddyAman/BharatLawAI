import json
import os
from tqdm import tqdm

ACTS_DIR = "/mnt/d/Indian Legal Assistant/data/annotatedCentralActs"
OUTPUT_FILE = "/mnt/d/Indian Legal Assistant/data/parsed_acts.jsonl"

def flatten_paragraphs(paragraphs):
    """Recursively flatten paragraphs into a single text string"""
    text_blocks = []

    def recurse(obj):
        if isinstance(obj, str):
            text_blocks.append(obj)
        elif isinstance(obj, dict):
            for val in obj.values():
                recurse(val)
        elif isinstance(obj, list):
            for item in obj:
                recurse(item)

    recurse(paragraphs)
    return "\n".join(text_blocks)

def extract_sections_from_act(act_json):
    sections = []
    parts = act_json.get("Parts", {})
    for part in parts.values():
        part_name = part.get("Name", "")
        sections_dict = part.get("Sections", {})
        for sec_no, sec_data in sections_dict.items():
            heading = sec_data.get("heading", "")
            paragraphs = sec_data.get("paragraphs", {})
            text = flatten_paragraphs(paragraphs)
            sections.append({
                "section_no": sec_no,
                "heading": heading,
                "part": part_name,
                "text": text
            })
    return sections

def load_sections():
    all_sections = []
    for fname in tqdm(os.listdir(ACTS_DIR)):
        fpath = os.path.join(ACTS_DIR, fname)
        with open(fpath, encoding="utf-8") as f:
            try:
                act = json.load(f)
                sections = extract_sections_from_act(act)
                all_sections.extend(sections)
            except Exception as e:
                print(f"[!] Failed: {fname} → {e}")
    return all_sections

if __name__ == "__main__":
    sections = load_sections()
    print(f"✅ Loaded {len(sections)} legal sections.")
    print("📌 Sample:", sections[0] if sections else "No data found.")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as out_f:
        for sec in sections:
            out_f.write(json.dumps(sec, ensure_ascii=False) + "\n")
    print(f"💾 Saved to {OUTPUT_FILE}")
