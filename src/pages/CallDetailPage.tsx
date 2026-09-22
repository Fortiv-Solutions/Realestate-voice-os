import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/StatusBadge';
import { WaveformPlayer } from '../components/WaveformPlayer';
import {
  ArrowLeft,
  Bot,
  User,
  Building2,
  Calendar,
  Clock,
  Sparkles,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Share2,
  FileText,
  CalendarCheck
} from 'lucide-react';

export const CallDetailPage: React.FC<{ callId: string }> = ({ callId }) => {
  const { calls, navigate, openScheduleCallbackModal, leads } = useApp();
  const { showToast } = useToast();

  const call = calls.find((c) => c.id === callId) || calls[0];

  if (!call) {
    return (
      <div className="p-8 text-center">
        <p className="text-xs text-[#64748B]">Call record not found</p>
        <button onClick={() => navigate('/calls')} className="mt-2 text-xs font-bold text-[#0284C7]">
          Back to Call Logs
        </button>
      </div>
    );
  }

  const correspondingLead = leads.find((l) => l.ownerName === call.ownerName) || {
    id: `lead-tmp-${call.id}`,
    ownerName: call.ownerName,
    phone: call.phoneNumber,
    status: call.leadStatus,
    propertyType: call.propertyType,
    locality: call.propertyLocality,
    city: call.propertyCity,
    expectedPrice: call.extractedData.expectedPrice || '₹1.35 Cr',
    estimatedMarketPrice: '₹1.28 - ₹1.40 Cr',
    occupancy: (call.extractedData.occupancy as any) || 'Owner-Occupied',
    sellingTimeline: call.extractedData.sellingTimeline || '2 to 3 months',
    qualificationScore: call.extractedData.qualificationScore,
    lastContactedAt: call.callDate,
    assignedAgentName: call.agentName,
    notes: call.extractedData.aiNotes || 'Extracted via AI Voice Calling',
    totalCallsMade: 1,
  };

  return (
    <div className="space-y-6 pb-16 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/calls')}
            className="p-2 rounded-xl border border-[#E2EEF8] text-[#64748B] hover:text-[#0F172A] hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-extrabold text-[#0F172A]">{call.ownerName}</h2>
              <StatusBadge status={call.leadStatus} />
              <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                Score: {call.extractedData.qualificationScore}%
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              {call.propertyType} • {call.propertyAddress}, {call.propertyLocality}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              showToast('Transcript Copied', 'Call transcript copied to clipboard.', 'success');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] hover:bg-[#F0F7FD] shadow-card transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Share</span>
          </button>

          <button
            onClick={() => openScheduleCallbackModal(correspondingLead)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Schedule Specialist</span>
          </button>
        </div>
      </div>

      {/* 1. AUDIO RECORDING & WAVEFORM PLAYER */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Call Recording & Waveform</h3>
          <span className="text-[11px] text-[#64748B] font-medium">Agent: {call.agentName.split('—')[0]}</span>
        </div>
        <WaveformPlayer durationSec={call.durationSec} durationFormatted={call.durationFormatted} />
      </div>

      {/* 2. THREE-COLUMN INTELLIGENCE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: AI Executive Summary */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-[#E2EEF8]">
            <Sparkles className="w-4 h-4 text-[#06B6D4]" />
            <span>AI Executive Summary</span>
          </div>
          <p className="text-xs text-[#0F172A] leading-relaxed font-medium">
            {call.extractedData.aiNotes ||
              'Owner was highly engaged and receptive to selling options. Validated living situation and confirmed target expectation.'}
          </p>
          <div className="pt-2 text-[11px] text-[#64748B] space-y-1">
            <div className="flex justify-between">
              <span>Sentiment Score:</span>
              <span className="font-bold text-[#0284C7]">+{(call.sentimentScore * 100).toFixed(0)}% (Positive)</span>
            </div>
            <div className="flex justify-between">
              <span>CRM Status:</span>
              <span className="font-bold text-[#0F172A]">Synced Automatically</span>
            </div>
          </div>
        </div>

        {/* Card 2: Property Specifications */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-[#E2EEF8]">
            <Building2 className="w-4 h-4 text-[#0284C7]" />
            <span>Property Information</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Unit Type:</span>
              <span className="font-bold text-[#0F172A]">{call.propertyType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Carpet Area:</span>
              <span className="font-bold text-[#0F172A]">
                {call.extractedData.propertySizeSqFt ? `${call.extractedData.propertySizeSqFt} sq ft` : '1,850 sq ft'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Occupancy:</span>
              <span className="font-semibold text-[#0F172A]">{call.extractedData.occupancy || 'Owner-Occupied'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Locality:</span>
              <span className="font-semibold text-[#0F172A]">{call.propertyLocality}, {call.propertyCity}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Selling Intelligence & Qualification */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] uppercase tracking-wider pb-2 border-b border-[#E2EEF8]">
            <Clock className="w-4 h-4 text-[#06B6D4]" />
            <span>Selling Intelligence</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Selling Intent:</span>
              <span className="font-bold text-[#0284C7]">{call.extractedData.sellingIntent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Target Price:</span>
              <span className="font-bold text-[#06B6D4]">{call.extractedData.expectedPrice || '₹1.35 Crore'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Timeline:</span>
              <span className="font-semibold text-[#0F172A]">{call.extractedData.sellingTimeline || '2 to 3 months'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Callback Window:</span>
              <span className="font-semibold text-[#0284C7]">{call.extractedData.callbackTimeWindow || 'Morning before 2 PM'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SYNCHRONIZED CONVERSATION TRANSCRIPT */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2EEF8]">
          <div>
            <h3 className="text-sm font-extrabold text-[#0F172A]">Full Conversation Transcript</h3>
            <p className="text-xs text-[#64748B]">Timestamped dialogue with real-time intent extraction</p>
          </div>
          <span className="text-xs font-mono text-[#64748B] bg-[#F8FCFF] px-2.5 py-1 rounded-lg border border-[#E2EEF8]">
            {call.transcript.length} dialogue turns
          </span>
        </div>

        <div className="space-y-3.5 pt-2">
          {call.transcript.map((t) => {
            const isAi = t.speaker === 'AI';
            return (
              <div
                key={t.id}
                className={`p-4 rounded-xl border transition-all ${
                  isAi
                    ? 'bg-[#F8FCFF] border-[#E2EEF8]'
                    : 'bg-[#F0F7FD] border-[#BAE6FD]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                        isAi ? 'bg-[#E0F2FE] text-[#0284C7]' : 'bg-[#BAE6FD] text-[#0F172A]'
                      }`}
                    >
                      {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-bold text-[#0F172A]">{t.speakerName}</span>
                    <span className="text-[10px] text-[#94A3B8] font-mono">[{t.timestamp}]</span>
                  </div>

                  {t.intentDetected && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#ECFEFF] text-[#0891B2] border border-[#A5F3FC]">
                      Intent: {t.intentDetected}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#0F172A] leading-relaxed pl-8">{t.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
