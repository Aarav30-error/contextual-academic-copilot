def build_context(retrieved_chunks: list[dict], max_chars: int = 4000) -> str:
    """
    Converts retrieved chunks into a formatted context string for the LLM.
    Limits total character size to prevent prompt overflow.
    """

    if not retrieved_chunks:
        return "No relevant documents found."

    context_parts = []
    total_length = 0

    for i, chunk in enumerate(retrieved_chunks):
        document_id = chunk.get("document_id", f"Doc_{i+1}")
        text = chunk["text"]
        score = chunk.get("score")

        formatted_chunk = f"Document {document_id} (Score: {round(score, 4) if score else 'N/A'}):\n{text}\n"

        if total_length + len(formatted_chunk) > max_chars:
            break

        context_parts.append(formatted_chunk)
        total_length += len(formatted_chunk)

    return "\n".join(context_parts)
