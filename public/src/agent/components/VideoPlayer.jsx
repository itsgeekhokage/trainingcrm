/** @format */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const videoSrc = location.state?.link;
  const directVideoSrc = `/public/data/video/${location.state?.link}`;

  useEffect(() => {
    console.log("New video link:", location.state);
  }, [location.state]);

  const getDriveEmbedUrl = (url) => {
    const match = url?.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  };

  const isDriveLink = videoSrc?.includes("drive.google.com");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      {videoSrc ? (
        isDriveLink ? (
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                position: "absolute",
                right: 0,
                backgroundColor: "black",
              }}>
              {" "}
            </div>
            <iframe
              src={getDriveEmbedUrl(videoSrc)}
              width="300px"
              height="250px"
              allow="autoplay"
              allowFullScreen
              style={{
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                border: "none",
              }}></iframe>
          </div>
        ) : (
          <video
            controls
            controlsList="nodownload"
            style={{
              width: "80%",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            onContextMenu={(e) => e.preventDefault()}>
            <source
              src={directVideoSrc}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        <p>No video found</p>
      )}
    </div>
  );
};

export default VideoPlayer;
