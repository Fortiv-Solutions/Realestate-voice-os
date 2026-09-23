import React, { ReactNode } from 'react';
import { ArrowUp, ArrowDown, HelpCircle, Sparkles } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtext?: string;
  icon?: ReactNode;
  badge?: string;
  onClick?: () => void;
  breakdown?: {
    label1?: string;
    label2?: string;
    label3?: string;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change = '+12.5%',
  changeType = 'positive',
  subtext,
  icon,
  badge,
  onClick,
  breakdown = {
    label1: '% Ongoing',
    label2: '% Waiting',
    label3: '% Completed',
  },
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card hover:border-[#CBD5E1] hover:shadow-card-hover transition-all flex flex-col justify-between space-y-3 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Top Header: Icon / Title + Help Circle */}
      <div className="flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2 truncate">
          {icon && <div className="text-[#6B7280]">{icon}</div>}
          <span className="text-xs font-semibold text-[#6B7280] tracking-wide truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
              {badge}
            </span>
          )}
          <HelpCircle className="w-3.5 h-3.5 text-[#9CA3AF] hover:text-[#6B7280] cursor-help" />
        </div>
      </div>

      {/* Main Metric Value & Trend Badge */}
      <div className="space-y-1">
        <div className="text-3xl font-extrabold tracking-tight text-[#111827] leading-none">{value}</div>

        <div className="flex items-center gap-1 text-xs font-semibold">
          {changeType === 'positive' && (
            <span className="text-[#10B981] flex items-center gap-0.5 font-bold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{change}</span>
            </span>
          )}
          {changeType === 'negative' && (
            <span className="text-[#EF4444] flex items-center gap-0.5 font-bold">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>{change}</span>
            </span>
          )}
          {changeType === 'neutral' && (
            <span className="text-[#6B7280] font-bold">
              <span>{change || '0.0%'}</span>
            </span>
          )}
          <span className="text-[#9CA3AF] text-[11px] font-medium ml-1">vs last month</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#F0F2F5] pt-2.5">
        {/* 3 Mini Breakdown Columns with Gradient Bars */}
        <div className="grid grid-cols-3 gap-2 text-center pb-2.5 border-b border-[#F0F2F5]">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#111827] block truncate">{breakdown.label1 || '% Ongoing'}</span>
            <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#93C5FD]" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#111827] block truncate">{breakdown.label2 || '% Waiting'}</span>
            <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#67E8F9] to-[#CFFAFE]" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#111827] block truncate">{breakdown.label3 || '% Completed'}</span>
            <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#FDA4AF] to-[#FFE4E6]" />
          </div>
        </div>

        {/* Footer: Sparkle + View Report Link */}
        <div className="flex items-center justify-between pt-2.5 text-[11px]">
          <div className="flex items-center gap-1 text-[#6B7280] font-medium">
            <Sparkles className="w-3 h-3 text-[#2563EB]" />
            <span>{subtext || 'Up from last week!'}</span>
          </div>
          <span className="font-semibold text-[#111827] hover:text-[#2563EB] underline cursor-pointer transition-colors">
            View report
          </span>
        </div>
      </div>
    </div>
  );
};
