import React, { useState, useEffect } from 'react';
import { Play, Pause, TrendingUp, Info, ArrowUpRight, Phone, MessageSquare, Mail, BarChart3, CheckCircle2, XCircle, Zap, Activity } from 'lucide-react';

// =========================================================================
// 1. DYNAMIC DIRECT LEADS OVER TIME (All leads / WhatsApp / Calls / Email)
// =========================================================================

export type LeadChannel = 'All leads' | 'WhatsApp' | 'Calls' | 'Email';

export interface DirectLeadsChartProps {
  selectedChannel?: LeadChannel;
  onChannelChange?: (channel: LeadChannel) => void;
  data?: number[];
  labels?: string[];
  height?: number;
}

export const DirectLeadsOverTimeChart: React.FC<DirectLeadsChartProps> = ({
  selectedChannel = 'All leads',
  onChannelChange,
  data: customData,
  labels: customLabels,
  height = 160,
}) => {
  const [internalChannel, setInternalChannel] = useState<LeadChannel>(selectedChannel);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setInternalChannel(selectedChannel);
    setAnimKey((prev) => prev + 1);
  }, [selectedChannel]);

  const defaultDates = ['17 Aug', '23 Aug', '29 Aug', '01 Sep', '04 Sep', '07 Sep', '10 Sep', '13 Sep'];
  const dates = customLabels || defaultDates;

  const channelDatasets: Record<LeadChannel, { data: number[]; yMarks: number[]; color: string; unit: string; total: string; avg: string }> = {
    'All leads': {
      data: [420, 510, 480, 620, 710, 680, 740, 810],
      yMarks: [828, 414, 0],
      color: '#0284C7',
      unit: 'leads',
      total: '19,621',
      avg: '654/day',
    },
    'WhatsApp': {
      data: [380, 460, 430, 560, 640, 610, 670, 730],
      yMarks: [750, 375, 0],
      color: '#06B6D4',
      unit: 'WhatsApp msgs',
      total: '17,600',
      avg: '586/day',
    },
    'Calls': {
      data: [42, 48, 45, 58, 65, 62, 68, 74],
      yMarks: [80, 40, 0],
      color: '#0284C7',
      unit: 'phone calls',
      total: '2,000',
      avg: '67/day',
    },
    'Email': {
      data: [8, 12, 10, 14, 16, 12, 15, 18],
      yMarks: [20, 10, 0],
      color: '#6366F1',
      unit: 'inquiries',
      total: '21',
      avg: '1/day',
    },
  };

  const activeSet = channelDatasets[internalChannel];
  const chartData = customData || activeSet.data;
  const maxVal = activeSet.yMarks[0];
  const minVal = 0;

  const width = 600;
  const paddingX = 40;
  const paddingY = 22;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const points = chartData.map((val, i) => {
    const x = paddingX + (i / (chartData.length - 1)) * chartW;
    const y = height - paddingY - (val / (maxVal || 1)) * chartH;
    return { x, y, val, date: dates[i % dates.length] };
  });

  let path = `M ${points[0]?.x || 0} ${points[0]?.y || 0}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const cpx = (p1.x + p2.x) / 2;
    path += ` C ${cpx} ${p1.y}, ${cpx} ${p2.y}, ${p2.x} ${p2.y}`;
  }

  const lastPoint = points[points.length - 1] || { x: width - paddingX, y: height - paddingY };
  const firstPoint = points[0] || { x: paddingX, y: height - paddingY };
  const areaPath = `${path} L ${lastPoint.x} ${height - paddingY} L ${firstPoint.x} ${height - paddingY} Z`;

  const activePoint = hoveredIdx !== null ? points[hoveredIdx] : null;

  const handleChannelSelect = (channel: LeadChannel) => {
    setInternalChannel(channel);
    setAnimKey((prev) => prev + 1);
    if (onChannelChange) {
      onChannelChange(channel);
    }
  };

  return (
    <div className="space-y-3">
      {/* Dynamic Channels Filter Buttons with Live Animation Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center p-1 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
          {(['All leads', 'WhatsApp', 'Calls', 'Email'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => handleChannelSelect(filter)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 relative ${
                internalChannel === filter
                  ? 'bg-white text-[#0284C7] shadow-sm border border-[#BAE6FD]'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {internalChannel === filter && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-ping" />
                )}
                <span>{filter}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64748B] font-semibold">
          <Activity className="w-3.5 h-3.5 text-[#06B6D4] animate-pulse" />
          <span>Total: <strong className="text-[#0284C7] font-bold">{activeSet.total}</strong></span>
          <span>•</span>
          <span>Avg: <strong className="text-[#0F172A]">{activeSet.avg}</strong></span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl pt-1">
        <svg
          key={`chart-svg-${animKey}`}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id={`dynLeadGrad_${internalChannel.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeSet.color} stopOpacity="0.28" />
              <stop offset="60%" stopColor={activeSet.color} stopOpacity="0.08" />
              <stop offset="100%" stopColor={activeSet.color} stopOpacity="0.0" />
            </linearGradient>

            <filter id="leadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={activeSet.color} floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Background subtle grid lines matching video */}
          {activeSet.yMarks.map((val, idx) => {
            const pct = idx / (activeSet.yMarks.length - 1);
            const y = paddingY + pct * chartH;
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#E2EEF8"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="9.5"
                  fill="#94A3B8"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Animated Area Fill */}
          <path
            d={areaPath}
            fill={`url(#dynLeadGrad_${internalChannel.replace(/\s+/g, '')})`}
            className="animate-chart-area"
          />

          {/* Dynamic Spline Line with smooth draw-in animation */}
          <path
            d={path}
            fill="none"
            stroke={activeSet.color}
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#leadGlow)"
            className="animate-chart-draw"
          />

          {/* Interactive Spark Nodes on Line */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="4"
              fill="#FFFFFF"
              stroke={activeSet.color}
              strokeWidth="2.5"
              className="transition-all duration-300 hover:scale-150"
            />
          ))}

          {/* X Dates */}
          {dates.map((d, i) => {
            const x = paddingX + (i / (dates.length - 1)) * chartW;
            return (
              <text
                key={i}
                x={x}
                y={height - 2}
                textAnchor="middle"
                fontSize="9.5"
                fill="#64748B"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
              >
                {d}
              </text>
            );
          })}

          {/* Hitboxes for hover */}
          {points.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - chartW / (points.length * 2)}
              y={paddingY}
              width={chartW / points.length}
              height={chartH}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
            />
          ))}

          {/* Active Hover Highlight & Pulsing Crosshair */}
          {activePoint && (
            <g>
              <line
                x1={activePoint.x}
                y1={paddingY}
                x2={activePoint.x}
                y2={height - paddingY}
                stroke={activeSet.color}
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="10"
                fill={activeSet.color}
                fillOpacity="0.25"
                className="animate-ping"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="5.5"
                fill="#FFFFFF"
                stroke={activeSet.color}
                strokeWidth="3.5"
              />
            </g>
          )}
        </svg>

        {/* Animated Floating Glassmorphism Tooltip */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none px-3 py-2 rounded-xl bg-[#0F172A]/95 backdrop-blur-md text-white text-xs font-semibold shadow-2xl -translate-x-1/2 -translate-y-full transition-all duration-150 border border-[#06B6D4]/40"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
              marginTop: '-12px',
            }}
          >
            <div className="text-[10px] text-cyan-300 font-normal flex items-center justify-between gap-3 mb-0.5">
              <span>{activePoint.date}</span>
              <span className="text-[#10B981] font-bold">↑ +18.4%</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-cyan-glow" />
              <span>{internalChannel}:</span>
              <span className="text-[#38BDF8]">{activePoint.val.toLocaleString()} {activeSet.unit}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 2. DYNAMIC DIRECT LEADS DONUT CHART WITH ROTATION & SWEEP ANIMATION
