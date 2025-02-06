/** @format */

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const videoSrc = location.state?.link;
  useEffect(() => {
      console.log("new", location.state)
  }, [location.state]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      {videoSrc ? (
        <video
          controls
          controlsList="nodownload"
          style={{
            width: "80%",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}>
          <source
            src={videoSrc}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video found</p>
      )}
    </div>
  );
};

export default VideoPlayer;
