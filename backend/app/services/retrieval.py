from app.services.embeddings import get_embedding
from app.services.vector_store import query_documents


def retrieve_chunks(question: str, top_k: int = 3):
    query_embedding = get_embedding(question)

    results = query_documents(query_embedding, top_k)

    formatted = []

    for item in results:
        formatted.append({
            "text": item["text"],
            "document_id": item["metadata"].get("document_id", "Unknown"),
            "score": item["score"]
        })

    return formatted
