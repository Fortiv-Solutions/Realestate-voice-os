import React, { useState } from 'react';

export interface RinggDataPoint {
  date: string;
  displayDate: string;
  totalCalls: number;
  connected: number;
  failed: number;
  cancelled: number;
  registered: number;
  ongoing: number;
  retry: number;
}

export const RinggVolumeChart: React.FC<{
  height?: number;
}> = ({ height = 280 }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeLines, setActiveLines] = useState<Record<string, boolean>>({
    totalCalls: true,
    connected: true,
    failed: false,
    cancelled: false,
    registered: false,
    ongoing: false,
    retry: false,
  });

  const rawData: RinggDataPoint[] = [
    { date: '21-09-26', displayDate: 'Sep 21, 2026', totalCalls: 6, connected: 6, failed: 0, cancelled: 0, registered: 0, ongoing: 0, retry: 0 },
    { date: '21-09-26 04:00', displayDate: 'Sep 21, 2026', totalCalls: 8, connected: 7, failed: 1, cancelled: 0, registered: 0, ongoing: 0, retry: 0 },
    { date: '21-09-26 08:00', displayDate: 'Sep 21, 2026', totalCalls: 10, connected: 9, failed: 1, cancelled: 0, registered: 0, ongoing: 0, retry: 0 },
    { date: '21-09-26 12:00', displayDate: 'Sep 21, 2026', totalCalls: 11, connected: 11, failed: 0, cancelled: 0, registered: 0, ongoing: 0, retry: 0 },
    { date: '21-09-26 16:00', displayDate: 'Sep 21, 2026', totalCalls: 13, connected: 12, failed: 1, cancelled: 0, registered: 0, ongoing: 0, retry: 0 },
    { date: '21-09-26 20:00', displayDate: 'Sep 21, 2026', totalCalls: 14, connected: 14, failed: 0, cancelled: 0, registered: 0, ongoing: 0, retry: 0 },
    { date: '22-09-26 04:00', displayDate: 'Sep 22, 2026', totalCalls: 16, connected: 15, failed: 1, cancelled: 0, registered: 0, ongoing: 0, retry: 0 },
    { date: '22-09-26 12:00', displayDate: 'Sep 22, 2026', totalCalls: 17, connected: 17, failed: 0, cancelled: 0, registered: 0, ongoing: 0, retry: 0 },
    { date: '22-09-26 18:00', displayDate: 'Sep 22, 2026', totalCalls: 18, connected: 18, failed: 0, cancelled: 0, registered: 0, ongoing: 0, retry: 0 },
  ];

  const yMax = 20;
  const yTicks = [20, 15, 10, 5, 0];

  const width = 800;
  const paddingX = 45;
  const paddingY = 25;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const totalPoints = rawData.map((d, i) => {
    const x = paddingX + (i / (rawData.length - 1)) * chartW;
    const y = height - paddingY - (d.totalCalls / yMax) * chartH;
    return { x, y, val: d.totalCalls, data: d };
  });

  const connectedPoints = rawData.map((d, i) => {
    const x = paddingX + (i / (rawData.length - 1)) * chartW;
    const y = height - paddingY - (d.connected / yMax) * chartH;
    return { x, y, val: d.connected, data: d };
  });

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const cpx = (p1.x + p2.x) / 2;
      path += ` C ${cpx} ${p1.y}, ${cpx} ${p2.y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const totalPath = createSmoothPath(totalPoints);
  const connectedPath = createSmoothPath(connectedPoints);
  const connectedArea = `${connectedPath} L ${connectedPoints[connectedPoints.length - 1].x} ${height - paddingY} L ${connectedPoints[0].x} ${height - paddingY} Z`;

  const activePoint = hoveredIdx !== null ? rawData[hoveredIdx] : null;
  const activePointCoord = hoveredIdx !== null ? totalPoints[hoveredIdx] : null;

  const toggleLine = (key: string) => {
    setActiveLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4 select-none">
      <div className="relative overflow-visible">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="voiceosVolumeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.14" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>

            <filter id="voiceosLineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Y Axis Grid lines and labels */}
          {yTicks.map((val, idx) => {
            const pct = idx / (yTicks.length - 1);
            const y = paddingY + pct * chartH;
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#ECEEF1"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 12}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#9CA3AF"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Connected Area Fill with VoiceOS Gradient */}
          {activeLines.connected && (
            <path d={connectedArea} fill="url(#voiceosVolumeGrad)" className="animate-chart-area" />
          )}

          {/* Total Calls Curve (Royal Blue #2563EB) */}
          {activeLines.totalCalls && (
            <path
              d={totalPath}
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="url(#voiceosLineGlow)"
              className="animate-chart-draw"
            />
          )}

          {/* Connected Curve (Sky Blue #38BDF8) */}
          {activeLines.connected && (
            <path
              d={connectedPath}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.2"
              strokeLinecap="round"
              className="animate-chart-draw"
            />
          )}

          {/* Data Points on Total Calls */}
          {activeLines.totalCalls &&
            totalPoints.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#FFFFFF"
                stroke="#2563EB"
                strokeWidth="2.5"
                className="transition-transform duration-200 hover:scale-150"
              />
            ))}

          {/* X Axis Labels */}
          <text
            x={paddingX}
            y={height - 4}
            textAnchor="start"
            fontSize="10"
            fill="#6B7280"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
          >
            {rawData[0].date}
          </text>
          <text
            x={width - paddingX}
            y={height - 4}
            textAnchor="end"
            fontSize="10"
            fill="#6B7280"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
          >
            {rawData[rawData.length - 1].date}
          </text>

          {/* Hitbox overlays for smooth hover */}
          {totalPoints.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - chartW / (totalPoints.length * 2)}
              y={paddingY}
              width={chartW / totalPoints.length}
              height={chartH}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
            />
          ))}

          {/* Active Hover Guideline & Point Highlight */}
          {activePointCoord && (
            <g>
              <line
                x1={activePointCoord.x}
                y1={paddingY}
                x2={activePointCoord.x}
                y2={height - paddingY}
                stroke="#2563EB"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <circle cx={activePointCoord.x} cy={activePointCoord.y} r="8" fill="#2563EB" fillOpacity="0.2" />
              <circle cx={activePointCoord.x} cy={activePointCoord.y} r="4.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
            </g>
          )}
        </svg>

        {/* Ringg.ai Tooltip Card with VoiceOS Styling */}
        {activePoint && activePointCoord && (
          <div
            className="absolute z-20 pointer-events-none p-3 rounded-xl bg-white border border-[#ECEEF1] shadow-dropdown text-xs transition-all duration-150 min-w-[145px]"
            style={{
              left: `${Math.min(Math.max((activePointCoord.x / width) * 100, 15), 80)}%`,
              top: `${(activePointCoord.y / height) * 100}%`,
              transform: 'translate(-50%, -115%)',
            }}
          >
            <div className="text-[11px] font-bold text-[#111827] pb-1.5 border-b border-[#ECEEF1] mb-2 flex items-center justify-between">
              <span>{activePoint.displayDate}</span>
              <span className="text-[10px] text-[#10B981] font-bold">100% Rate</span>
            </div>
            <div className="space-y-1.5 font-medium">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[#6B7280]">
                  <span className="w-2.5 h-1 rounded-xs bg-[#2563EB]" />
                  <span>Total calls</span>
                </div>
                <span className="font-bold text-[#111827]">{activePoint.totalCalls}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[#6B7280]">
                  <span className="w-2.5 h-1 rounded-xs bg-[#38BDF8]" />
                  <span>Connected</span>
                </div>
                <span className="font-bold text-[#111827]">{activePoint.connected}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Legend Bar with Unified Theme */}
      <div className="flex flex-wrap items-center justify-center gap-5 pt-3 border-t border-[#ECEEF1] text-xs font-semibold text-[#6B7280]">
        <button
          onClick={() => toggleLine('totalCalls')}
          className={`flex items-center gap-1.5 transition-opacity cursor-pointer ${
            activeLines.totalCalls ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <span className="w-4 h-0.5 bg-[#2563EB] rounded-full" />
          <span className="text-[#111827] font-bold">Total calls</span>
        </button>

        <button
          onClick={() => toggleLine('connected')}
          className={`flex items-center gap-1.5 transition-opacity cursor-pointer ${
            activeLines.connected ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <span className="w-4 h-0.5 bg-[#38BDF8] rounded-full" />
          <span className="text-[#111827] font-bold">Connected</span>
        </button>

        <button
          onClick={() => toggleLine('failed')}
          className={`flex items-center gap-1.5 transition-opacity cursor-pointer ${
            activeLines.failed ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <span className="w-4 h-0.5 bg-[#CBD5E1]" />
          <span>Failed</span>
        </button>

        <button
          onClick={() => toggleLine('cancelled')}
          className={`flex items-center gap-1.5 transition-opacity cursor-pointer ${
            activeLines.cancelled ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <span className="w-4 h-0.5 border-t border-dashed border-[#CBD5E1]" />
          <span>Cancelled</span>
        </button>

        <button
          onClick={() => toggleLine('registered')}
          className={`flex items-center gap-1.5 transition-opacity cursor-pointer ${
            activeLines.registered ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <span className="w-4 h-0.5 bg-[#E5E7EB]" />
          <span>Registered</span>
        </button>

        <button
          onClick={() => toggleLine('ongoing')}
          className={`flex items-center gap-1.5 transition-opacity cursor-pointer ${
            activeLines.ongoing ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <span className="w-4 h-0.5 bg-[#E5E7EB]" />
          <span>Ongoing</span>
        </button>

        <button
          onClick={() => toggleLine('retry')}
          className={`flex items-center gap-1.5 transition-opacity cursor-pointer ${
            activeLines.retry ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <span className="w-4 h-0.5 border-t border-dashed border-[#CBD5E1]" />
          <span>Retry</span>
        </button>
      </div>
    </div>
  );
};
