# backend/app/services/vector_store.py

import faiss
import numpy as np

print("Initializing FAISS vector store...")

# Dimension of MiniLM embeddings
EMBEDDING_DIM = 384

# Create FAISS index (L2 distance)
index = faiss.IndexFlatL2(EMBEDDING_DIM)

# Store documents separately
stored_texts = []
stored_metadatas = []

print("FAISS vector store ready.")


def add_documents(
    texts: list[str],
    embeddings: list[list[float]],
    metadatas: list[dict]
):
    """
    Add documents and embeddings to FAISS.
    """
    global stored_texts, stored_metadatas

    vectors = np.array(embeddings).astype("float32")

    index.add(vectors)

    stored_texts.extend(texts)
    stored_metadatas.extend(metadatas)


def query_documents(query_embedding: list[float], top_k: int = 3):
    if index.ntotal == 0:
        return []

    query_vector = np.array([query_embedding]).astype("float32")

    distances, indices = index.search(query_vector, top_k)

    results = []

    for rank, idx in enumerate(indices[0]):
        if idx < len(stored_texts):
            results.append({
                "text": stored_texts[idx],
                "metadata": stored_metadatas[idx],
                "score": float(distances[0][rank])
            })

    return results