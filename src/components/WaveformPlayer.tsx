import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface WaveformPlayerProps {
  durationSec: number;
  durationFormatted: string;
  onTimeUpdate?: (currentSec: number) => void;
  autoPlay?: boolean;
}

export const WaveformPlayer: React.FC<WaveformPlayerProps> = ({
  durationSec,
  durationFormatted,
  onTimeUpdate,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);

  // Generate 64 deterministic waveform bar heights
  const bars = [
    24, 40, 65, 80, 50, 30, 20, 45, 75, 90, 60, 35, 25, 40, 70, 85, 95, 60, 45, 30, 55, 70, 40, 20, 35, 65, 80, 50,
    30, 20, 45, 75, 90, 60, 35, 25, 40, 70, 85, 95, 60, 45, 30, 55, 70, 40, 20, 35, 50, 70, 85, 40, 30, 50, 65, 80,
    45, 30, 20, 40, 60, 75, 35, 20,
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
    <div className="p-4.5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card">
      <div className="flex flex-col gap-3.5">
        {/* Controls and Timers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#0284C7] hover:from-[#0891B2] hover:to-[#0369A1] text-white flex items-center justify-center shadow-md shadow-cyan-500/25 transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setCurrentTime(0);
                if (onTimeUpdate) onTimeUpdate(0);
              }}
              className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="text-xs font-bold text-[#0F172A] tracking-tight">
              <span>{formatSec(currentTime)}</span>
              <span className="text-[#94A3B8] font-normal mx-1.5">/</span>
              <span className="text-[#64748B]">{durationFormatted}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed selector */}
            <button
              onClick={() => {
                const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
                setPlaybackSpeed(nextSpeed);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[11px] font-bold text-[#0284C7] transition-colors"
            >
              {playbackSpeed}x
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#EF4444]" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Waveform Visualization Bars */}
        <div className="flex items-center gap-0.75 h-12 py-1 select-none cursor-pointer bg-[#F8FCFF] px-3 rounded-xl border border-[#E2EEF8]">
          {bars.map((height, idx) => {
            const barPct = (idx / bars.length) * 100;
            const isPlayed = barPct <= progressPct;

            return (
              <div
                key={idx}
                onClick={() => handleSeek(idx)}
                className="flex-1 h-full flex items-center justify-center group py-0.5"
              >
                <div
                  className={`w-full rounded-full transition-all duration-100 ${
                    isPlayed
                      ? 'bg-gradient-to-t from-[#0284C7] to-[#06B6D4] shadow-cyan-glow/50'
                      : 'bg-[#D4EBF8] group-hover:bg-[#BAE6FD]'
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
