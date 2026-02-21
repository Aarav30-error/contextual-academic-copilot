# backend/app/services/embeddings.py

from sentence_transformers import SentenceTransformer
import torch

print("Loading local embedding model...")

# Force CPU to avoid GPU issues
device = "cpu"

model = SentenceTransformer(
    "all-MiniLM-L6-v2",
    device=device
)

print("Local embedding model loaded successfully.")


def get_embedding(text: str) -> list[float]:
    """
    Generate embedding for a single text.
    Returns a 384-dimensional vector.
    """
    embedding = model.encode(text, convert_to_numpy=True)
    return embedding.tolist()


def get_embeddings_batch(texts: list[str]) -> list[list[float]]:
    """
    Generate embeddings for multiple texts.
    """
    embeddings = model.encode(texts, convert_to_numpy=True)
    return [emb.tolist() for emb in embeddings]