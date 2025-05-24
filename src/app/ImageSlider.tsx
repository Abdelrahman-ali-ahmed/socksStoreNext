"use client";

import React, { useEffect, useState } from "react";
import { images as ImagesType } from "./MainComponet";

type Props = {
  images?: ImagesType;
};

// Convert Google Drive share URL to iframe preview URL format
function convertDriveUrlToIframe(url: string) {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
  if (!match || !match[1]) {
    console.warn("Invalid Google Drive URL:", url);
    return ""; // Return empty string if invalid
  }
  const fileId = match[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export default function ImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageList = images ? Object.values(images).filter(Boolean) : [];

  useEffect(() => {
    if (imageList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [imageList]);

  if (imageList.length === 0) return <div>Loading images...</div>;

  const currentIframeUrl = convertDriveUrlToIframe(imageList[currentIndex]);

  return (
  <div
  className="w-full md:w-1/2 rounded-lg overflow-hidden relative"
  style={{ paddingTop: "56.25%" }} // 16:9 aspect ratio
>
  {currentIframeUrl ? (
    <iframe
      src={currentIframeUrl}
      allow="autoplay"
      allowFullScreen
      title={`Slide ${currentIndex + 1}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
        transition: "transform 0.3s ease",
        transformOrigin: "center center",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLIFrameElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLIFrameElement).style.transform = "scale(1)";
      }}
    />
  ) : (
    <div>Invalid image URL</div>
  )}
</div>


  );
}
