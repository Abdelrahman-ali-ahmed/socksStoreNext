"use client";

import React, { useEffect, useState } from "react";
import { images as ImagesType } from "./MainComponet";

type Props = {
  images?: ImagesType;
};

function convertDriveUrlToIframe(url: string) {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
  if (!match || !match[1]) {
    console.warn("Invalid Google Drive URL:", url);
    return "";
  }
  const fileId = match[1];
  // Try to hide some UI with `&rm=minimal` or `&embedded=true`
  return `https://drive.google.com/file/d/${fileId}/preview?rm=minimal`;
}

export default function ImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const imageList = images ? Object.values(images).filter(Boolean) : [];

  useEffect(() => {
    if (imageList.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [imageList, isHovered]);

  if (imageList.length === 0) return <div>Loading images...</div>;

  const currentIframeUrl = convertDriveUrlToIframe(imageList[currentIndex]);

  return (
    <div
      className="w-full md:w-[100%] mx-auto rounded-lg overflow-hidden relative group"
      style={{ paddingTop: "56.25%" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {currentIframeUrl ? (
        <iframe
          src={currentIframeUrl}
          allow="autoplay"
          allowFullScreen
          title={`Slide ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full border-0 transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
          Invalid image URL
        </div>
      )}
    </div>
  );
}
