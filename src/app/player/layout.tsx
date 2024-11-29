"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlayer } from "@/app/_hooks/playerProvider";
import { 
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeMute,
  faExpand,
  faCompress,
  faForward,
  faBackward
} from "@fortawesome/free-solid-svg-icons";

export default function PlayerLayout({ children }: { children: ReactNode }) {
  const {
    videoRef,
    playerState,
    play,
    pause,
    seek,
    setVolume,
    toggleMute,
    toggleFullscreen
  } = usePlayer();

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    const time = percent * playerState.duration;
    seek(time);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    setVolume(percent);
  };

  const formattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative h-screen bg-black">
      {/* Main video content area */}
      <div 
        className="h-[calc(100vh-100px)] cursor-pointer"
        onClick={playerState.isPlaying ? pause : play}
      >
        {children}
      </div>

      {/* Video controls footer */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent px-4">
        <div className="flex h-full flex-col justify-end pb-4">
          {/* Progress bar */}
          <div className="mb-4">
            <div 
              className="h-2 w-full bg-gray-600 rounded-full cursor-pointer hover:h-3 transition-all"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-red-600 rounded-full relative" 
                style={{ width: `${(playerState.currentTime / playerState.duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 bg-red-600 rounded-full transform translate-x-1/2" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="text-white hover:text-gray-300"
                onClick={() => seek(Math.max(0, playerState.currentTime - 10))}
              >
                <FontAwesomeIcon icon={faBackward} className="h-5 w-5" />
              </button>
              <button 
                className="text-white hover:text-gray-300 p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={playerState.isPlaying ? pause : play}
              >
                <FontAwesomeIcon icon={playerState.isPlaying ? faPause : faPlay} className="h-6 w-6" />
              </button>
              <button 
                className="text-white hover:text-gray-300"
                onClick={() => seek(Math.min(playerState.duration, playerState.currentTime + 10))}
              >
                <FontAwesomeIcon icon={faForward} className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute}>
                  <FontAwesomeIcon 
                    icon={playerState.isMuted ? faVolumeMute : faVolumeHigh} 
                    className="h-5 w-5 text-white"
                  />
                </button>
                <div 
                  className="h-1 w-24 bg-gray-600 rounded-full cursor-pointer"
                  onClick={handleVolumeChange}
                >
                  <div 
                    className="h-full bg-white rounded-full"
                    style={{ width: `${playerState.volume * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-white">
                {formattedTime(playerState.currentTime)} / {formattedTime(playerState.duration)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button 
                className="text-white hover:text-gray-300"
                onClick={toggleFullscreen}
              >
                <FontAwesomeIcon 
                  icon={playerState.isFullscreen ? faCompress : faExpand} 
                  className="h-5 w-5" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
