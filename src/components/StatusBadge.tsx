import React from 'react';
import { LeadStatus, CallOutcome } from '../types';

interface StatusBadgeProps {
  status: LeadStatus | CallOutcome | 'ACTIVE' | 'PAUSED' | 'DRAFT' | 'SCHEDULED' | 'COMPLETED' | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const s = status.toUpperCase();

  let colorClasses = 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
  let dotColor = 'bg-[#94A3B8]';

  if (s === 'HOT' || s.includes('QUALIFIED') || s === 'ACTIVE') {
    colorClasses = 'bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]';
    dotColor = 'bg-[#06B6D4] shadow-cyan-glow';
  } else if (s === 'WARM' || s.includes('FOLLOW UP') || s === 'SCHEDULED') {
    colorClasses = 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]';
    dotColor = 'bg-[#0284C7]';
  } else if (s === 'CALLBACK') {
    colorClasses = 'bg-[#EEF2FF] text-[#6366F1] border-[#C7D2FE]';
    dotColor = 'bg-[#6366F1]';
  } else if (s === 'DNC' || s.includes('DNC') || s.includes('NOT INTERESTED')) {
    colorClasses = 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]';
    dotColor = 'bg-[#EF4444]';
  } else if (s === 'COLD' || s === 'PAUSED' || s === 'DRAFT') {
    colorClasses = 'bg-[#F8FAFC] text-[#64748B] border-[#E2EEF8]';
    dotColor = 'bg-[#94A3B8]';
  }

  const paddingClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-lg border tracking-tight transition-colors ${paddingClasses} ${colorClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="capitalize">{status.toLowerCase()}</span>
    </span>
  );
};
