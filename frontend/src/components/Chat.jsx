/**
 * A single message bubble — user or AI.
 * For AI comparison responses (object), renders a structured table.
 */
export default function MessageBubble({ role, content }) {
    const isUser = role === 'user';

    if (isUser) {
        return (
            <div className="message-row message-row--user">
                <span className="message-row__label">You</span>
                <div className="message-bubble message-bubble--user">{content}</div>
            </div>
        );
    }

    // AI message
    const isComparison = typeof content === 'object' && content !== null && !content.error;
    const isError = typeof content === 'object' && content?.error;

    return (
        <div className="message-row message-row--ai">
            <span className="message-row__label">AI</span>
            <div className="message-bubble message-bubble--ai">
                <div className="message-bubble__label">
                    <span className="message-bubble__label-icon">📚</span>
                    Answer based on document context
                </div>
                {isError ? (
                    <p style={{ color: '#c0392b', fontSize: '13px' }}>
                        ⚠️ Could not parse comparison.{content.raw_response ? ` Raw: ${content.raw_response}` : ''}
                    </p>
                ) : isComparison ? (
                    <ComparisonTable data={content} />
                ) : (
                    <FormattedAnswer text={String(content)} />
                )}
            </div>
        </div>
    );
}

function FormattedAnswer({ text }) {
    const lines = text.split('\n');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {lines.map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <br key={i} />;
                const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•');
                return (
                    <p
                        key={i}
                        style={{
                            margin: 0,
                            paddingLeft: isBullet ? '12px' : '0',
                            textIndent: isBullet ? '-12px' : '0',
                            fontSize: '14px',
                            lineHeight: '1.65',
                        }}
                    >
                        {trimmed}
                    </p>
                );
            })}
        </div>
    );
}

function ComparisonTable({ data }) {
    const entries = Object.entries(data);
    return (
        <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            marginTop: '4px',
        }}>
            <tbody>
                {entries.map(([key, val]) => (
                    <tr key={key} style={{ borderBottom: '1px solid var(--color-ai-border)' }}>
                        <td style={{
                            padding: '8px 10px 8px 0',
                            fontWeight: 600,
                            color: 'var(--color-accent-purple)',
                            whiteSpace: 'nowrap',
                            verticalAlign: 'top',
                            minWidth: '110px',
                        }}>
                            {key.replace(/_/g, ' ')}
                        </td>
                        <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                            {String(val)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