// =========================================================================

export interface DirectLeadsDonutProps {
  total?: string;
  whatsappCount?: number;
  callsCount?: number;
  emailCount?: number;
}

export const DirectLeadsDonutChart: React.FC<DirectLeadsDonutProps> = ({
  total = '19,621',
  whatsappCount = 17600,
  callsCount = 2000,
  emailCount = 21,
}) => {
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  const totalNum = whatsappCount + callsCount + emailCount;
  const whatsappPct = ((whatsappCount / totalNum) * 100).toFixed(1);
  const callsPct = ((callsCount / totalNum) * 100).toFixed(1);
  const emailPct = ((emailCount / totalNum) * 100).toFixed(1);

  // SVG Donut calculation
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 14;

  const whatsappStroke = (whatsappCount / totalNum) * circumference;
  const callsStroke = (callsCount / totalNum) * circumference;
  const emailStroke = (emailCount / totalNum) * circumference;

  const callsOffset = -whatsappStroke;
  const emailOffset = -(whatsappStroke + callsStroke);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
      {/* SVG Donut with hover zoom and glow */}
      <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90 transform transition-transform duration-500">
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#F0F7FD"
            strokeWidth={strokeWidth}
          />
          {/* WhatsApp segment (Electric Cyan) */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#06B6D4"
            strokeWidth={hoveredChannel === 'WhatsApp' ? strokeWidth + 4 : strokeWidth}
            strokeDasharray={`${whatsappStroke} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            className="transition-all duration-300 cursor-pointer hover:stroke-[#0891B2]"
            onMouseEnter={() => setHoveredChannel('WhatsApp')}
            onMouseLeave={() => setHoveredChannel(null)}
          />
          {/* Calls segment (Ocean Blue) */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#0284C7"
            strokeWidth={hoveredChannel === 'Calls' ? strokeWidth + 4 : strokeWidth}
            strokeDasharray={`${callsStroke} ${circumference}`}
            strokeDashoffset={callsOffset}
            strokeLinecap="round"
            className="transition-all duration-300 cursor-pointer hover:stroke-[#0369A1]"
            onMouseEnter={() => setHoveredChannel('Calls')}
            onMouseLeave={() => setHoveredChannel(null)}
          />
          {/* Email segment (Indigo Cyan) */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#6366F1"
            strokeWidth={hoveredChannel === 'Email' ? strokeWidth + 4 : strokeWidth}
            strokeDasharray={`${emailStroke} ${circumference}`}
            strokeDashoffset={emailOffset}
            strokeLinecap="round"
            className="transition-all duration-300 cursor-pointer hover:stroke-[#4F46E5]"
            onMouseEnter={() => setHoveredChannel('Email')}
            onMouseLeave={() => setHoveredChannel(null)}
          />
        </svg>

        {/* Center label with smooth value transition */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">Total Leads</span>
          <span className="text-base font-black text-[#0F172A] transition-all duration-200">
            {hoveredChannel
              ? hoveredChannel === 'WhatsApp'
                ? `${whatsappPct}%`
                : hoveredChannel === 'Calls'
                ? `${callsPct}%`
                : `${emailPct}%`
              : total}
          </span>
          <span className="text-[9px] font-semibold text-[#0284C7] transition-all duration-200">
            {hoveredChannel || 'All Sources'}
          </span>
        </div>
      </div>

      {/* Legend & Breakdown with Hover Card Lift */}
      <div className="space-y-2.5 flex-1 min-w-[170px]">
        {/* WhatsApp item */}
        <div
          className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
            hoveredChannel === 'WhatsApp'
              ? 'bg-[#ECFEFF] border border-[#A5F3FC] translate-x-1 shadow-sm'
              : 'hover:bg-[#F8FCFF]'
          }`}
          onMouseEnter={() => setHoveredChannel('WhatsApp')}
          onMouseLeave={() => setHoveredChannel(null)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] shadow-sm animate-pulse" />
            <span className="text-xs font-bold text-[#0F172A]">WhatsApp</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#0F172A]">{whatsappCount.toLocaleString()}</span>
            <span className="text-[10px] text-[#64748B] block font-semibold">{whatsappPct}%</span>
          </div>
        </div>

        {/* Calls item */}
        <div
          className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
            hoveredChannel === 'Calls'
              ? 'bg-[#E0F2FE] border border-[#BAE6FD] translate-x-1 shadow-sm'
              : 'hover:bg-[#F8FCFF]'
          }`}
          onMouseEnter={() => setHoveredChannel('Calls')}
          onMouseLeave={() => setHoveredChannel(null)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0284C7] shadow-sm animate-pulse" />
            <span className="text-xs font-bold text-[#0F172A]">Voice Calls</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#0F172A]">{callsCount.toLocaleString()}</span>
            <span className="text-[10px] text-[#64748B] block font-semibold">{callsPct}%</span>
          </div>
        </div>

        {/* Email item */}
        <div
          className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
            hoveredChannel === 'Email'
              ? 'bg-[#EEF2FF] border border-[#C7D2FE] translate-x-1 shadow-sm'
              : 'hover:bg-[#F8FCFF]'
          }`}
          onMouseEnter={() => setHoveredChannel('Email')}
          onMouseLeave={() => setHoveredChannel(null)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6366F1] shadow-sm" />
            <span className="text-xs font-bold text-[#0F172A]">Email Inquiries</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#0F172A]">{emailCount}</span>
            <span className="text-[10px] text-[#64748B] block font-semibold">{emailPct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. DYNAMIC CALL INSIGHTS LINE CHART (Total calls vs Answering rate)
// =========================================================================

export const CallInsightsLineChart: React.FC<{
  initialMode?: 'Total calls' | 'Answering rate';
}> = ({ initialMode = 'Total calls' }) => {
  const [mode, setMode] = useState<'Total calls' | 'Answering rate'>(initialMode);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const dates = ['17 Aug', '21 Aug', '25 Aug', '29 Aug', '2 Sep', '6 Sep', '10 Sep', '14 Sep'];

  const datasets = {
    'Total calls': {
      data: [48, 62, 58, 70, 75, 52, 68, 80, 64, 78, 55, 82],
      yMarks: [85, 48, 0],
      unit: 'calls',
      color: '#0284C7',
      maxVal: 85,
      isPercentage: false,
    },
    'Answering rate': {
      data: [64, 68, 65, 71, 74, 66, 69, 75, 70, 73, 68, 76],
      yMarks: [100, 50, 0],
      unit: '%',
      color: '#06B6D4',
      maxVal: 100,
      isPercentage: true,
    },
  };

  const activeSet = datasets[mode];
  const width = 550;
  const paddingX = 40;
  const paddingY = 20;
  const chartW = width - paddingX * 2;
  const chartH = 145 - paddingY * 2;

  const points = activeSet.data.map((val, i) => {
    const x = paddingX + (i / (activeSet.data.length - 1)) * chartW;
    const y = 145 - paddingY - (val / activeSet.maxVal) * chartH;
    return { x, y, val, date: dates[i % dates.length] };
  });

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const cpx = (p1.x + p2.x) / 2;
    path += ` C ${cpx} ${p1.y}, ${cpx} ${p2.y}, ${p2.x} ${p2.y}`;
  }

  const lastPoint = points[points.length - 1] || { x: width - paddingX, y: 145 - paddingY };
  const firstPoint = points[0] || { x: paddingX, y: 145 - paddingY };
  const areaPath = `${path} L ${lastPoint.x} ${145 - paddingY} L ${firstPoint.x} ${145 - paddingY} Z`;

  const activePoint = hoveredIdx !== null ? points[hoveredIdx] : null;

  const handleModeChange = (newMode: 'Total calls' | 'Answering rate') => {
    setMode(newMode);
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-3">
      {/* Dynamic Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {(['Total calls', 'Answering rate'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleModeChange(tab)}
              className={`text-xs font-bold pb-1 transition-all duration-300 relative ${
                mode === tab
                  ? 'text-[#0284C7] border-b-2 border-[#0284C7]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-bold text-[#0891B2] bg-[#ECFEFF] px-2.5 py-0.5 rounded-lg border border-[#A5F3FC] shadow-xs animate-pulse">
          {mode === 'Total calls' ? 'Volume: 2k Total' : 'Avg Rate: 69%'}
        </span>
      </div>

      <div className="relative">
        <svg
          key={`call-svg-${animKey}`}
          viewBox={`0 0 ${width} 145`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id={`callGrad_${mode.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeSet.color} stopOpacity="0.25" />
              <stop offset="60%" stopColor={activeSet.color} stopOpacity="0.06" />
              <stop offset="100%" stopColor={activeSet.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {activeSet.yMarks.map((val, idx) => {
            const pct = idx / (activeSet.yMarks.length - 1);
            const y = paddingY + pct * chartH;
            return (
              <g key={idx}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#E2EEF8" strokeDasharray="3 3" />
                <text x={paddingX - 8} y={y + 3.5} textAnchor="end" fontSize="9" fill="#94A3B8" fontFamily="Inter, sans-serif" fontWeight="500">
                  {val}{activeSet.isPercentage ? '%' : ''}
                </text>
              </g>
            );
          })}

          {/* Area Gradient */}
          <path
            d={areaPath}
            fill={`url(#callGrad_${mode.replace(/\s+/g, '')})`}
            className="animate-chart-area"
          />

          {/* Dynamic Spline Curve with Animated Draw */}
          <path
            d={path}
            fill="none"
            stroke={activeSet.color}
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-chart-draw"
          />

          {/* Data nodes */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#FFFFFF"
              stroke={activeSet.color}
              strokeWidth="2.5"
            />
          ))}

          {/* X Dates */}
          {dates.map((lbl, idx) => {
            const x = paddingX + (idx / (dates.length - 1)) * chartW;
            return (
              <text key={idx} x={x} y={136} textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="Inter, sans-serif">
                {lbl}
              </text>
            );
          })}

          {/* Hitboxes */}
          {points.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - chartW / (points.length * 2)}
              y={paddingY}
              width={chartW / points.length}
              height={chartH}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
            />
          ))}

          {activePoint && (
            <g>
              <line x1={activePoint.x} y1={paddingY} x2={activePoint.x} y2={140 - paddingY} stroke={activeSet.color} strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx={activePoint.x} cy={activePoint.y} r="8" fill={activeSet.color} fillOpacity="0.25" className="animate-ping" />
              <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#FFFFFF" stroke={activeSet.color} strokeWidth="3" />
            </g>
          )}
        </svg>

        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none px-2.5 py-1.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold -translate-x-1/2 -translate-y-full shadow-xl border border-[#06B6D4]/40"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / 140) * 100}%`,
              marginTop: '-10px',
            }}
          >
            {activePoint.val}{activeSet.unit}
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 4. DYNAMIC WHATSAPP INSIGHTS LINE CHART (Leads vs Response rate vs Response time)
// =========================================================================

