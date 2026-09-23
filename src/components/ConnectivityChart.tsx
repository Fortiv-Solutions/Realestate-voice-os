import React, { useState } from 'react';

export interface AttemptData {
  label: string;
  attemptNumber: number;
  rate: number;
  cumulativeConnectivity: string;
  retryConnectivity: string;
  connectedCalls: string;
}

export const ConnectivityChart: React.FC<{ height?: number }> = ({ height = 200 }) => {
  const [hoveredAttempt, setHoveredAttempt] = useState<number | null>(null);

  const attemptsData: AttemptData[] = [
    {
      label: 'Attempt 1',
      attemptNumber: 1,
      rate: 100,
      cumulativeConnectivity: '100.0%',
      retryConnectivity: '100.0%',
      connectedCalls: '23/23',
    },
    {
      label: 'Attempt 2',
      attemptNumber: 2,
      rate: 82,
      cumulativeConnectivity: '91.3%',
      retryConnectivity: '82.0%',
      connectedCalls: '18/22',
    },
    {
      label: 'Attempt 3',
      attemptNumber: 3,
      rate: 45,
      cumulativeConnectivity: '78.5%',
      retryConnectivity: '45.0%',
      connectedCalls: '9/20',
    },
  ];

  const yTicks = ['100%', '80%', '60%', '40%', '20%', '0%'];

  const width = 500;
  const paddingLeft = 55;
  const paddingRight = 45;
  const paddingTop = 25;
  const paddingBottom = 25;
  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const activeItem = hoveredAttempt !== null ? attemptsData[hoveredAttempt] : null;
  const activeX =
    hoveredAttempt !== null
      ? paddingLeft + (hoveredAttempt / (attemptsData.length - 1)) * chartW
      : null;
  const activeY =
    hoveredAttempt !== null && activeItem
      ? paddingTop + (1 - activeItem.rate / 100) * chartH
      : null;

  return (
    <div className="relative select-none" onMouseLeave={() => setHoveredAttempt(null)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible select-none"
        onMouseLeave={() => setHoveredAttempt(null)}
      >
        {/* Horizontal Dotted Grid Lines */}
        {yTicks.map((tick, idx) => {
          const y = paddingTop + (idx / (yTicks.length - 1)) * chartH;
          return (
            <g key={tick}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#ECEEF1"
                strokeDasharray="2 3"
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 8}
                y={y + 3.5}
                textAnchor="end"
                fontSize="9"
                fill="#9CA3AF"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Vertical guideline on active hovered attempt only */}
        {hoveredAttempt !== null && activeX !== null && (
          <line
            x1={activeX}
            y1={paddingTop}
            x2={activeX}
            y2={height - paddingBottom}
            stroke="#CBD5E1"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        )}

        {/* 3 Attempt Data Points */}
        {attemptsData.map((d, i) => {
          const x = paddingLeft + (i / (attemptsData.length - 1)) * chartW;
          const y = paddingTop + (1 - d.rate / 100) * chartH;
          const isHovered = hoveredAttempt === i;

          return (
            <g
              key={d.label}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredAttempt(i)}
            >
              {/* Rate text above dot */}
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                fontSize="10"
                fill="#111827"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
              >
                {d.rate}%
              </text>

              {/* Dot / Indicator */}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 5 : 4}
                fill={isHovered ? '#F97316' : '#2563EB'}
                stroke="#FFFFFF"
                strokeWidth="2"
                className="transition-all duration-200"
              />

              {/* X Axis Label */}
              <text
                x={x}
                y={height - 4}
                textAnchor="middle"
                fontSize="9.5"
                fill={isHovered ? '#111827' : '#6B7280'}
                fontFamily="Inter, sans-serif"
                fontWeight={isHovered ? '700' : '500'}
              >
                {d.label}
              </text>

              {/* Hitbox */}
              <rect
                x={x - chartW / (attemptsData.length * 2)}
                y={paddingTop}
                width={chartW / attemptsData.length}
                height={chartH + 20}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredAttempt(i)}
              />
            </g>
          );
        })}
      </svg>

      {/* Ringg.ai Interactive Tooltip Card (ONLY shown on hover) */}
      {hoveredAttempt !== null && activeItem && activeX !== null && activeY !== null && (
        <div
          className="absolute z-20 pointer-events-none p-3.5 rounded-2xl bg-white border border-[#ECEEF1] shadow-dropdown text-xs transition-all duration-150 min-w-[210px]"
          style={{
            left: `${Math.min(Math.max((activeX / width) * 100, 25), 75)}%`,
            top: `${(activeY / height) * 100 + 15}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="text-xs font-bold text-[#111827] pb-2 border-b border-[#F0F2F5] mb-2.5">
            {activeItem.label}
          </div>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[#4B5563]">
                <span className="w-1.5 h-3 rounded-full bg-[#F97316]" />
                <span>Cumulative connectivity</span>
              </div>
              <span className="font-bold text-[#111827]">{activeItem.cumulativeConnectivity}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[#4B5563]">
                <span className="w-1.5 h-3 rounded-full bg-[#CBD5E1]" />
                <span>Retry connectivity</span>
              </div>
              <span className="font-bold text-[#111827]">{activeItem.retryConnectivity}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[#4B5563]">
                <span className="w-1.5 h-3 rounded-full bg-[#10B981]" />
                <span>Connected Calls</span>
              </div>
              <span className="font-bold text-[#111827]">{activeItem.connectedCalls}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
