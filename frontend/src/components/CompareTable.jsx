// CompareTable.jsx
// This component is now integrated directly into Chat.jsx (MessageBubble)
// as the ComparisonTable inner component.
// This file is kept as a named export for any future standalone use.

export default function CompareTable({ data }) {
    if (!data || typeof data !== 'object') return null;
    const entries = Object.entries(data);

    return (
        <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
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
                        <td style={{
                            padding: '8px 0',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.6,
                        }}>
                            {String(val)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
