import React, { useState } from 'react';
import { CallRecord, Lead } from '../types';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { WaveformPlayer } from './WaveformPlayer';
import {
  Activity,
  Clock,
  Code2,
  PhoneOff,
  Tag,
  ListOrdered,
  CheckSquare,
  FileText,
  Smile,
  Phone,
  PhoneForwarded,
  UserCheck,
  Copy,
  Check,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Download,
  CalendarCheck,
  Maximize2,
  X,
  Bot,
  User,
  Sparkles,
  ShieldCheck,
  Share2
} from 'lucide-react';

interface CallIntelligenceDetailProps {
  call: CallRecord;
  onClose?: () => void;
  isDrawer?: boolean;
  onExpand?: () => void;
}

export const CallIntelligenceDetail: React.FC<CallIntelligenceDetailProps> = ({
  call,
  onClose,
  isDrawer = false,
  onExpand,
}) => {
  const { openScheduleCallbackModal, leads, navigate } = useApp();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'details' | 'transcript'>('details');
  const [copiedUuid, setCopiedUuid] = useState(false);
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);

  // Derive full fallback telemetry if not explicitly stored
  const telemetry = call.telemetry || {
    callLatencySec: 0.599,
    firstUtteranceSec: 0.49,
    callDurationSec: call.durationSec || 91,
    callStartedAtFormatted: '22 Sep 2026, 02:16 PM',
    callEndedAtFormatted: '22 Sep 2026, 02:18 PM',
    fromNumber: '+91 80 3170 5928',
    costInr: 12.0,
    origin: 'API',
    callStatusReason: 'agent_hangup',
    classification: 'selling_later_followup_scheduled',
    customVariables: [
      { key: 'callee_name', label: 'Callee Name', type: 'string', value: call.ownerName || 'divyraj' },
      { key: 'mobile_number', label: 'Mobile Number', type: 'string', value: call.phoneNumber || '+919664794884' },
      { key: 'property_address', label: 'Property Address', type: 'string', value: `${call.propertyAddress}, ${call.propertyLocality}` },
      { key: 'property_type', label: 'Property Type', type: 'string', value: call.propertyType || '3 BHK' },
      { key: 'target_valuation', label: 'Target Price Expectation', type: 'string', value: call.extractedData.expectedPrice || '₹1.50 Crore (~1.5M)' },
      { key: 'occupancy', label: 'Occupancy State', type: 'string', value: call.extractedData.occupancy || 'Owner-Occupied' },
    ],
    keyPoints: [
      `Owner: ${call.ownerName}, property investor currently living in the residence.`,
      `Owner’s target selling price: ${call.extractedData.expectedPrice || 'around 1.5 million (₹1.50 Cr)'}.`,
      'Owner is not interested in selling at the moment but is receptive to verified market updates.',
      'Agent pitched a quick 5-minute market update with a local real estate specialist.',
      "Owner agreed to receive the market update and a specialist will call around the time described as 'morning before two PM'.",
    ],
    actionItems: [
      `Arrange a 5-minute market update call with a local specialist for the morning before 2 PM (interpreted as ${call.extractedData.callbackTimeWindow || '2026-09-23 14:00:00 IST'}).`,
      'Specialist to share recent building sales data and a realistic price range during the call; no obligation on owner.',
    ],
    summaryNarrative:
      call.extractedData.aiNotes ||
      `VoiceOS contacted ${call.ownerName} regarding selling a property that is currently his residence but was originally an investment. He is not currently selling but provided a target price (~1.5M / ₹1.5 Cr) for consideration. He agreed to a brief market update from a local specialist, with a live callback scheduled for the morning before 2 PM (interpreted as 2026-09-23 14:00:00 IST).`,
    sentimentLabel: 'neutral' as const,
    sentimentReason: 'Owner was polite and not interested in selling now but receptive to a future market update.',
    callbackRequested: false,
    callbackRequestedTime: 'NA',
    callbackRequestedViaHuman: true,
  };

  const callUuid = call.callUuid || `${call.id.replace('call-', '')}a0c84b-9b72-76c1-a0fb-0686ad223150`;

  const copyCallId = () => {
    navigator.clipboard.writeText(callUuid);
    setCopiedUuid(true);
    showToast('Call ID Copied', callUuid, 'success');
    setTimeout(() => setCopiedUuid(false), 2000);
  };

  const handleCopyTranscript = () => {
    const text = call.transcript.map((t) => `[${t.timestamp}] ${t.speakerName}: ${t.text}`).join('\n');
    navigator.clipboard.writeText(text);
    showToast('Transcript Copied', 'Full conversation transcript copied to clipboard.', 'success');
  };

  const correspondingLead: Lead = leads.find((l) => l.ownerName === call.ownerName) || {
    id: `lead-tmp-${call.id}`,
    ownerName: call.ownerName,
    phone: call.phoneNumber,
    status: call.leadStatus,
    propertyType: call.propertyType,
    locality: call.propertyLocality,
    city: call.propertyCity,
    expectedPrice: call.extractedData.expectedPrice || '₹1.50 Cr',
    estimatedMarketPrice: '₹1.40 - ₹1.55 Cr',
    occupancy: (call.extractedData.occupancy as any) || 'Owner-Occupied',
    sellingTimeline: call.extractedData.sellingTimeline || '2 to 3 months',
    qualificationScore: call.extractedData.qualificationScore,
    lastContactedAt: call.callDate,
    assignedAgentName: call.agentName,
    notes: telemetry.summaryNarrative,
    totalCallsMade: 1,
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEF1] shadow-card flex flex-col overflow-hidden text-xs w-full">
      {/* 1. Compact Header Bar */}
      <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-[#ECEEF1] space-y-2.5 shrink-0 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-[#111827] tracking-tight">
                  {call.agentName.split('—')[0].trim() || 'VoiceOS Agent'}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#6B7280]">
                <span>{callUuid}</span>
                <button
                  onClick={copyCallId}
                  className="p-0.5 hover:text-[#2563EB] hover:bg-[#F4F5F7] rounded transition-colors cursor-pointer"
                  title="Copy Call ID"
                >
                  {copiedUuid ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => {
                showToast('Link Copied', 'Call review link copied to clipboard.', 'success');
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:border-[#CBD5E1] shadow-subtle transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Share</span>
            </button>

            <button
              onClick={() => openScheduleCallbackModal(correspondingLead)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Schedule Specialist</span>
            </button>
          </div>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] font-bold border border-[#A7F3D0] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Completed
          </span>

          <span className="px-2.5 py-0.5 rounded-lg bg-[#F8F9FA] text-[#4B5563] font-semibold border border-[#E5E7EB]">
            From <span className="font-mono text-[#111827] font-bold">{telemetry.fromNumber}</span>
          </span>

          <span className="px-2.5 py-0.5 rounded-lg bg-[#F8F9FA] text-[#4B5563] font-semibold border border-[#E5E7EB]">
            Cost <span className="font-bold text-[#111827]">₹{telemetry.costInr.toFixed(2)}</span>
          </span>

          <span className="px-2.5 py-0.5 rounded-lg bg-[#F8F9FA] text-[#4B5563] font-semibold border border-[#E5E7EB]">
            Origin <span className="font-bold text-[#2563EB]">{telemetry.origin}</span>
          </span>
        </div>
      </div>

      {/* 2. Compact Inline Audio Waveform Bar */}
      <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-[#ECEEF1] bg-[#FAFAFA] shrink-0">
        <WaveformPlayer
          durationSec={telemetry.callDurationSec}
          durationFormatted={call.durationFormatted || `${Math.floor(telemetry.callDurationSec / 60)}m ${telemetry.callDurationSec % 60}s`}
          compact={true}
        />
      </div>

      {/* 3. Compact Tab Navigation Switcher */}
      <div className="px-4 py-2.5 sm:px-5 sm:py-2.5 border-b border-[#ECEEF1] bg-[#F8F9FA] shrink-0">
        <div className="max-w-xs bg-[#E5E7EB] p-0.5 rounded-xl grid grid-cols-2 gap-1">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'details'
                ? 'bg-white text-[#111827] shadow-xs'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Call details
          </button>
          <button
            onClick={() => setActiveTab('transcript')}
            className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'transcript'
                ? 'bg-white text-[#111827] shadow-xs'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Transcript ({call.transcript.length})
          </button>
        </div>
      </div>

      {/* 4. Scrollable Content Area */}
      <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(100vh-310px)] min-h-[420px]">
        {activeTab === 'details' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* LEFT / PRIMARY COLUMN (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Latency & Duration Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Call Latency */}
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827]">
                    <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Call latency</span>
                  </div>
                  <div className="text-lg font-black text-[#111827] tracking-tight">
                    {telemetry.callLatencySec} seconds
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    First utterance began at {telemetry.firstUtteranceSec} seconds.
                  </p>
                </div>

                {/* Call Duration */}
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827]">
                    <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Call duration</span>
                  </div>
                  <div className="text-lg font-black text-[#111827] tracking-tight">
                    {telemetry.callDurationSec} seconds
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    From {telemetry.callStartedAtFormatted} to {telemetry.callEndedAtFormatted}
                  </p>
                </div>
              </div>

              {/* Key Points (Array) */}
              <div className="p-4 rounded-xl bg-white border border-[#ECEEF1] shadow-card space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECEEF1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                    <ListOrdered className="w-4 h-4 text-[#2563EB]" />
                    <span>Key Points</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#E5E7EB]">
                    array
                  </span>
                </div>

                <div className="space-y-2 pt-0.5">
                  {telemetry.keyPoints.map((point, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#ECEEF1] flex items-start gap-2.5">
                      <span className="font-black text-[#2563EB] font-mono text-xs shrink-0">{idx + 1}.</span>
                      <span className="text-xs text-[#1F2937] leading-relaxed font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Items (Array) */}
              <div className="p-4 rounded-xl bg-white border border-[#ECEEF1] shadow-card space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECEEF1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                    <CheckSquare className="w-4 h-4 text-[#16A34A]" />
                    <span>Action Items</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#E5E7EB]">
                    array
                  </span>
                </div>

                <div className="space-y-2 pt-0.5">
                  {telemetry.actionItems.map((action, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-start gap-2.5">
                      <span className="font-black text-[#16A34A] font-mono text-xs shrink-0">{idx + 1}.</span>
                      <span className="text-xs text-[#166534] leading-relaxed font-medium">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary (String) */}
              <div className="p-4 rounded-xl bg-white border border-[#ECEEF1] shadow-card space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECEEF1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                    <FileText className="w-4 h-4 text-[#2563EB]" />
                    <span>Summary</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6B7280] uppercase tracking-wider bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#E5E7EB]">
                    string
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#F8F9FA] border border-[#ECEEF1] text-xs text-[#374151] leading-relaxed font-medium">
                  {telemetry.summaryNarrative}
                </div>
              </div>
            </div>

            {/* RIGHT / SECONDARY COLUMN (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Custom Variables Card */}
              <div className="p-4 rounded-xl bg-white border border-[#ECEEF1] shadow-card space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECEEF1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                    <Code2 className="w-4 h-4 text-[#2563EB]" />
                    <span>Custom variables</span>
                  </div>
                </div>

                <div className="space-y-2 pt-0.5">
                  {telemetry.customVariables.map((cv, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#ECEEF1] space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#111827] text-xs">{cv.label}</span>
                        <span className="text-[9px] font-mono text-[#6B7280] uppercase tracking-wider bg-white px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                          {cv.type}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-[#374151] break-all">{cv.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call Status Reason & Classification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Call Status Reason */}
                <div className="p-3.5 rounded-xl bg-white border border-[#ECEEF1] shadow-card space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827]">
                      <PhoneOff className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Call status</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#6B7280] uppercase tracking-wider bg-[#F8F9FA] px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                      string
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F8F9FA] border border-[#ECEEF1] font-mono text-xs font-semibold text-[#111827]">
                    {telemetry.callStatusReason}
                  </div>
                </div>

                {/* Classification */}
                <div className="p-3.5 rounded-xl bg-white border border-[#ECEEF1] shadow-card space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827]">
                      <Tag className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Classification</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#6B7280] uppercase tracking-wider bg-[#F8F9FA] px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                      string
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] font-mono text-xs font-bold text-[#2563EB] truncate">
                    {telemetry.classification}
                  </div>
                </div>
              </div>

              {/* Sentiment Card */}
              <div className="p-4 rounded-xl bg-white border border-[#ECEEF1] shadow-card space-y-1.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECEEF1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                    <Smile className="w-4 h-4 text-[#2563EB]" />
                    <span>Sentiment</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#6B7280] uppercase tracking-wider bg-[#F8F9FA] px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                    string
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#ECEEF1] space-y-0.5">
                  <div className="font-bold text-[#111827] capitalize text-xs">{telemetry.sentimentLabel}</div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{telemetry.sentimentReason}</p>
                </div>
              </div>

              {/* Callback & Dispatch Booleans */}
              <div className="p-4 rounded-xl bg-white border border-[#ECEEF1] shadow-card space-y-2.5">
                <div className="text-xs font-bold text-[#111827] pb-1.5 border-b border-[#ECEEF1]">
                  Callback & Specialist Dispatch
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8F9FA] border border-[#ECEEF1]">
                    <div>
                      <span className="font-bold text-[#111827] block text-xs">Callback Requested</span>
                      <span className="text-[11px] text-[#6B7280] font-mono">{String(telemetry.callbackRequested)}</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#6B7280] uppercase tracking-wider bg-white px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                      boolean
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8F9FA] border border-[#ECEEF1]">
                    <div>
                      <span className="font-bold text-[#111827] block text-xs">Callback Requested Time</span>
                      <span className="text-[11px] text-[#6B7280] font-mono">{telemetry.callbackRequestedTime || 'NA'}</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#6B7280] uppercase tracking-wider bg-white px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                      null
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8F9FA] border border-[#ECEEF1]">
                    <div>
                      <span className="font-bold text-[#111827] block text-xs">Callback Via Human Agent</span>
                      <span className="text-[11px] text-[#16A34A] font-bold font-mono">{String(telemetry.callbackRequestedViaHuman)}</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#6B7280] uppercase tracking-wider bg-white px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                      boolean
                    </span>
                  </div>
                </div>

                {/* Feedback Buttons */}
                <div className="pt-2.5 border-t border-[#ECEEF1] flex items-center justify-between">
                  <span className="text-xs text-[#6B7280] font-medium">Was this log accurate?</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setFeedback(feedback === 'liked' ? null : 'liked')}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        feedback === 'liked'
                          ? 'bg-[#111827] text-white border-[#111827]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F8F9FA]'
                      }`}
                      title="Helpful Log"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setFeedback(feedback === 'disliked' ? null : 'disliked')}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        feedback === 'disliked'
                          ? 'bg-[#111827] text-white border-[#111827]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F8F9FA]'
                      }`}
                      title="Unhelpful Log"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Transcript Tab (Ringg.ai exact chat design) */
          <div className="space-y-4 w-full py-1 px-2 sm:px-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECEEF1]">
              <div>
                <span className="font-bold text-[#111827] text-xs">Conversation Transcript</span>
                <p className="text-[11px] text-[#6B7280]">Real-time synchronized audio dialogue</p>
              </div>
              <button
                onClick={handleCopyTranscript}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#F8F9FA] hover:bg-[#EFF6FF] border border-[#E5E7EB] text-xs font-bold text-[#2563EB] transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Transcript</span>
              </button>
            </div>

            {/* Timeline Milestones Header */}
            <div className="flex flex-col items-center justify-center gap-1.5 select-none py-1">
              <span className="text-[10px] font-medium text-[#9CA3AF] tracking-wide">
                — Pre-Call —
              </span>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[10px] font-semibold text-[#4B5563]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span>Greetings</span>
                <span className="text-[#9CA3AF] font-mono font-normal">~3ms</span>
              </div>

              <span className="text-[10px] font-medium text-[#9CA3AF] tracking-wide">
                — On-Call —
              </span>
            </div>

            {/* Chat Turns Stream */}
            <div className="space-y-3 pt-1">
              {call.transcript.map((t, idx) => {
                const isAi = t.speaker === 'AI';
                // Calculate realistic time string like "02:16:41 PM"
                const startMin = 16;
                const totalSeconds = startMin * 60 + (t.timeSec || idx * 8);
                const displayMin = Math.floor(totalSeconds / 60);
                const displaySec = totalSeconds % 60;
                const formattedTime = `02:${displayMin < 10 ? '0' : ''}${displayMin}:${displaySec < 10 ? '0' : ''}${displaySec} PM`;

                return (
                  <div
                    key={t.id}
                    className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                  >
                    {isAi ? (
                      /* Assistant Speech (Left-aligned) */
                      <div className="max-w-[78%] space-y-0.5">
                        <p className="text-xs sm:text-[13px] font-medium text-[#111827] leading-relaxed">
                          {t.text}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-[#9CA3AF] font-mono">
                          <span>{formattedTime}</span>
                          {t.intentDetected && (
                            <span className="font-sans font-semibold text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.2 rounded border border-[#DBEAFE] text-[9px]">
                              {t.intentDetected}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Callee Speech (Right-aligned bubble) */
                      <div className="max-w-[78%] flex flex-col items-end space-y-0.5">
                        <div className="bg-[#F3F4F6] text-[#111827] px-3.5 py-2 rounded-2xl rounded-tr-xs text-xs sm:text-[13px] font-medium leading-relaxed">
                          {t.text}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[#9CA3AF] font-mono">
                          {t.intentDetected && (
                            <span className="font-sans font-semibold text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.2 rounded border border-[#DBEAFE] text-[9px]">
                              {t.intentDetected}
                            </span>
                          )}
                          <span>{formattedTime}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Feedback Bar */}
            <div className="pt-4 border-t border-[#ECEEF1] flex items-center justify-center">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFeedback(feedback === 'liked' ? null : 'liked')}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    feedback === 'liked'
                      ? 'bg-[#111827] text-white border-[#111827]'
                      : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F8F9FA]'
                  }`}
                  title="Helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFeedback(feedback === 'disliked' ? null : 'disliked')}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    feedback === 'disliked'
                      ? 'bg-[#111827] text-white border-[#111827]'
                      : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F8F9FA]'
                  }`}
                  title="Unhelpful"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
