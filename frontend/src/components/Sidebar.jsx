import UploadArea from './Upload';

export default function Sidebar({ document, onUploadSuccess }) {
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar__logo-area">
                <div className="sidebar__logo">
                    <div className="sidebar__logo-icon">🔭</div>
                    <span className="sidebar__logo-name">Contextual Academic Copilot</span>
                </div>
                <p className="sidebar__tagline">Ask questions. Understand faster.</p>
            </div>

            <div className="sidebar__divider" />

            {/* Upload */}
            <UploadArea onUploadSuccess={onUploadSuccess} />

            {/* Uploaded doc info */}
            {document && (
                <div className="sidebar__doc-info">
                    <div className="sidebar__doc-card">
                        <div className="sidebar__doc-name">
                            <span className="sidebar__doc-icon">📄</span>
                            <span className="sidebar__doc-filename" title={document.filename}>
                                {document.filename}
                            </span>
                        </div>
                        <div className="sidebar__status-badge">
                            <span className="sidebar__status-dot" />
                            Indexed and ready
                        </div>
                    </div>

                    <p className="sidebar__helper">
                        The AI answers using <strong>only</strong> uploaded documents. It will not guess or use outside knowledge.
                    </p>
                </div>
            )}

            {/* Decorative doodle */}
            <DoodleDecoration />
        </aside>
    );
}

function DoodleDecoration() {
    return (
        <div className="sidebar__doodle">
            <svg width="160" height="120" viewBox="0 0 160 120" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                {/* Planet */}
                <circle cx="80" cy="45" r="28" fill="#f4845f" opacity="0.6" />
                <ellipse cx="80" cy="45" rx="50" ry="10" stroke="#9b72cf" strokeWidth="2.5"
                    fill="none" opacity="0.7" />
                {/* Stars */}
                <circle cx="18" cy="20" r="3" fill="#9b72cf" opacity="0.8" />
                <circle cx="140" cy="15" r="2" fill="#f4845f" opacity="0.7" />
                <circle cx="155" cy="55" r="1.5" fill="#6fb3f2" opacity="0.8" />
                <circle cx="8" cy="70" r="2" fill="#6fb3f2" opacity="0.6" />
                {/* Wavy line */}
                <path d="M10 100 Q40 88 70 100 Q100 112 130 100 Q145 94 155 100"
                    stroke="#f4845f" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
                {/* Small orbiting dot */}
                <circle cx="110" cy="22" r="5" fill="#6fb3f2" opacity="0.75" />
                <circle cx="50" cy="70" r="4" fill="#9b72cf" opacity="0.5" />
            </svg>
        </div>
    );
}
