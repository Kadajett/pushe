"use client";

import { useEffect, useCallback } from "react";
import { usePlayer, type PlayerState } from "@/app/_hooks/playerProvider";

export default function VideoPlayer() {
  const { videoRef, playerState, setPlayerState } = usePlayer();

  // Example video source - you'll want to make this dynamic based on the selected content
  const videoSrc = "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_2160p_60fps_stereo_abl.mp4";

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setPlayerState((prev: PlayerState) => ({
        ...prev,
        currentTime: videoRef.current?.currentTime ?? 0
      }));
    }
  }, [setPlayerState, videoRef]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setPlayerState((prev: PlayerState) => ({
        ...prev,
        duration: videoRef.current?.duration ?? 0
      }));
    }
  }, [setPlayerState, videoRef]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Set initial duration if video is already loaded
      if (videoElement.duration) {
        handleLoadedMetadata();
      }
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [videoRef, handleTimeUpdate, handleLoadedMetadata]);

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        src={videoSrc}
        // Let the layout handle controls
        controls={false}
        // Prevent default controls while allowing programmatic control
        controlsList="nodownload nofullscreen noremoteplayback"
        // Initial state matches provider
        muted={playerState.isMuted}
      >
        <p>Your browser does not support the video element.</p>
      </video>
    </div>
  );
}
