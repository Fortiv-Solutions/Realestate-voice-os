import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Download } from 'lucide-react';

interface WaveformPlayerProps {
  durationSec: number;
  durationFormatted: string;
  onTimeUpdate?: (currentSec: number) => void;
  autoPlay?: boolean;
  compact?: boolean;
}

export const WaveformPlayer: React.FC<WaveformPlayerProps> = ({
  durationSec,
  durationFormatted,
  onTimeUpdate,
  autoPlay = false,
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);

  // Generate 56 deterministic waveform bar heights
  const bars = [
    24, 40, 65, 80, 50, 30, 20, 45, 75, 90, 60, 35, 25, 40, 70, 85, 95, 60, 45, 30, 55, 70, 40, 20, 35, 65, 80, 50,
    30, 20, 45, 75, 90, 60, 35, 25, 40, 70, 85, 95, 60, 45, 30, 55, 70, 40, 20, 35, 50, 70, 85, 40, 30, 50, 65, 80,
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSec) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1 * playbackSpeed;
          if (onTimeUpdate) onTimeUpdate(next);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, durationSec, onTimeUpdate]);

  const progressPct = Math.min((currentTime / durationSec) * 100, 100);

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (idx: number) => {
    const targetSec = (idx / bars.length) * durationSec;
    setCurrentTime(targetSec);
    if (onTimeUpdate) onTimeUpdate(targetSec);
  };

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-9 h-9 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white flex items-center justify-center shrink-0 shadow-xs transition-transform active:scale-95 cursor-pointer"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
      </button>

      {/* Waveform Scrubber */}
      <div className="flex-1 flex items-center gap-0.5 h-8 select-none cursor-pointer px-2 py-1">
        {bars.map((height, idx) => {
          const barPct = (idx / bars.length) * 100;
          const isPlayed = barPct <= progressPct;

          return (
            <div
              key={idx}
              onClick={() => handleSeek(idx)}
              className="flex-1 h-full flex items-center justify-center group"
            >
              <div
                className={`w-full max-w-[3px] rounded-full transition-all duration-75 ${
                  isPlayed
                    ? 'bg-[#2563EB]'
                    : 'bg-[#D1D5DB] group-hover:bg-[#9CA3AF]'
                }`}
                style={{ height: `${Math.max(18, height)}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Time Display */}
      <div className="text-xs font-medium text-[#4B5563] whitespace-nowrap font-mono">
        <span>{formatSec(currentTime)}</span>
        <span className="text-[#9CA3AF] mx-1">/</span>
        <span>{durationFormatted}</span>
      </div>

      {/* Speed Selector */}
      <button
        onClick={() => {
          const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
          setPlaybackSpeed(nextSpeed);
        }}
        className="px-2 py-0.5 rounded-md bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[11px] font-bold text-[#4B5563] transition-colors cursor-pointer"
        title="Playback Speed"
      >
        {playbackSpeed}x
      </button>

      {/* Download Audio Button */}
      <button
        onClick={() => {
          const blob = new Blob(['Mock audio recording data'], { type: 'audio/wav' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `call-recording-${Date.now()}.wav`;
          a.click();
        }}
        className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
        title="Download Audio"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
};
