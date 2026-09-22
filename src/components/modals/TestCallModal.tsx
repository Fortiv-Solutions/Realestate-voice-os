import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { aiService } from '../../services/aiService';
import { callService } from '../../services/callService';
import { leadService } from '../../services/leadService';
import { ExtractedPropertyData, TranscriptEntry, PropertyType } from '../../types';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  X,
  Volume2
} from 'lucide-react';

export const TestCallModal: React.FC = () => {
  const { isTestCallOpen, closeTestCallModal, agents, testCallAgentId } = useApp();
  const { showToast } = useToast();

  const [selectedAgentId, setSelectedAgentId] = useState<string>(testCallAgentId || agents[0]?.id || 'agent-1');
  const [calleeName, setCalleeName] = useState('Rajesh Patel');
  const [propertyLocality, setPropertyLocality] = useState('Satellite, Ahmedabad');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDurationSec, setCallDurationSec] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [extractedData, setExtractedData] = useState<ExtractedPropertyData>({
    sellingIntent: 'Undecided',
    qualificationScore: 50,
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  useEffect(() => {
    if (testCallAgentId) {
      setSelectedAgentId(testCallAgentId);
    }
  }, [testCallAgentId]);

  useEffect(() => {
    let timer: any;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDurationSec((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, isAiThinking]);

  if (!isTestCallOpen) return null;

  // Speak AI message using browser speech synthesis if available
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setCallDurationSec(0);
    setExtractedData({
      ownerName: calleeName,
      propertyLocation: propertyLocality,
      sellingIntent: 'Undecided',
      qualificationScore: 50,
    });

    // Generate first greeting message
    const greetingText = selectedAgent?.firstMessage.replace('{{callee_name}}', calleeName) || `Hi, is this ${calleeName}?`;
    const initialEntry: TranscriptEntry = {
      id: `t-${Date.now()}`,
      speaker: 'AI',
      speakerName: selectedAgent?.name.split('—')[0].trim() || 'Rahul',
      text: greetingText,
      timestamp: '00:02',
      timeSec: 2,
      sentiment: 'positive',
    };

    setTranscript([initialEntry]);
    speakText(greetingText);
    showToast('Call Connected', `Connected to ${selectedAgent?.name} testing line`, 'info');
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || userInput).trim();
    if (!text || !isCallActive || isAiThinking) return;

    setUserInput('');
    const userTimestamp = formatSec(callDurationSec);

    const userEntry: TranscriptEntry = {
      id: `t-${Date.now()}`,
      speaker: 'OWNER',
      speakerName: calleeName,
      text,
      timestamp: userTimestamp,
      timeSec: callDurationSec,
      sentiment: 'neutral',
    };

    const newHistory = [...transcript, userEntry];
    setTranscript(newHistory);
    setIsAiThinking(true);

    // Call dynamic AI conversation engine
    setTimeout(() => {
      const response = aiService.generateResponse(
        text,
        newHistory,
        extractedData,
        selectedAgent?.name.split('—')[0].trim() || 'Rahul',
        selectedAgent?.companyName || 'Fortiv Real Estate',
        propertyLocality
      );

      const aiTimestamp = formatSec(callDurationSec + 2);
      const aiEntry: TranscriptEntry = {
        id: `t-${Date.now() + 1}`,
        speaker: 'AI',
        speakerName: selectedAgent?.name.split('—')[0].trim() || 'Rahul',
        text: response.replyText,
        timestamp: aiTimestamp,
        timeSec: callDurationSec + 2,
        sentiment: response.detectedSentiment,
        intentDetected: response.intent,
      };

      const updatedHistory = [...newHistory, aiEntry];
      setTranscript(updatedHistory);
      setIsAiThinking(false);

      // Update extracted data
      const newExtracted: ExtractedPropertyData = {
        ...extractedData,
        ...response.extractedDataDelta,
        ownerName: calleeName,
        propertyLocation: propertyLocality,
        qualificationScore: response.extractedDataDelta.qualificationScore || extractedData.qualificationScore,
      };
      setExtractedData(newExtracted);

      // Trigger text-to-speech
      speakText(response.replyText);

      // If call should terminate (e.g. DNC or Callback booked)
      if (response.shouldEndCall) {
        setTimeout(() => {
          handleEndCall(updatedHistory, newExtracted);
        }, 4000);
      }
    }, 700);
  };

  const handleEndCall = (
    finalTranscript: TranscriptEntry[] = transcript,
    finalExtracted: ExtractedPropertyData = extractedData
  ) => {
    setIsCallActive(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const leadStatus = aiService.evaluateLeadStatus(finalExtracted);
    const durationFmt = formatSec(callDurationSec);

    // Save completed call record to CallService
    const newCall = callService.addCompletedCall({
      agentId: selectedAgent?.id || 'agent-1',
      agentName: selectedAgent?.name || 'Rahul',
      contactId: `contact-sim-${Date.now()}`,
      ownerName: calleeName,
      phoneNumber: '+91 98250 99999',
      propertyAddress: `Property in ${propertyLocality}`,
      propertyLocality,
      propertyCity: 'Ahmedabad',
      propertyType: (finalExtracted.propertyType as PropertyType) || '3 BHK',
      callDate: new Date().toISOString(),
      durationSec: Math.max(callDurationSec, 15),
      durationFormatted: durationFmt,
      outcome:
        leadStatus === 'DNC'
          ? 'Answered - DNC'
          : leadStatus === 'HOT'
          ? 'Answered - Qualified'
          : leadStatus === 'CALLBACK'
          ? 'Answered - Follow Up'
          : 'Answered - Not Interested',
      leadStatus,
      sentimentScore: leadStatus === 'HOT' ? 0.85 : leadStatus === 'DNC' ? -0.8 : 0.5,
      crmSynced: true,
      transcript: finalTranscript,
      extractedData: finalExtracted,
    });

    // Create / Update lead record in LeadService
    leadService.createOrUpdateLeadFromCall(
      calleeName,
      '+91 98250 99999',
      (finalExtracted.propertyType as PropertyType) || '3 BHK',
      propertyLocality,
      finalExtracted.expectedPrice || 'N/A',
      leadStatus,
      finalExtracted.qualificationScore,
      finalExtracted.aiNotes || `Simulator call completed (${durationFmt}). Status: ${leadStatus}`,
      newCall.id
    );

    showToast(
      'Test Call Completed & Synced',
      `Lead marked as ${leadStatus} with score ${finalExtracted.qualificationScore}%. Internal CRM updated.`,
      leadStatus === 'DNC' ? 'danger' : 'success'
    );
  };

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Quick reply test chips
  const quickTestChips = [
    'I am living there myself',
    'Around ₹1.35 Crore',
    '3 BHK Apartment',
    'Not right now, maybe in 3 months',
    'Where did you get my number?',
    'So you do not know the price?',
    'What is the price in the market?',
    'Call me tomorrow morning before 2 PM',
    'Do not call me again and remove my number',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in-50">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-[#E2EEF8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#F0F7FD] via-white to-[#ECFEFF] border-b border-[#E2EEF8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#0284C7] text-white flex items-center justify-center shadow-md shadow-cyan-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-[#0F172A]">Live Voice Calling Simulator</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                  Interactive AI Engine
                </span>
              </div>
              <p className="text-xs text-[#64748B]">Test real-time conversation logic, objection handling & DNC compliance</p>
            </div>
          </div>

          <button
            onClick={closeTestCallModal}
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Call Setup & Live Transcript */}
          <div className="lg:col-span-8 flex flex-col border-r border-[#E2EEF8] bg-white overflow-hidden">
            {/* Setup Controls (When not in call) */}
            {!isCallActive && (
              <div className="p-5 border-b border-[#E2EEF8] bg-[#F8FCFF] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                      AI Agent
                    </label>
                    <select
                      value={selectedAgentId}
                      onChange={(e) => setSelectedAgentId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
                    >
                      {agents.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                      Callee Name
                    </label>
                    <input
                      type="text"
                      value={calleeName}
                      onChange={(e) => setCalleeName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
                      placeholder="e.g. Rajesh Patel"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                      Property Locality
                    </label>
                    <input
                      type="text"
                      value={propertyLocality}
                      onChange={(e) => setPropertyLocality(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
                      placeholder="e.g. Satellite, Ahmedabad"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-ping" />
                    <span>Voice Model: <strong className="text-[#0284C7]">{selectedAgent?.voiceName}</strong></span>
                  </div>

                  <button
                    onClick={handleStartCall}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/25 transition-all active:scale-98"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    <span>Start Live Test Call</span>
                  </button>
                </div>
              </div>
            )}

            {/* Active Call Status Header */}
            {isCallActive && (
              <div className="px-5 py-3.5 bg-gradient-to-r from-[#E0F2FE] to-[#ECFEFF] border-b border-[#BAE6FD] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Animated Wave Bars */}
                  <div className="flex items-end gap-0.5 h-5">
                    <span className="w-1 bg-[#0284C7] rounded-full animate-wave-1 h-3" />
                    <span className="w-1 bg-[#06B6D4] rounded-full animate-wave-2 h-5" />
                    <span className="w-1 bg-[#0284C7] rounded-full animate-wave-3 h-2" />
                    <span className="w-1 bg-[#06B6D4] rounded-full animate-wave-4 h-4" />
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-[#0F172A] flex items-center gap-2">
                      <span>Call with {calleeName}</span>
                      <span className="font-mono text-xs text-[#0284C7] font-bold">[{formatSec(callDurationSec)}]</span>
                    </div>
                    <p className="text-[10px] text-[#64748B]">Agent: {selectedAgent?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
                      isMuted ? 'bg-[#FEF2F2] border-[#FECACA] text-[#EF4444]' : 'bg-white border-[#E2EEF8] text-[#64748B]'
                    }`}
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleEndCall()}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <PhoneOff className="w-3.5 h-3.5" />
                    <span>End Call</span>
                  </button>
                </div>
              </div>
            )}

            {/* Live Chat & Transcript Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white custom-scrollbar max-h-[380px]">
              {transcript.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#94A3B8]">
                  <Bot className="w-10 h-10 mb-2 opacity-40 text-[#0284C7]" />
                  <p className="text-xs font-bold text-[#475569]">No active call session</p>
                  <p className="text-[11px] text-[#94A3B8] max-w-xs mt-1">
                    Click "Start Live Test Call" above to test real-time conversational flows.
                  </p>
                </div>
              ) : (
                transcript.map((t) => {
                  const isAi = t.speaker === 'AI';
                  return (
                    <div key={t.id} className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}>
                      {isAi && (
                        <div className="w-7 h-7 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 border border-[#BAE6FD]">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs ${
                        isAi
                          ? 'bg-[#F8FCFF] border border-[#E2EEF8] text-[#0F172A]'
                          : 'bg-gradient-to-r from-[#0284C7] to-[#06B6D4] text-white shadow-md shadow-cyan-500/20'
                      }`}>
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <span className={`text-[10px] font-extrabold ${isAi ? 'text-[#0284C7]' : 'text-white/95'}`}>
                            {t.speakerName}
                          </span>
                          <span className={`text-[9px] ${isAi ? 'text-[#94A3B8]' : 'text-white/75'}`}>
                            {t.timestamp}
                          </span>
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap font-medium">{t.text}</p>

                        {t.intentDetected && (
                          <div className="mt-1.5 pt-1.5 border-t border-black/5 flex items-center gap-1.5 text-[9px] text-[#0891B2] font-bold">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Intent: {t.intentDetected}</span>
                          </div>
                        )}
                      </div>

                      {!isAi && (
                        <div className="w-7 h-7 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 font-bold text-xs">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-[#64748B] bg-[#F0F7FD] p-2.5 rounded-xl w-fit border border-[#E2EEF8]">
                  <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#0284C7] animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-[#64748B] ml-1 font-medium">AI is analyzing context & generating response...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Test Chips */}
            {isCallActive && (
              <div className="p-2.5 bg-[#F8FCFF] border-t border-[#E2EEF8] overflow-x-auto custom-scrollbar flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider shrink-0 mr-1">
                  Test Chips:
                </span>
                {quickTestChips.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(chip)}
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-[#E2EEF8] hover:border-[#0284C7] text-[11px] text-[#0F172A] hover:bg-[#E0F2FE] hover:text-[#0284C7] font-medium transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* User Utterance Input Bar */}
            {isCallActive && (
              <div className="p-3 bg-white border-t border-[#E2EEF8] flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type simulated owner response or click a test chip above..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
                  disabled={isAiThinking}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!userInput.trim() || isAiThinking}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] disabled:opacity-40 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Lead Intelligence & Extracted Data */}
          <div className="lg:col-span-4 bg-[#F8FCFF] p-5 overflow-y-auto space-y-4">
            <div>
              <h4 className="text-xs font-extrabold text-[#0F172A] flex items-center gap-1.5 uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Real-Time Intelligence</span>
              </h4>
              <p className="text-[10px] text-[#64748B] mt-0.5">Live CRM entity extraction & score</p>
            </div>

            {/* Qualification Score Meter */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#64748B]">Qualification Score</span>
                <span className="font-extrabold text-[#0284C7]">{extractedData.qualificationScore}%</span>
              </div>
              <div className="w-full bg-[#F0F7FD] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#06B6D4] to-[#0284C7] h-full rounded-full transition-all duration-500 shadow-cyan-glow"
                  style={{ width: `${extractedData.qualificationScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-[#94A3B8] font-semibold">
                <span>Cold (0%)</span>
                <span>Warm (50%)</span>
                <span>Hot (80%+)</span>
              </div>
            </div>

            {/* Extracted Fields Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-2.5">
              <div className="text-[11px] font-bold text-[#0F172A] pb-1 border-b border-[#E2EEF8]">
                Extracted Property Specifications
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Property:</span>
                  <span className="font-bold text-[#0F172A]">{extractedData.propertyType || 'Detecting...'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Occupancy:</span>
                  <span className="font-bold text-[#0F172A]">{extractedData.occupancy || 'Detecting...'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Expected Price:</span>
                  <span className="font-extrabold text-[#0284C7]">{extractedData.expectedPrice || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Selling Timeline:</span>
                  <span className="font-semibold text-[#0F172A]">{extractedData.sellingTimeline || extractedData.sellingIntent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Callback Window:</span>
                  <span className="font-bold text-[#0891B2]">{extractedData.callbackTimeWindow || 'None'}</span>
                </div>
                {extractedData.dncRequested && (
                  <div className="p-2 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] text-[11px] font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>DNC Blacklist Flagged</span>
                  </div>
                )}
              </div>
            </div>

            {/* Active Guardrails Pill */}
            <div className="p-3.5 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] text-xs text-[#0F172A] space-y-1">
              <div className="flex items-center gap-1.5 font-extrabold text-[#0284C7]">
                <ShieldCheck className="w-4 h-4" />
                <span>Active Safety Guardrails</span>
              </div>
              <ul className="text-[10px] text-[#475569] space-y-0.5 list-disc list-inside font-medium">
                <li>Zero-hallucination valuation defense</li>
                <li>RERA database attribution on number query</li>
                <li>Instant non-combative DNC compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