export const WhatsAppInsightsLineChart: React.FC = () => {
  const [mode, setMode] = useState<'WhatsApp leads' | 'Response rate' | 'Response time'>('WhatsApp leads');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const dates = ['17 Aug', '21 Aug', '25 Aug', '29 Aug', '2 Sep', '6 Sep', '10 Sep', '14 Sep'];

  const datasets = {
    'WhatsApp leads': {
      data: [520, 580, 560, 620, 680, 640, 710, 750],
      yMarks: [850, 425, 0],
      unit: 'msgs',
      color: '#06B6D4',
      maxVal: 850,
      minVal: 0,
      format: (v: number) => `${v} msgs`,
    },
    'Response rate': {
      data: [98.2, 98.8, 99.1, 99.0, 99.4, 99.2, 99.5, 99.6],
      yMarks: [100, 98, 96],
      unit: '%',
      color: '#0284C7',
      maxVal: 100,
      minVal: 96,
      format: (v: number) => `${v.toFixed(1)}%`,
    },
    'Response time': {
      data: [8.2, 7.5, 6.8, 6.4, 6.1, 5.9, 5.8, 5.6],
      yMarks: [10, 5, 0],
      unit: 'mins',
      color: '#6366F1',
      maxVal: 10,
      minVal: 0,
      format: (v: number) => `${v.toFixed(1)} mins`,
    },
  };

  const activeSet = datasets[mode];
  const width = 550;
  const paddingX = 40;
  const paddingY = 20;
  const chartW = width - paddingX * 2;
  const chartH = 145 - paddingY * 2;

  const points = activeSet.data.map((val, i) => {
    const x = paddingX + (i / (activeSet.data.length - 1)) * chartW;
    const y = 145 - paddingY - ((val - activeSet.minVal) / (activeSet.maxVal - activeSet.minVal)) * chartH;
    return { x, y, val, date: dates[i % dates.length] };
  });

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const cpx = (p1.x + p2.x) / 2;
    path += ` C ${cpx} ${p1.y}, ${cpx} ${p2.y}, ${p2.x} ${p2.y}`;
  }

  const lastPoint = points[points.length - 1] || { x: width - paddingX, y: 145 - paddingY };
  const firstPoint = points[0] || { x: paddingX, y: 145 - paddingY };
  const areaPath = `${path} L ${lastPoint.x} ${145 - paddingY} L ${firstPoint.x} ${145 - paddingY} Z`;

  const activePoint = hoveredIdx !== null ? points[hoveredIdx] : null;

  const handleModeChange = (newMode: 'WhatsApp leads' | 'Response rate' | 'Response time') => {
    setMode(newMode);
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-3">
      {/* Dynamic Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {(['WhatsApp leads', 'Response rate', 'Response time'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleModeChange(tab)}
              className={`text-xs font-bold pb-1 transition-all duration-300 relative ${
                mode === tab
                  ? 'text-[#0284C7] border-b-2 border-[#0284C7]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-bold text-[#0284C7] bg-[#E0F2FE] px-2.5 py-0.5 rounded-lg border border-[#BAE6FD] shadow-xs">
          {mode === 'WhatsApp leads' ? '17.6k Total' : mode === 'Response rate' ? '99% Avg' : '5.6m Fast'}
        </span>
      </div>

      <div className="relative">
        <svg
          key={`wa-svg-${animKey}`}
          viewBox={`0 0 ${width} 145`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id={`waGrad_${mode.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeSet.color} stopOpacity="0.25" />
              <stop offset="60%" stopColor={activeSet.color} stopOpacity="0.06" />
              <stop offset="100%" stopColor={activeSet.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {activeSet.yMarks.map((val, idx) => {
            const pct = idx / (activeSet.yMarks.length - 1);
            const y = paddingY + pct * chartH;
            return (
              <g key={idx}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#E2EEF8" strokeDasharray="3 3" />
                <text x={paddingX - 8} y={y + 3.5} textAnchor="end" fontSize="9" fill="#94A3B8" fontFamily="Inter, sans-serif" fontWeight="500">
                  {val}{mode === 'Response rate' ? '%' : mode === 'Response time' ? 'm' : ''}
                </text>
              </g>
            );
          })}

          {/* Area Gradient */}
          <path
            d={areaPath}
            fill={`url(#waGrad_${mode.replace(/\s+/g, '')})`}
            className="animate-chart-area"
          />

          <path
            d={path}
            fill="none"
            stroke={activeSet.color}
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-chart-draw"
          />

          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#FFFFFF"
              stroke={activeSet.color}
              strokeWidth="2.5"
            />
          ))}

          {dates.map((lbl, idx) => {
            const x = paddingX + (idx / (dates.length - 1)) * chartW;
            return (
              <text key={idx} x={x} y={141} textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="Inter, sans-serif">
                {lbl}
              </text>
            );
          })}

          {points.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - chartW / (points.length * 2)}
              y={paddingY}
              width={chartW / points.length}
              height={chartH}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
            />
          ))}

          {activePoint && (
            <g>
              <line x1={activePoint.x} y1={paddingY} x2={activePoint.x} y2={140 - paddingY} stroke={activeSet.color} strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx={activePoint.x} cy={activePoint.y} r="8" fill={activeSet.color} fillOpacity="0.25" className="animate-ping" />
              <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#FFFFFF" stroke={activeSet.color} strokeWidth="3" />
            </g>
          )}
        </svg>

        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none px-2.5 py-1.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold -translate-x-1/2 -translate-y-full shadow-xl border border-[#06B6D4]/40"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / 140) * 100}%`,
              marginTop: '-10px',
            }}
          >
            {activeSet.format(activePoint.val)}
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 5. DYNAMIC CALLS PER DAY CHART (Answered vs Unanswered Stacked Bars with Bounce)
// =========================================================================

