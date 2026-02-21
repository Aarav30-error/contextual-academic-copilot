import { useEffect, useRef, useState } from 'react';
import MessageBubble from './Chat';
import { askQuestion } from '../api/api';

export default function ChatWindow({ document, onSourcesUpdate }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const hasDocument = !!document;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async () => {
        const question = input.trim();
        if (!question || isTyping) return;

        const userMsg = { role: 'user', content: question };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const result = await askQuestion(question);
            const aiContent = result.answer;

            setMessages((prev) => [...prev, { role: 'ai', content: aiContent }]);
            onSourcesUpdate(result.sources || []);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: 'ai', content: `Error: ${err.message}` },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-resize textarea
    const handleInput = (e) => {
        setInput(e.target.value);
        const ta = textareaRef.current;
        if (ta) {
            ta.style.height = 'auto';
            ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
        }
    };

    return (
        <main className="chat-window">
            <div className="chat-window__header">
                <div className="chat-window__title">
                    <span className="chat-window__title-dot" />
                    Chat Workspace
                </div>
                <span className="chat-window__subtitle">
                    {hasDocument
                        ? `Answering from: ${document.filename}`
                        : 'No document loaded'}
                </span>
            </div>

            <div className="chat-window__messages">
                {messages.length === 0 && !isTyping && (
                    <EmptyState hasDocument={hasDocument} />
                )}

                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} role={msg.role} content={msg.content} />
                ))}

                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-bar">
                <div className="input-bar__inner">
                    <textarea
                        ref={textareaRef}
                        className="input-bar__textarea"
                        placeholder={
                            hasDocument
                                ? 'Ask something about your document…'
                                : 'Upload a document first to start asking questions…'
                        }
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        disabled={!hasDocument || isTyping}
                    />
                    <button
                        className="input-bar__send"
                        onClick={handleSend}
                        disabled={!input.trim() || !hasDocument || isTyping}
                        aria-label="Send message"
                    >
                        <SendIcon />
                    </button>
                </div>
                <p className="input-bar__hint">
                    Press <kbd style={{ fontSize: '10px', background: '#f0edf8', padding: '1px 5px', borderRadius: '4px', border: '1px solid #ddd' }}>Enter</kbd> to send · <kbd style={{ fontSize: '10px', background: '#f0edf8', padding: '1px 5px', borderRadius: '4px', border: '1px solid #ddd' }}>Shift+Enter</kbd> for new line
                </p>
            </div>
        </main>
    );
}

function EmptyState({ hasDocument }) {
    return (
        <div className="empty-state">
            <div className="empty-state__illustration">
                {hasDocument ? '💬' : '📂'}
            </div>
            <h2 className="empty-state__title">
                {hasDocument
                    ? 'Ask your first question'
                    : 'Upload a document to begin'}
            </h2>
            <p className="empty-state__subtitle">
                {hasDocument
                    ? 'Type a question below. The AI will answer using only the content from your uploaded document.'
                    : 'Upload a PDF research paper, report, or notes to start contextual questioning.'}
            </p>
        </div>
    );
}

function TypingIndicator() {
    return (
        <div className="typing-indicator">
            <div className="typing-dots">
                <span /><span /><span />
            </div>
            <span className="typing-indicator__text">AI is analyzing document…</span>
        </div>
    );
}

function SendIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    );
}
