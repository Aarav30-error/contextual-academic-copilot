print("===== FAISS VECTOR STORE TEST =====")

from app.services.embeddings import get_embeddings_batch, get_embedding
from app.services.vector_store import add_documents, query_documents

# Sample documents
documents = [
    "Solar energy is renewable and sustainable.",
    "Coal power increases carbon emissions.",
    "Wind turbines generate clean electricity."
]

# Generate embeddings
embeddings = get_embeddings_batch(documents)

metadatas = [{"source": "test_data"} for _ in documents]

# Add to FAISS
add_documents(documents, embeddings, metadatas)

print("Documents stored successfully.")

# Query
query = "Which energy source is clean?"
query_embedding = get_embedding(query)

results = query_documents(query_embedding, top_k=2)

print("\nQuery Results:")
for r in results:
    print("-", r["text"])

print("===== TEST COMPLETE =====")