export const CallsPerDayChart: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const daysData = [
    { day: 'Mon', answered: 240, unanswered: 45, total: 285 },
    { day: 'Tue', answered: 290, unanswered: 55, total: 345 },
    { day: 'Wed', answered: 320, unanswered: 60, total: 380 },
    { day: 'Thu', answered: 280, unanswered: 50, total: 330 },
    { day: 'Fri', answered: 310, unanswered: 65, total: 375 },
    { day: 'Sat', answered: 160, unanswered: 35, total: 195 },
    { day: 'Sun', answered: 95, unanswered: 20, total: 115 },
  ];

  const maxTotal = 420;

  return (
    <div className="space-y-2 select-none relative">
      <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2">
        {daysData.map((d, i) => {
          const answeredH = (d.answered / maxTotal) * 100;
          const unansweredH = (d.unanswered / maxTotal) * 100;
          const isHovered = hoveredDay === i;

          return (
            <div
              key={d.day}
              className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group relative"
              onMouseEnter={() => setHoveredDay(i)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {/* Floating Tooltip */}
              {isHovered && (
                <div className="absolute -top-7 bg-[#0F172A] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-xl z-30 whitespace-nowrap border border-[#06B6D4]/40 animate-bounce">
                  {d.day}: {d.answered} Answered ({Math.round((d.answered / d.total) * 100)}%)
                </div>
              )}

              {/* Stacked bar container with staggered grow animation */}
              <div
                style={{ animationDelay: `${i * 80}ms` }}
                className="w-full max-w-[28px] h-24 bg-[#F0F7FD] rounded-lg overflow-hidden flex flex-col justify-end p-0.5 group-hover:ring-2 group-hover:ring-[#06B6D4]/60 group-hover:scale-105 transition-all duration-300 animate-bar-grow shadow-xs"
              >
                {/* Unanswered (light cyan) */}
                <div
                  style={{ height: `${unansweredH}%` }}
                  className="w-full bg-[#BAE6FD] rounded-t-sm transition-all duration-500 group-hover:bg-[#7DD3FC]"
                />
                {/* Answered (electric cyan) */}
                <div
                  style={{ height: `${answeredH}%` }}
                  className="w-full bg-gradient-to-t from-[#0284C7] to-[#06B6D4] rounded-b-sm transition-all duration-500 group-hover:brightness-110 shadow-sm"
                />
              </div>

              {/* Day Label */}
              <span className={`text-[10px] font-semibold transition-colors duration-200 ${isHovered ? 'text-[#0284C7] font-bold scale-110' : 'text-[#64748B]'}`}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =========================================================================
// 6. DYNAMIC CALLS PER HOUR CHART (Peak Hours Histogram with Pulse)
// =========================================================================

export const CallsPerHourChart: React.FC = () => {
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const hoursData = [
    { hour: '8 AM', calls: 24, isPeak: false },
    { hour: '9 AM', calls: 48, isPeak: false },
    { hour: '10 AM', calls: 76, isPeak: false },
    { hour: '11 AM', calls: 145, isPeak: true },
    { hour: '12 PM', calls: 182, isPeak: true },
    { hour: '1 PM', calls: 164, isPeak: true },
    { hour: '2 PM', calls: 195, isPeak: true },
    { hour: '3 PM', calls: 188, isPeak: true },
    { hour: '4 PM', calls: 152, isPeak: true },
    { hour: '5 PM', calls: 98, isPeak: false },
    { hour: '6 PM', calls: 62, isPeak: false },
    { hour: '7 PM', calls: 35, isPeak: false },
  ];

  const maxCalls = 220;

  return (
    <div className="space-y-2 select-none relative">
      <div className="h-32 flex items-end justify-between gap-1.5 pt-4 px-1">
        {hoursData.map((h, i) => {
          const barHeight = (h.calls / maxCalls) * 100;
          const isHovered = hoveredHour === i;

          return (
            <div
              key={h.hour}
              className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group relative"
              onMouseEnter={() => setHoveredHour(i)}
              onMouseLeave={() => setHoveredHour(null)}
            >
              {isHovered && (
                <div className="absolute -top-7 bg-[#0F172A] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl z-30 whitespace-nowrap border border-[#06B6D4]/40 animate-bounce">
                  {h.hour}: {h.calls} calls {h.isPeak ? '🔥' : ''}
                </div>
              )}

              <div
                style={{ animationDelay: `${i * 45}ms` }}
                className="w-full max-w-[20px] h-24 bg-[#F0F7FD] rounded-lg overflow-hidden flex flex-col justify-end p-0.5 group-hover:ring-2 group-hover:ring-[#06B6D4]/60 group-hover:scale-105 transition-all duration-300 animate-bar-grow"
              >
                <div
                  style={{ height: `${barHeight}%` }}
                  className={`w-full rounded-md transition-all duration-500 ${
                    h.isPeak
                      ? 'bg-gradient-to-t from-[#0284C7] to-[#06B6D4] shadow-cyan-glow animate-pulse'
                      : 'bg-[#BAE6FD] hover:bg-[#7DD3FC]'
                  }`}
                />
              </div>

              <span className={`text-[9px] font-medium transition-colors duration-200 ${h.isPeak ? 'text-[#0284C7] font-bold' : 'text-[#64748B]'}`}>
                {h.hour.replace(' ', '')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =========================================================================
// 7. PROFOLIO DYNAMIC LISTING PERFORMANCE (Daily vs Monthly & Live Stream)
// =========================================================================

export interface ProfolioDataPoint {
  date: string;
  impressions: number;
  clicks: number;
  leads: number;
}

export const ProfolioListingPerformanceChart: React.FC<{
  data?: ProfolioDataPoint[];
  initialMode?: 'daily' | 'monthly';
  height?: number;
}> = ({
  initialMode = 'daily',
  height = 270,
}) => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>(initialMode);
  const [activeMetric, setActiveMetric] = useState<'impressions' | 'clicks' | 'leads'>('impressions');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(2);
  const [isLiveAnimating, setIsLiveAnimating] = useState(false);
  const [animMultiplier, setAnimMultiplier] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isLiveAnimating) {
      interval = setInterval(() => {
        setAnimMultiplier((prev) => (prev === 1 ? 1.08 : prev === 1.08 ? 0.94 : 1));
      }, 1200);
    } else {
      setAnimMultiplier(1);
    }
    return () => clearInterval(interval);
  }, [isLiveAnimating]);

  const dailyData: ProfolioDataPoint[] = [
    { date: 'Aug 17', impressions: 380000, clicks: 14500, leads: 580 },
    { date: 'Aug 19', impressions: 420000, clicks: 16200, leads: 640 },
    { date: 'Aug 21', impressions: 466765, clicks: 18400, leads: 720 },
    { date: 'Aug 23', impressions: 450000, clicks: 17800, leads: 690 },
    { date: 'Aug 25', impressions: 490000, clicks: 19100, leads: 760 },
    { date: 'Aug 27', impressions: 530000, clicks: 20500, leads: 810 },
    { date: 'Aug 29', impressions: 480000, clicks: 18600, leads: 740 },
    { date: 'Aug 31', impressions: 510000, clicks: 19800, leads: 790 },
    { date: 'Sep 02', impressions: 470000, clicks: 18200, leads: 730 },
    { date: 'Sep 04', impressions: 540000, clicks: 21000, leads: 840 },
    { date: 'Sep 06', impressions: 500000, clicks: 19400, leads: 770 },
    { date: 'Sep 08', impressions: 560000, clicks: 21800, leads: 870 },
    { date: 'Sep 10', impressions: 520000, clicks: 20100, leads: 800 },
    { date: 'Sep 12', impressions: 580000, clicks: 22500, leads: 890 },
    { date: 'Sep 14', impressions: 550000, clicks: 21400, leads: 850 },
    { date: 'Sep 16', impressions: 610000, clicks: 23800, leads: 940 },
  ];

  const monthlyData: ProfolioDataPoint[] = [
    { date: 'Apr 2026', impressions: 9200000, clicks: 360000, leads: 14200 },
    { date: 'May 2026', impressions: 10800000, clicks: 420000, leads: 16800 },
    { date: 'Jun 2026', impressions: 11400000, clicks: 455000, leads: 17900 },
    { date: 'Jul 2026', impressions: 12100000, clicks: 480000, leads: 18800 },
    { date: 'Aug 2026', impressions: 13200000, clicks: 512000, leads: 19950 },
    { date: 'Sep 2026', impressions: 13786944, clicks: 534450, leads: 20972 },
  ];

  const currentDataset = viewMode === 'daily' ? dailyData : monthlyData;

  const width = 850;
  const paddingX = 50;
  const paddingY = 25;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const rawValues = currentDataset.map((d) => d[activeMetric]);
  const metricMax = Math.max(...rawValues) * 1.15;
  const minVal = 0;

  const points = currentDataset.map((d, i) => {
    const x = paddingX + (i / (currentDataset.length - 1)) * chartW;
    const baseVal = d[activeMetric];
    const val = isLiveAnimating && i >= currentDataset.length - 3 ? Math.round(baseVal * animMultiplier) : baseVal;
    const y = height - paddingY - ((val - minVal) / (metricMax - minVal)) * chartH;
    return { x, y, val, date: d.date, full: d };
  });

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const activePoint = hoveredIdx !== null ? points[hoveredIdx] : null;

  return (
    <div className="relative select-none space-y-4">
      {/* Top Filter Controls (Daily/Monthly & Metrics) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
          {(
            [
              { key: 'impressions', label: 'Impressions' },
              { key: 'clicks', label: 'Clicks' },
              { key: 'leads', label: 'TruLeads™' },
            ] as const
          ).map((m) => (
            <button
              key={m.key}
              onClick={() => {
                setActiveMetric(m.key);
                setAnimKey((prev) => prev + 1);
              }}
              className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all duration-300 relative ${
                activeMetric === m.key
                  ? 'bg-white text-[#0284C7] shadow-sm border border-[#BAE6FD] scale-102'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {activeMetric === m.key && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-ping" />
                )}
                <span>{m.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 rounded-xl bg-[#F0F7FD] border border-[#E2EEF8]">
            <button
              onClick={() => {
                setViewMode('daily');
                setHoveredIdx(null);
                setAnimKey((prev) => prev + 1);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-300 ${
                viewMode === 'daily'
                  ? 'bg-white text-[#0284C7] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => {
                setViewMode('monthly');
                setHoveredIdx(null);
                setAnimKey((prev) => prev + 1);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-300 ${
                viewMode === 'monthly'
                  ? 'bg-white text-[#0284C7] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Monthly
            </button>
          </div>

          <button
            onClick={() => setIsLiveAnimating(!isLiveAnimating)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
              isLiveAnimating
                ? 'bg-[#ECFEFF] border-[#06B6D4] text-[#0891B2] shadow-cyan-glow animate-pulse scale-102'
                : 'bg-white border-[#E2EEF8] text-[#64748B] hover:text-[#0284C7]'
            }`}
          >
            {isLiveAnimating ? <Pause className="w-3.5 h-3.5 fill-current text-[#06B6D4]" /> : <Play className="w-3.5 h-3.5 fill-current text-[#0284C7]" />}
            <span>{isLiveAnimating ? 'Live Telemetry Active' : 'Simulate Live Stream'}</span>
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-white p-2">
        <svg
          key={`profolio-svg-${animKey}`}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="cyanBlueGradProfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.36" />
              <stop offset="60%" stopColor="#0284C7" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
            </linearGradient>

            <filter id="profolioGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4.5" floodColor="#06B6D4" floodOpacity="0.55" />
            </filter>
          </defs>

          {/* Y Grid */}
          {[0, 0.33, 0.66, 1].map((pct, idx) => {
            const val = Math.round(metricMax - pct * metricMax);
            const y = paddingY + pct * chartH;
            return (
              <g key={idx}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#E2EEF8" strokeDasharray={idx === 3 ? '' : '3 3'} strokeWidth="1" />
                <text x={paddingX - 10} y={y + 3.5} textAnchor="end" fontSize="10" fill="#94A3B8" fontFamily="Inter, sans-serif" fontWeight="500">
                  {val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Shaded Area with Fade In */}
          <path d={areaPath} fill="url(#cyanBlueGradProfolio)" className="animate-chart-area" />

          {/* Dynamic Glowing Spline Line with smooth animation */}
          <path
            d={linePath}
            fill="none"
            stroke="#00A3FF"
            strokeWidth="3.25"
            strokeLinecap="round"
            filter="url(#profolioGlow)"
            className="animate-chart-draw"
          />

          {/* Small Node Sparks along Spline */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#FFFFFF"
              stroke="#0284C7"
              strokeWidth="2"
              className="transition-all duration-300 hover:scale-150"
            />
          ))}

          {/* X Axis Dates */}
          {points.map((pt, i) => (
            <text key={i} x={pt.x} y={height - 6} textAnchor="middle" fontSize="9.5" fill="#64748B" fontFamily="Inter, sans-serif" fontWeight="500">
              {pt.date}
            </text>
          ))}

          {/* Hitboxes */}
          {points.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - chartW / (points.length * 2)}
              y={paddingY}
              width={chartW / points.length}
              height={chartH}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
            />
          ))}

          {/* Active Hover Dot & Guideline */}
          {activePoint && (
            <g>
              <line x1={activePoint.x} y1={paddingY} x2={activePoint.x} y2={height - paddingY} stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx={activePoint.x} cy={activePoint.y} r="12" fill="#06B6D4" fillOpacity="0.3" className="animate-ping" />
              <circle cx={activePoint.x} cy={activePoint.y} r="6.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="4" />
            </g>
          )}
        </svg>

        {/* Floating Glassmorphic Tooltip */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none px-3.5 py-2.5 rounded-xl bg-[#0F172A]/95 backdrop-blur-md text-white text-xs font-semibold shadow-2xl -translate-x-1/2 -translate-y-full transition-all duration-150 border border-[#06B6D4]/40"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
              marginTop: '-14px',
            }}
          >
            <div className="text-[10px] text-cyan-300 font-normal flex items-center justify-between gap-3 mb-1">
              <span>{activePoint.date} ({viewMode})</span>
              <span className="text-[#10B981] font-bold">↑ +14.2%</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-cyan-glow animate-pulse" />
              <span className="capitalize">{activeMetric}:</span>
              <span className="font-bold text-[#38BDF8]">{activePoint.val.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Backwards compatibility export
export const MainAnalyticsChart = ProfolioListingPerformanceChart;
export const PurpleLineChart = DirectLeadsOverTimeChart;
