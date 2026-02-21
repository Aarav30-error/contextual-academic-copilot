import { useRef, useState } from 'react';
import { uploadDocument } from '../api/api';

export default function UploadArea({ onUploadSuccess }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    const handleFile = async (file) => {
        if (!file || file.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            return;
        }
        setError(null);
        setIsUploading(true);
        try {
            const result = await uploadDocument(file);
            onUploadSuccess({ filename: file.name, ...result });
        } catch (err) {
            setError(err.message || 'Upload failed. Is the backend running?');
        } finally {
            setIsUploading(false);
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const onInputChange = (e) => {
        handleFile(e.target.files[0]);
        e.target.value = '';
    };

    return (
        <div className="upload-area">
            <p className="sidebar__section-label">Document</p>

            {isUploading ? (
                <div className="upload-progress">
                    <div className="upload-progress__bar">
                        <div className="upload-progress__fill" />
                    </div>
                    <p className="upload-progress__text">Indexing document…</p>
                </div>
            ) : (
                <div
                    className={`upload-zone${isDragOver ? ' upload-zone--dragover' : ''}`}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={onDrop}
                >
                    <span className="upload-zone__icon">📄</span>
                    <p className="upload-zone__text">Drop PDF here</p>
                    <p className="upload-zone__subtext">
                        or <span className="upload-zone__browse">browse</span> to upload
                    </p>
                    <input
                        ref={inputRef}
                        type="file"
                        className="upload-zone__input"
                        accept=".pdf,application/pdf"
                        onChange={onInputChange}
                    />
                </div>
            )}

            {error && (
                <p style={{ fontSize: '11px', color: '#c0392b', lineHeight: 1.5 }}>
                    ⚠️ {error}
                </p>
            )}
        </div>
    );
}
