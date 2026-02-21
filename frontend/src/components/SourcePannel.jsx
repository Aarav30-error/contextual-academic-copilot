export default function SourceViewer({ sources }) {
    const hasSources = sources && sources.length > 0;

    return (
        <aside className="source-viewer">
            <div className="source-viewer__header">
                <h2 className="source-viewer__title">
                    <span className="source-viewer__title-icon">📖</span>
                    Source Context
                </h2>
                <p className="source-viewer__subtitle">
                    Passages retrieved from your document
                </p>
            </div>

            <div className="source-viewer__body">
                {!hasSources ? (
                    <div className="source-viewer__empty">
                        <span className="source-viewer__empty-icon">🔍</span>
                        <p className="source-viewer__empty-text">
                            Source passages will appear here after you ask a question.
                        </p>
                    </div>
                ) : (
                    sources.map((chunk, idx) => (
                        <SourceChunk key={idx} chunk={chunk} rank={idx + 1} />
                    ))
                )}
            </div>
        </aside>
    );
}

function SourceChunk({ chunk, rank }) {
    const docId = chunk.document_id || chunk.metadata?.document_id || 'Document';
    const score = chunk.score != null ? chunk.score.toFixed(4) : null;
    const text = chunk.text || '';

    return (
        <div className="source-chunk">
            <div className="source-chunk__header">
                <span className="source-chunk__doc-id">
                    📎 {docId}
                    <span className="source-chunk__rank">#{rank}</span>
                </span>
                {score && <span className="source-chunk__score">score {score}</span>}
            </div>
            <p className="source-chunk__text">{text}</p>
        </div>
    );
}
