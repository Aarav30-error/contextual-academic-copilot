const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Upload a PDF file to the backend for ingestion.
 * @param {File} file
 * @returns {Promise<{filename: string, chunks: number}>}
 */
export async function uploadDocument(file) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${BASE_URL}/documents/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Upload failed' }));
        throw new Error(err.detail || 'Upload failed');
    }

    return res.json();
}

/**
 * Send a question to the backend orchestrator.
 * @param {string} question
 * @returns {Promise<{intent: string, answer: string|object, sources: Array}>}
 */
export async function askQuestion(question) {
    const res = await fetch(`${BASE_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Query failed' }));
        throw new Error(err.detail || 'Query failed');
    }

    return res.json();
}
