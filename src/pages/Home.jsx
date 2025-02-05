import React, { useEffect } from "react";
import "../css/home.css";
import PDFPreview from "../components/PdfPreview";
import { useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
let userId = localStorage.getItem("userId");
if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
}


function Home() {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [pdfs, setPDFs] = useState([]);

  useEffect(() => {
    socket.on("pdfs", (data) => {
      data = data.map((pdf) => pdf  + '?userId=' + userId);
      setPDFs(data);
    });
    let userId = localStorage.getItem("userId");
    socket.emit("register", userId);
    console.log(userId)
    socket.on("statusBackend", (data) => {
      setStatus(data);
 
      if (data === "Successfully finished!") {
        setLoading(false);
        setFinished(true);
        setError(false);
      }
      if (data === "Work order not compatible!") {
        setLoading(false);
        setError(true);
        setFinished(false);
      }
    });
  }, []);

  const startBackendProcess = () => {
    let input = document.querySelector("input");
    if (input.value === "") {
      return;
    }
    let work_orders = input.value;
    input.value = "";
    work_orders = work_orders.split(",").map((order) => order.trim());
    console.log(work_orders);
    
    socket.emit("startBackend", work_orders);
    setStatus('Process started');

    if (!loading) {
      setError(false);
      setLoading(true);
      setFinished(false);
    };
  };

  return (
    <div className="home">
      <h1>Work Order PDF Generator</h1>
      <p className="tagline">
        Erstelle einfach den perfekt generierten und komprimierten
        PDF-Work-Order für deine Kunden.
      </p>

      <div className="order-cnt">
        <div className="order-form">
          <p>Enter Work Orders:</p>
          <div className="order-input">
            <input type="text" placeholder="3337,3338,3332..." />
          </div>
          <div className="order-button">
            <button onClick={startBackendProcess}>Generate</button>
          </div>

          <div className={`loading-cnt ${(loading || finished || error) ? "show" : ""}`}>
            <div className="status">
              <div className={`loader ${(finished || error) ? "hide" : ""}`}>
                <img src="images/loading.webp" alt="loading icon" />
              </div>
              <div className={`emoji-area ${finished ? "show" : ""}`}>
                <div className="emoji">🎉</div>
              </div>
              <div className={`emoji-area ${error ? "show" : ""}`}>
                <div className="emoji">❌</div>
              </div>
              <div className="show-progress">
                <p>{status}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pdf-cnt">
            {pdfs.map((pdf, index) => (
                <PDFPreview key={index} file={pdf} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
