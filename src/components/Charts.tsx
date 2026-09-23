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
      color: '#2563EB',
      unit: 'leads',
      total: '19,621',
      avg: '654/day',
    },
    'WhatsApp': {
      data: [380, 460, 430, 560, 640, 610, 670, 730],
      yMarks: [750, 375, 0],
      color: '#38BDF8',
      unit: 'WhatsApp msgs',
      total: '17,600',
      avg: '586/day',
    },
    'Calls': {
      data: [42, 48, 45, 58, 65, 62, 68, 74],
      yMarks: [80, 40, 0],
      color: '#2563EB',
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
        <div className="flex items-center p-1 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB]">
          {(['All leads', 'WhatsApp', 'Calls', 'Email'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => handleChannelSelect(filter)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 relative ${
                internalChannel === filter
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {internalChannel === filter && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                )}
                <span>{filter}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#6B7280] font-semibold">
          <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Total: <strong className="text-[#2563EB] font-bold">{activeSet.total}</strong></span>
          <span>•</span>
          <span>Avg: <strong className="text-[#111827]">{activeSet.avg}</strong></span>
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
              <stop offset="0%" stopColor={activeSet.color} stopOpacity="0.18" />
              <stop offset="60%" stopColor={activeSet.color} stopOpacity="0.04" />
              <stop offset="100%" stopColor={activeSet.color} stopOpacity="0.0" />
            </linearGradient>

            <filter id="leadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={activeSet.color} floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Background subtle grid lines */}
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
                  stroke="#ECEEF1"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="9.5"
                  fill="#9CA3AF"
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

          {/* Dynamic Spline Line */}
          <path
            d={path}
            fill="none"
            stroke={activeSet.color}
            strokeWidth="3.2"
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
                fill="#6B7280"
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

          {/* Active Hover Highlight & Guideline */}
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
                fillOpacity="0.2"
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

        {/* Calina AI Dark Pill Floating Tooltip */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none px-3 py-1.5 rounded-lg bg-[#18181B] text-white text-xs font-semibold shadow-xl -translate-x-1/2 -translate-y-full transition-all duration-150"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
              marginTop: '-12px',
            }}
          >
            <div className="text-[10px] text-[#9CA3AF] font-normal flex items-center justify-between gap-3 mb-0.5">
              <span>{activePoint.date}</span>
              <span className="text-[#10B981] font-bold">↑ +18.4%</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-white text-xs">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span>{internalChannel}:</span>
              <span className="text-white">{activePoint.val.toLocaleString()} {activeSet.unit}</span>
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
            stroke="#F4F5F7"
            strokeWidth={strokeWidth}
          />
          {/* WhatsApp segment */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#38BDF8"
            strokeWidth={hoveredChannel === 'WhatsApp' ? strokeWidth + 4 : strokeWidth}
            strokeDasharray={`${whatsappStroke} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            className="transition-all duration-300 cursor-pointer hover:stroke-[#0284C7]"
            onMouseEnter={() => setHoveredChannel('WhatsApp')}
            onMouseLeave={() => setHoveredChannel(null)}
          />
          {/* Calls segment */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#2563EB"
            strokeWidth={hoveredChannel === 'Calls' ? strokeWidth + 4 : strokeWidth}
            strokeDasharray={`${callsStroke} ${circumference}`}
            strokeDashoffset={callsOffset}
            strokeLinecap="round"
            className="transition-all duration-300 cursor-pointer hover:stroke-[#1D4ED8]"
            onMouseEnter={() => setHoveredChannel('Calls')}
            onMouseLeave={() => setHoveredChannel(null)}
          />
          {/* Email segment */}
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
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7280]">Total Leads</span>
          <span className="text-base font-black text-[#111827] transition-all duration-200">
            {hoveredChannel
              ? hoveredChannel === 'WhatsApp'
                ? `${whatsappPct}%`
                : hoveredChannel === 'Calls'
                ? `${callsPct}%`
                : `${emailPct}%`
              : total}
          </span>
          <span className="text-[9px] font-semibold text-[#2563EB] transition-all duration-200">
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
              ? 'bg-[#EFF6FF] border border-[#BFDBFE] translate-x-1 shadow-xs'
              : 'hover:bg-[#F8F9FA]'
          }`}
          onMouseEnter={() => setHoveredChannel('WhatsApp')}
          onMouseLeave={() => setHoveredChannel(null)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-xs" />
            <span className="text-xs font-bold text-[#111827]">WhatsApp</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#111827]">{whatsappCount.toLocaleString()}</span>
            <span className="text-[10px] text-[#6B7280] block font-semibold">{whatsappPct}%</span>
          </div>
        </div>

        {/* Calls item */}
        <div
          className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
            hoveredChannel === 'Calls'
              ? 'bg-[#EFF6FF] border border-[#BFDBFE] translate-x-1 shadow-xs'
              : 'hover:bg-[#F8F9FA]'
          }`}
          onMouseEnter={() => setHoveredChannel('Calls')}
          onMouseLeave={() => setHoveredChannel(null)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shadow-xs" />
            <span className="text-xs font-bold text-[#111827]">Voice Calls</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#111827]">{callsCount.toLocaleString()}</span>
            <span className="text-[10px] text-[#6B7280] block font-semibold">{callsPct}%</span>
          </div>
        </div>

        {/* Email item */}
        <div
          className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
            hoveredChannel === 'Email'
              ? 'bg-[#EFF6FF] border border-[#BFDBFE] translate-x-1 shadow-xs'
              : 'hover:bg-[#F8F9FA]'
          }`}
          onMouseEnter={() => setHoveredChannel('Email')}
          onMouseLeave={() => setHoveredChannel(null)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6366F1] shadow-xs" />
            <span className="text-xs font-bold text-[#111827]">Email Inquiries</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#111827]">{emailCount}</span>
            <span className="text-[10px] text-[#6B7280] block font-semibold">{emailPct}%</span>
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
      color: '#2563EB',
      maxVal: 85,
      isPercentage: false,
    },
    'Answering rate': {
      data: [64, 68, 65, 71, 74, 66, 69, 75, 70, 73, 68, 76],
      yMarks: [100, 50, 0],
      unit: '%',
      color: '#38BDF8',
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
        <div className="flex items-center p-1 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB]">
          {(['Total calls', 'Answering rate'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleModeChange(tab)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-300 relative ${
                mode === tab
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-lg border border-[#BFDBFE] shadow-xs">
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
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#ECEEF1" strokeDasharray="3 3" />
                <text x={paddingX - 8} y={y + 3.5} textAnchor="end" fontSize="9" fill="#9CA3AF" fontFamily="Inter, sans-serif" fontWeight="500">
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
              <text key={idx} x={x} y={136} textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="Inter, sans-serif">
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
              <circle cx={activePoint.x} cy={activePoint.y} r="8" fill={activeSet.color} fillOpacity="0.25" />
              <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#FFFFFF" stroke={activeSet.color} strokeWidth="3" />
            </g>
          )}
        </svg>

        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none px-2.5 py-1.5 rounded-xl bg-[#18181B] text-white text-xs font-bold -translate-x-1/2 -translate-y-full shadow-xl"
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
      color: '#2563EB',
      maxVal: 850,
      minVal: 0,
      format: (v: number) => `${v} msgs`,
    },
    'Response rate': {
      data: [98.2, 98.8, 99.1, 99.0, 99.4, 99.2, 99.5, 99.6],
      yMarks: [100, 98, 96],
      unit: '%',
      color: '#38BDF8',
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
        <div className="flex items-center p-1 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB]">
          {(['WhatsApp leads', 'Response rate', 'Response time'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleModeChange(tab)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-300 relative ${
                mode === tab
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-lg border border-[#BFDBFE] shadow-xs">
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
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#ECEEF1" strokeDasharray="3 3" />
                <text x={paddingX - 8} y={y + 3.5} textAnchor="end" fontSize="9" fill="#9CA3AF" fontFamily="Inter, sans-serif" fontWeight="500">
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
              <text key={idx} x={x} y={141} textAnchor="middle" fontSize="9" fill="#6B7280" fontFamily="Inter, sans-serif">
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
              <circle cx={activePoint.x} cy={activePoint.y} r="8" fill={activeSet.color} fillOpacity="0.25" />
              <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#FFFFFF" stroke={activeSet.color} strokeWidth="3" />
            </g>
          )}
        </svg>

        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none px-2.5 py-1.5 rounded-xl bg-[#18181B] text-white text-xs font-bold -translate-x-1/2 -translate-y-full shadow-xl"
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
                <div className="absolute -top-7 bg-[#18181B] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-xl z-30 whitespace-nowrap">
                  {d.day}: {d.answered} Answered ({Math.round((d.answered / d.total) * 100)}%)
                </div>
              )}

              {/* Stacked bar container with staggered grow animation */}
              <div
                style={{ animationDelay: `${i * 80}ms` }}
                className="w-full max-w-[28px] h-24 bg-[#F4F5F7] rounded-lg overflow-hidden flex flex-col justify-end p-0.5 group-hover:ring-2 group-hover:ring-[#2563EB]/40 group-hover:scale-105 transition-all duration-300 animate-bar-grow shadow-xs"
              >
                {/* Unanswered */}
                <div
                  style={{ height: `${unansweredH}%` }}
                  className="w-full bg-[#BFDBFE] rounded-t-sm transition-all duration-500 group-hover:bg-[#93C5FD]"
                />
                {/* Answered */}
                <div
                  style={{ height: `${answeredH}%` }}
                  className="w-full bg-[#2563EB] rounded-b-sm transition-all duration-500 group-hover:bg-[#1D4ED8] shadow-xs"
                />
              </div>

              {/* Day Label */}
              <span className={`text-[10px] font-semibold transition-colors duration-200 ${isHovered ? 'text-[#2563EB] font-bold scale-110' : 'text-[#6B7280]'}`}>
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
                <div className="absolute -top-7 bg-[#18181B] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl z-30 whitespace-nowrap">
                  {h.hour}: {h.calls} calls {h.isPeak ? '🔥' : ''}
                </div>
              )}

              <div
                style={{ animationDelay: `${i * 45}ms` }}
                className="w-full max-w-[20px] h-24 bg-[#F4F5F7] rounded-lg overflow-hidden flex flex-col justify-end p-0.5 group-hover:ring-2 group-hover:ring-[#2563EB]/40 group-hover:scale-105 transition-all duration-300 animate-bar-grow"
              >
                <div
                  style={{ height: `${barHeight}%` }}
                  className={`w-full rounded-md transition-all duration-500 ${
                    h.isPeak
                      ? 'bg-[#2563EB] shadow-xs animate-pulse'
                      : 'bg-[#BFDBFE] hover:bg-[#93C5FD]'
                  }`}
                />
              </div>

              <span className={`text-[9px] font-medium transition-colors duration-200 ${h.isPeak ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'}`}>
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
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB]">
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
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {activeMetric === m.key && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                )}
                <span>{m.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB]">
            <button
              onClick={() => {
                setViewMode('daily');
                setHoveredIdx(null);
                setAnimKey((prev) => prev + 1);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-300 ${
                viewMode === 'daily'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => {
                setViewMode('monthly');
                setHoveredIdx(null);
                setAnimKey((prev) => prev + 1);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-300 ${
                viewMode === 'monthly'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Monthly
            </button>
          </div>

          <button
            onClick={() => setIsLiveAnimating(!isLiveAnimating)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
              isLiveAnimating
                ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB] shadow-sm'
                : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:text-[#2563EB]'
            }`}
          >
            {isLiveAnimating ? <Pause className="w-3.5 h-3.5 fill-current text-[#2563EB]" /> : <Play className="w-3.5 h-3.5 fill-current text-[#2563EB]" />}
            <span>{isLiveAnimating ? 'Live Active' : 'Simulate Stream'}</span>
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
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#2563EB" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
            </linearGradient>

            <filter id="profolioGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#2563EB" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Y Grid */}
          {[0, 0.33, 0.66, 1].map((pct, idx) => {
            const val = Math.round(metricMax - pct * metricMax);
            const y = paddingY + pct * chartH;
            return (
              <g key={idx}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#ECEEF1" strokeDasharray={idx === 3 ? '' : '3 3'} strokeWidth="1" />
                <text x={paddingX - 10} y={y + 3.5} textAnchor="end" fontSize="10" fill="#9CA3AF" fontFamily="Inter, sans-serif" fontWeight="500">
                  {val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Shaded Area with Fade In */}
          <path d={areaPath} fill="url(#cyanBlueGradProfolio)" className="animate-chart-area" />

          {/* Dynamic Spline Line with smooth animation */}
          <path
            d={linePath}
            fill="none"
            stroke="#2563EB"
            strokeWidth="3.5"
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
              stroke="#2563EB"
              strokeWidth="2"
              className="transition-all duration-300 hover:scale-150"
            />
          ))}

          {/* X Axis Dates */}
          {points.map((pt, i) => (
            <text key={i} x={pt.x} y={height - 6} textAnchor="middle" fontSize="9.5" fill="#6B7280" fontFamily="Inter, sans-serif" fontWeight="500">
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
              <line x1={activePoint.x} y1={paddingY} x2={activePoint.x} y2={height - paddingY} stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx={activePoint.x} cy={activePoint.y} r="10" fill="#2563EB" fillOpacity="0.2" />
              <circle cx={activePoint.x} cy={activePoint.y} r="6.5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="4" />
            </g>
          )}
        </svg>

        {/* Floating Calina AI Dark Tooltip */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none px-3.5 py-2 rounded-lg bg-[#18181B] text-white text-xs font-semibold shadow-2xl -translate-x-1/2 -translate-y-full transition-all duration-150"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
              marginTop: '-14px',
            }}
          >
            <div className="text-[10px] text-[#9CA3AF] font-normal flex items-center justify-between gap-3 mb-0.5">
              <span>{activePoint.date} ({viewMode})</span>
              <span className="text-[#10B981] font-bold">↑ +14.2%</span>
            </div>
            <div className="flex items-center gap-2 text-white font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span className="capitalize">{activeMetric}:</span>
              <span className="text-white">{activePoint.val.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 8. CALINA AI PERFORMANCE OVERVIEW SPLINE CHART (Results vs Goal)
// =========================================================================

export const CalinaPerformanceOverviewChart: React.FC<{
  height?: number;
}> = ({ height = 165 }) => {
  const [viewMode, setViewMode] = useState<'Weekly' | 'Monthly'>('Weekly');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const weeklyDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyData = [
    { label: 'Sun', val: 780, date: '08 Feb 2025' },
    { label: 'Mon', val: 620, date: '09 Feb 2025' },
    { label: 'Tue', val: 1278, date: '10 Feb 2025' },
    { label: 'Wed', val: 950, date: '11 Feb 2025' },
    { label: 'Thu', val: 1120, date: '12 Feb 2025' },
    { label: 'Fri', val: 890, date: '13 Feb 2025' },
    { label: 'Sat', val: 1040, date: '14 Feb 2025' },
  ];

  const monthlyData = [
    { label: 'Jan', val: 4200, date: 'Jan 2025' },
    { label: 'Feb', val: 5100, date: 'Feb 2025' },
    { label: 'Mar', val: 6800, date: 'Mar 2025' },
    { label: 'Apr', val: 6200, date: 'Apr 2025' },
    { label: 'May', val: 7900, date: 'May 2025' },
    { label: 'Jun', val: 8400, date: 'Jun 2025' },
    { label: 'Jul', val: 9200, date: 'Jul 2025' },
  ];

  const currentData = viewMode === 'Weekly' ? weeklyData : monthlyData;
  const maxVal = Math.max(...currentData.map((d) => d.val)) * 1.25;

  const width = 620;
  const paddingX = 35;
  const paddingY = 22;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const points = currentData.map((d, i) => {
    const x = paddingX + (i / (currentData.length - 1)) * chartW;
    const y = height - paddingY - (d.val / maxVal) * chartH;
    return { x, y, ...d };
  });

  // Generate smooth spline
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  const areaPath = `${path} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;
  const activePoint = hoveredIdx !== null ? points[hoveredIdx] : null;

  return (
    <div className="space-y-3" onMouseLeave={() => setHoveredIdx(null)}>
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280] font-medium mb-0.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Results vs Goal</span>
          </div>
          <h3 className="text-sm font-extrabold text-[#111827] tracking-tight">Performance Overview</h3>
          <p className="text-[11px] text-[#6B7280]">Monthly break down for the current year</p>
        </div>

        {/* Weekly / Monthly Toggle */}
        <div className="flex items-center p-0.5 rounded-lg bg-[#F4F5F7] border border-[#E5E7EB] self-start">
          <button
            onClick={() => {
              setViewMode('Weekly');
              setHoveredIdx(null);
            }}
            className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md transition-all ${
              viewMode === 'Weekly' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => {
              setViewMode('Monthly');
              setHoveredIdx(null);
            }}
            className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md transition-all ${
              viewMode === 'Monthly' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative pt-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="calinaPerformanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.16" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>

            <filter id="calinaGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#2563EB" floodOpacity="0.28" />
            </filter>
          </defs>

          {/* Subtle Grid line */}
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#ECEEF1" strokeWidth="1" />

          {/* Area */}
          <path d={areaPath} fill="url(#calinaPerformanceGrad)" className="animate-chart-area" />

          {/* Spline Line */}
          <path
            d={path}
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#calinaGlow)"
            className="animate-chart-draw"
          />

          {/* Active Highlight Node on Line */}
          {activePoint && (
            <g>
              <circle cx={activePoint.x} cy={activePoint.y} r="10" fill="#2563EB" fillOpacity="0.18" />
              <circle cx={activePoint.x} cy={activePoint.y} r="5.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
            </g>
          )}

          {/* X Axis Labels */}
          {points.map((pt, i) => (
            <text
              key={i}
              x={pt.x}
              y={height - 6}
              textAnchor="middle"
              fontSize="9.5"
              fill={activePoint?.label === pt.label ? '#111827' : '#9CA3AF'}
              fontFamily="Inter, sans-serif"
              fontWeight={activePoint?.label === pt.label ? '700' : '500'}
            >
              {pt.label}
            </text>
          ))}

          {/* Hitboxes for hover */}
          {points.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - chartW / (points.length * 2)}
              y={0}
              width={chartW / points.length}
              height={height}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
            />
          ))}
        </svg>

        {/* Floating Calina Dark Pill Tooltip */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none px-2.5 py-1 rounded-lg bg-[#18181B] text-white shadow-xl -translate-x-1/2 -translate-y-full transition-all duration-150"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
              marginTop: '-10px',
            }}
          >
            <div className="text-[9px] text-[#9CA3AF] font-normal">{activePoint.date}</div>
            <div className="text-[11px] font-bold text-white tracking-wide">{activePoint.val.toLocaleString()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 9. CALINA AI PEAK CALLING HOURS HISTOGRAM (Vertical Capsule Pill Bars)
// =========================================================================

export const CalinaPeakCallingHoursChart: React.FC = () => {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const yAxisVolume = ['400', '300', '200', '100', '0'];

  const slotsData = [
    { slot: '9-11 AM', heightPct: 58, calls: 232, active: false, label: 'Morning' },
    { slot: '11-1 PM', heightPct: 95, calls: 382, active: true, label: 'Peak Midday' },
    { slot: '1-3 PM', heightPct: 68, calls: 272, active: false, label: 'Afternoon' },
    { slot: '3-5 PM', heightPct: 82, calls: 328, active: false, label: 'Late Afternoon' },
    { slot: '5-7 PM', heightPct: 45, calls: 180, active: false, label: 'Evening' },
  ];

  return (
    <div className="h-full flex flex-col justify-between space-y-3 select-none">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-[#111827] tracking-tight">Peak calling hours</h3>
          <p className="text-[11px] text-[#6B7280]">Call traffic across operating windows</p>
        </div>
        <span className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#DBEAFE]">
          Peak: 11 AM – 4 PM
        </span>
      </div>

      <div className="flex-1 flex gap-2.5 pt-5 items-stretch min-h-[145px]">
        {/* Y Axis Volume */}
        <div className="flex flex-col justify-between pb-5 pt-0.5 text-right text-[10px] font-medium text-[#9CA3AF] shrink-0 select-none">
          {yAxisVolume.map((vol) => (
            <span key={vol} className="leading-none">{vol}</span>
          ))}
        </div>

        {/* Vertical Capsule Bars */}
        <div className="flex-1 flex items-stretch justify-around gap-2 pb-1">
          {slotsData.map((item) => {
            const currentActiveSlot = hoveredSlot || '11-1 PM';
            const isHovered = hoveredSlot === item.slot;
            const isBlue = item.slot === currentActiveSlot;

            return (
              <div
                key={item.slot}
                className="flex flex-col items-center justify-between gap-1.5 h-full flex-1 max-w-[48px] group cursor-pointer relative"
                onMouseEnter={() => setHoveredSlot(item.slot)}
                onMouseLeave={() => setHoveredSlot(null)}
              >
                {/* Tooltip on hover with Peak label & arrow pointer */}
                {isHovered && (
                  <div className="absolute -top-7 z-30 pointer-events-none px-2 py-1 rounded-md bg-[#18181B] text-white text-[9px] font-bold shadow-xl whitespace-nowrap -translate-x-1/2 left-1/2 transition-all flex items-center gap-1">
                    <span>{item.slot}: {item.calls} calls</span>
                    {item.active && (
                      <span className="text-[#60A5FA] font-extrabold flex items-center gap-0.5">
                        <span>🔥</span>
                        <span>Peak</span>
                      </span>
                    )}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#18181B] rotate-45" />
                  </div>
                )}

                {/* Wide Rounded Capsule Pill Container */}
                <div
                  className={`w-full flex-1 rounded-xl flex flex-col justify-end p-0.5 transition-all duration-300 overflow-hidden ${
                    isBlue
                      ? 'bg-[#EFF6FF] ring-2 ring-[#93C5FD] scale-102'
                      : 'bg-[#F4F5F7] group-hover:bg-[#ECEEF2]'
                  }`}
                >
                  <div
                    style={{ height: `${item.heightPct}%` }}
                    className={`w-full rounded-lg transition-all duration-300 ${
                      isBlue
                        ? 'bg-gradient-to-t from-[#2563EB] to-[#3B82F6] shadow-sm'
                        : 'bg-[#E5E7EB] group-hover:bg-[#CBD5E1]'
                    }`}
                  />
                </div>

                {/* Hour time slot label */}
                <span
                  className={`text-[10px] font-semibold transition-colors text-center whitespace-nowrap ${
                    isBlue ? 'text-[#111827] font-bold' : 'text-[#6B7280] group-hover:text-[#111827]'
                  }`}
                >
                  {item.slot}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Backwards compatibility export
export const MainAnalyticsChart = ProfolioListingPerformanceChart;
export const PurpleLineChart = DirectLeadsOverTimeChart;

