
import json
from fastapi import APIRouter

router = APIRouter()

def load_acts_from_jsonl(file_path):
    acts = []
    with open(file_path, 'r') as f:
        for line in f:
            acts.append(json.loads(line))
    return acts

@router.get("/acts")
async def get_acts():
    acts = load_acts_from_jsonl("data/cleaned_acts.jsonl")
    return acts
