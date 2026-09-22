import React, { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtext?: string;
  icon?: ReactNode;
  badge?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  subtext,
  icon,
  badge,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 sm:p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card hover:border-[#BAE6FD] hover:shadow-cyan-glow/20 transition-all flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2 min-w-0">
        <span className="text-xs font-semibold text-[#64748B] tracking-wide truncate">{title}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          {badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">
              {badge}
            </span>
          )}
          {icon && <div className="text-[#0284C7]">{icon}</div>}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2 min-w-0">
        <div className="text-2xl font-extrabold tracking-tight text-[#0F172A] leading-none">{value}</div>

        {change && (
          <div
            className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 ${
              changeType === 'positive'
                ? 'bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]'
                : changeType === 'negative'
                ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]'
                : 'bg-[#F1F5F9] text-[#64748B]'
            }`}
          >
            {changeType === 'positive' && <ArrowUpRight className="w-3 h-3" />}
            {changeType === 'negative' && <ArrowDownRight className="w-3 h-3" />}
            {changeType === 'neutral' && <Minus className="w-3 h-3" />}
            <span>{change}</span>
          </div>
        )}
      </div>

      {subtext && <p className="text-[11px] text-[#94A3B8] mt-2 font-medium truncate">{subtext}</p>}
    </div>
  );
};
