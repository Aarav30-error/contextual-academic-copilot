import { useState } from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import SourceViewer from './components/SourcePannel';

export default function App() {
    const [uploadedDoc, setUploadedDoc] = useState(null);
    const [sources, setSources] = useState([]);

    return (
        <div className="app-shell">
            <Sidebar
                document={uploadedDoc}
                onUploadSuccess={(docInfo) => {
                    setUploadedDoc(docInfo);
                    setSources([]);
                }}
            />

            <ChatWindow
                document={uploadedDoc}
                onSourcesUpdate={setSources}
            />

            <SourceViewer sources={sources} />
        </div>
    );
}
