import React from 'react';
import { useApp } from '../context/AppContext';
import { CallIntelligenceDetail } from '../components/CallIntelligenceDetail';
import { ArrowLeft } from 'lucide-react';

export const CallDetailPage: React.FC<{ callId: string }> = ({ callId }) => {
  const { calls, navigate } = useApp();

  const call = calls.find((c) => c.id === callId) || calls[0];

  if (!call) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-[#ECEEF1] shadow-card max-w-xl mx-auto mt-10">
        <p className="text-sm font-bold text-[#111827]">Call record not found</p>
        <p className="text-xs text-[#6B7280] mt-1">The requested call ID may have been archived or removed.</p>
        <button
          onClick={() => navigate('/calls')}
          className="mt-4 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          Back to Call Logs
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16 w-full">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/calls')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#E5E7EB] bg-white text-xs font-bold text-[#4B5563] hover:text-[#111827] hover:bg-[#F8F9FA] transition-colors shadow-subtle cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#6B7280]" />
          <span>Back to Call Logs</span>
        </button>
      </div>

      {/* Main Full-Width Intelligence Container */}
      <CallIntelligenceDetail
        call={call}
        isDrawer={false}
      />
    </div>
  );
};
