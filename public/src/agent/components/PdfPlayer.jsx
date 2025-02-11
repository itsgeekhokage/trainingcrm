/** @format */

import React from "react";
import { useLocation } from "react-router-dom";

const PdfPlayer = () => {
  const location = useLocation();
  const pdfSrc = location.state?.link ;
  const directPdfSrc = `/public/data/pdf/${location.state?.link}`;

  if (!pdfSrc) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>No PDF available</p>
    );
  }
  else {
    console.log(pdfSrc)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}>
      <h2>PDF Viewer</h2>
      <iframe
        src={directPdfSrc}
        title="PDF Viewer"
        allowFullScreen
        style={{
          width: "80%",
          height: "80vh",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      />
    </div>
  );
};

export default PdfPlayer;
