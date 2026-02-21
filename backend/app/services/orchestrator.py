from app.services.retrieval import retrieve_chunks
from app.services.context_builder import build_context
from app.services.llm_service import generate_answer, generate_comparison


def detect_intent(question: str) -> str:
    q = question.lower()

    if any(word in q for word in ["compare", "difference", "contrast"]):
        return "compare"

    return "qa"


def handle_query(question: str, top_k: int = 3):
    # 1. Retrieve relevant chunks
    retrieved_chunks = retrieve_chunks(question, top_k=top_k)

    # 2. Build context string
    context = build_context(retrieved_chunks)

    # 3. Detect intent
    intent = detect_intent(question)

    # 4. Call LLM accordingly
    if intent == "compare":
        llm_response = generate_comparison(context, question)
    else:
        llm_response = generate_answer(context, question)

    return {
        "intent": intent,
        "answer": llm_response,
        "sources": retrieved_chunks
    }
