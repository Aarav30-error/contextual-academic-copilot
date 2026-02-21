print("===== LOCAL EMBEDDING TEST =====")

from app.services.embeddings import get_embedding, get_embeddings_batch

# Single test
text = "Renewable energy reduces carbon emissions."

embedding = get_embedding(text)

print("\nSingle embedding test:")
print("Vector length:", len(embedding))
print("First 5 values:", embedding[:5])

# Batch test
texts = [
    "Solar power is sustainable.",
    "Coal increases pollution.",
    "Wind energy is renewable."
]

batch_embeddings = get_embeddings_batch(texts)

print("\nBatch embedding test:")
print("Number of vectors:", len(batch_embeddings))
print("Each vector length:", len(batch_embeddings[0]))

print("\n===== TEST COMPLETE =====")