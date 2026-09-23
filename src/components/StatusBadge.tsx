import React from 'react';
import { LeadStatus, CallOutcome } from '../types';

interface StatusBadgeProps {
  status: LeadStatus | CallOutcome | 'ACTIVE' | 'PAUSED' | 'DRAFT' | 'SCHEDULED' | 'COMPLETED' | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const s = status.toUpperCase();

  let colorClasses = 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]';
  let dotColor = 'bg-[#9CA3AF]';

  if (s === 'HOT' || s.includes('QUALIFIED') || s === 'ACTIVE') {
    colorClasses = 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]';
    dotColor = 'bg-[#10B981]';
  } else if (s === 'WARM' || s.includes('FOLLOW UP') || s === 'SCHEDULED') {
    colorClasses = 'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]';
    dotColor = 'bg-[#2563EB]';
  } else if (s === 'CALLBACK') {
    colorClasses = 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]';
    dotColor = 'bg-[#6366F1]';
  } else if (s === 'DNC' || s.includes('DNC') || s.includes('NOT INTERESTED')) {
    colorClasses = 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]';
    dotColor = 'bg-[#EF4444]';
  } else if (s === 'COLD' || s === 'PAUSED' || s === 'DRAFT') {
    colorClasses = 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]';
    dotColor = 'bg-[#9CA3AF]';
  }

  const paddingClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border tracking-tight transition-colors ${paddingClasses} ${colorClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="capitalize">{status.toLowerCase()}</span>
    </span>
  );
};
