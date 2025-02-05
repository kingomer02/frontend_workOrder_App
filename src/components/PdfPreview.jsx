import React from "react";
import "../css/pdfpreview.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";

// Worker korrekt setzen:
pdfjs.GlobalWorkerOptions.workerSrc = "http://localhost:5173/pdf.worker.min.mjs";

function PDFPreview({ file }) {

    return (
        <div className="pdf-container">
            <p className="file-title">Work Order {file.split("_")[0]}</p>
            <div className="pdf-preview">
                <Document 
                    file={"http://localhost:3000/pdfs/" + file}>
                    <Page pageNumber={1} width={300}/>
                </Document>
            </div>
            <div className="pdf-buttons">
                <a href={"http://localhost:3000/download/" + file} download="work-order.pdf">
                    <button className="btn">📥 Download</button>
                </a>
                <a href={"http://localhost:3000/pdfs/" + file} target="_blank" rel="noopener noreferrer">
                    <button className="btn">👀 PDF anzeigen</button>
                </a>
            </div>
        </div>
    );
}

export default PDFPreview;
