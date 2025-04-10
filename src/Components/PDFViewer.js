import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useLocation, useNavigate } from "react-router-dom";

const PdfViewer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get the PDF URL from the state
    const pdfUrl = location.state?.pdfUrl;

    if (!pdfUrl) {
        return <div>No PDF found. Please go back and try again.</div>;
    }

    // Correct URL to PDF.js worker from CDN
    const workerUrl = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

    const defaultLayout = defaultLayoutPlugin();

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 1000,
                    padding: '10px 20px',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
            
                Back
            </button>
            <Worker workerUrl={workerUrl}>
                <Viewer fileUrl={pdfUrl} plugins={[defaultLayout]} />
            </Worker>
        </div>
    );
};

export default PdfViewer;
