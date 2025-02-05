import React from "react";
import "../css/pdfpreview.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

pdfjs.GlobalWorkerOptions.workerSrc = backendUrl + "/pdf.worker.min.mjs";

function PDFPreview({ file }) {

    return (
        <div className="pdf-container">
            <p className="file-title">Work Order {file.split("_")[0]}</p>
            <div className="pdf-preview">
                <Document 
                    file={`${backendUrl}/pdfs/${file}`}>
                    <Page pageNumber={1} width={300}/>
                </Document>
            </div>
            <div className="pdf-buttons">
                <a href={backendUrl + "/download/" + file} download="work-order.pdf">
                    <button className="btn">📥 Download</button>
                </a>
                <a href={backendUrl + "/pdfs/" + file} target="_blank" rel="noopener noreferrer">
                    <button className="btn">👀 PDF anzeigen</button>
                </a>
            </div>
        </div>
    );
}

export default PDFPreview;
