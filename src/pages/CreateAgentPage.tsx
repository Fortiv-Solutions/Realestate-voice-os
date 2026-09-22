import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { agentService } from '../services/agentService';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Bot,
  Sparkles,
  Sliders,
  Phone,
  Target,
  FileCheck2
} from 'lucide-react';

export const CreateAgentPage: React.FC = () => {
  const { navigate, refreshAllData } = useApp();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [name, setName] = useState('Ananya — Thaltej & Bodakdev Resale Agent');
  const [role, setRole] = useState('Premium Property Acquisition & Owner Consultant');
  const [companyName, setCompanyName] = useState('Fortiv Real Estate');
  const [channel, setChannel] = useState<'Voice' | 'WhatsApp' | 'Omnichannel'>('Voice');
  const [type, setType] = useState<'Outbound' | 'Inbound' | 'Blended'>('Outbound');

  // Voice State
  const [voiceName, setVoiceName] = useState('Aditi (Crisp Indian Accent)');
  const [voiceAccent, setVoiceAccent] = useState<'Indian English' | 'Hindi' | 'Gujarati' | 'British English' | 'US English'>('Indian English');
  const [voiceProvider, setVoiceProvider] = useState<'Fish Audio' | 'Sarvam AI' | 'ElevenLabs' | 'Cartesia Sonic'>('Fish Audio');
  const [languages, setLanguages] = useState<string[]>(['English', 'Hindi']);

  // Intelligence State
  const [firstMessage, setFirstMessage] = useState('Hi, is this {{callee_name}}?');
  const [systemPrompt, setSystemPrompt] = useState(`You are Ananya, a consultative property consultant with Fortiv Real Estate.
You are calling {{callee_name}} regarding their property in Thaltej / Bodakdev, Ahmedabad.
Follow natural consultative guidelines:
- Keep turns concise (under 25 words).
- If open to selling: inquire BHK -> target price -> offer specialist 5-minute update.
- If hesitant: inquire occupancy -> investment context -> future target price.
- Adhere strictly to DNC compliance if requested.`);

  // Calling & Telephony
  const [temperature, setTemperature] = useState(0.4);
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [interruptionSensitivity, setInterruptionSensitivity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [maxCallDurationMinutes, setMaxCallDurationMinutes] = useState(8);

  // Qualification Criteria
  const [mustBeOwner, setMustBeOwner] = useState(true);
  const [requireSellingTimeline, setRequireSellingTimeline] = useState(true);
  const [requireExpectedPrice, setRequireExpectedPrice] = useState(true);
  const [minimumBudget, setMinimumBudget] = useState('₹75 Lakhs');

  const steps = [
    { num: 1, title: 'Basic Info', icon: Bot },
    { num: 2, title: 'Voice', icon: Sliders },
    { num: 3, title: 'Intelligence', icon: Sparkles },
    { num: 4, title: 'Calling', icon: Phone },
    { num: 5, title: 'Qualification', icon: Target },
    { num: 6, title: 'Review', icon: FileCheck2 },
  ];

  const handleCreate = () => {
    agentService.createAgent({
      name,
      role,
      companyName,
      status: 'ACTIVE',
      channel,
      type,
      voiceId: 'voice-custom',
      voiceName,
      voiceAccent,
      voiceProvider,
      languages,
      systemPrompt,
      firstMessage,
      temperature,
      speechSpeed,
      interruptionSensitivity,
      maxCallDurationMinutes,
      qualificationCriteria: {
        mustBeOwner,
        requireSellingTimeline,
        requireExpectedPrice,
        minimumBudget,
      },
    });

    refreshAllData();
    showToast('Agent Created Successfully', `${name} is ready for test calls and campaigns.`, 'success');
    navigate('/agents');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/agents')}
          className="p-2 rounded-xl border border-[#E2EEF8] text-[#64748B] hover:text-[#0F172A] hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">Create AI Voice Agent</h2>
          <p className="text-xs text-[#64748B]">Configure persona, voice model, conversational intelligence, and qualification gates</p>
        </div>
      </div>

      {/* 6-Step Stepper */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2EEF8] shadow-card">
        <div className="grid grid-cols-6 gap-2">
          {steps.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <button
                key={step.num}
                onClick={() => isCompleted && setCurrentStep(step.num)}
                className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7]'
                    : isCompleted
                    ? 'bg-[#F0F7FD] text-[#0F172A]'
                    : 'text-[#94A3B8] opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
                    isCompleted
                      ? 'bg-[#0284C7] text-white'
                      : isCurrent
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#06B6D4] text-white shadow-cyan-glow'
                      : 'bg-[#E2EEF8] text-[#64748B]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.num}
                </div>
                <span className="text-[11px] font-bold truncate w-full">{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Content Area */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card min-h-[380px] flex flex-col justify-between">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Step 1: Agent Identification</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Agent Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Role / Job Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">Company / Agency Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">Call Channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                  >
                    <option value="Voice">Voice Calling</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Omnichannel">Omnichannel</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Voice & Persona */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Step 2: Voice & Accent</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">Voice Accent</label>
                  <select
                    value={voiceAccent}
                    onChange={(e) => setVoiceAccent(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                  >
                    <option value="Indian English">Indian English (Natural Consultative)</option>
                    <option value="Hindi">Hindi / Hinglish</option>
                    <option value="Gujarati">Gujarati / English Mix</option>
                    <option value="British English">British English (Dubai Broker Accent)</option>
                    <option value="US English">US English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">TTS Provider</label>
                  <select
                    value={voiceProvider}
                    onChange={(e) => setVoiceProvider(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                  >
                    <option value="Fish Audio">Fish Audio (Ultra-low latency)</option>
                    <option value="Sarvam AI">Sarvam AI (Indian Vernacular)</option>
                    <option value="ElevenLabs">ElevenLabs (High-fidelity)</option>
                    <option value="Cartesia Sonic">Cartesia Sonic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Voice Persona</label>
                <input
                  type="text"
                  value={voiceName}
                  onChange={(e) => setVoiceName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Intelligence & Prompt */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Step 3: Conversational Prompt</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">First Message (Under 6 words)</label>
                <input
                  type="text"
                  value={firstMessage}
                  onChange={(e) => setFirstMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">System Instructions</label>
                <textarea
                  rows={8}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-mono text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Calling Settings */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Step 4: Real-Time Telephony Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Temperature ({temperature})</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Speech Speed ({speechSpeed}x)</label>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.02"
                  value={speechSpeed}
                  onChange={(e) => setSpeechSpeed(Number(e.target.value))}
                  className="w-full accent-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Interruption Sensitivity</label>
                <select
                  value={interruptionSensitivity}
                  onChange={(e) => setInterruptionSensitivity(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Max Call Duration (Minutes)</label>
                <input
                  type="number"
                  value={maxCallDurationMinutes}
                  onChange={(e) => setMaxCallDurationMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Lead Qualification */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Step 5: Qualification Criteria</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] cursor-pointer hover:bg-[#F0F7FD] transition-colors">
                <input
                  type="checkbox"
                  checked={mustBeOwner}
                  onChange={(e) => setMustBeOwner(e.target.checked)}
                  className="rounded text-[#0284C7] focus:ring-[#06B6D4]"
                />
                <span className="text-xs text-[#0F172A] font-medium">Require callee to be verified property owner</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] cursor-pointer hover:bg-[#F0F7FD] transition-colors">
                <input
                  type="checkbox"
                  checked={requireSellingTimeline}
                  onChange={(e) => setRequireSellingTimeline(e.target.checked)}
                  className="rounded text-[#0284C7] focus:ring-[#06B6D4]"
                />
                <span className="text-xs text-[#0F172A] font-medium">Require selling timeline extraction</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] cursor-pointer hover:bg-[#F0F7FD] transition-colors">
                <input
                  type="checkbox"
                  checked={requireExpectedPrice}
                  onChange={(e) => setRequireExpectedPrice(e.target.checked)}
                  className="rounded text-[#0284C7] focus:ring-[#06B6D4]"
                />
                <span className="text-xs text-[#0F172A] font-medium">Require owner target expected price</span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Minimum Budget Threshold</label>
                <input
                  type="text"
                  value={minimumBudget}
                  onChange={(e) => setMinimumBudget(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#06B6D4]/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Review & Final Confirmation */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Step 6: Review & Launch</h3>
            <div className="p-4 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] space-y-2 text-xs">
              <div className="flex justify-between pb-1.5 border-b border-[#E2EEF8]">
                <span className="text-[#64748B]">Agent Name:</span>
                <span className="font-bold text-[#0F172A]">{name}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E2EEF8]">
                <span className="text-[#64748B]">Voice Profile:</span>
                <span className="font-bold text-[#0284C7]">{voiceName} ({voiceAccent})</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E2EEF8]">
                <span className="text-[#64748B]">Provider:</span>
                <span className="font-bold text-[#06B6D4]">{voiceProvider}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#E2EEF8]">
                <span className="text-[#64748B]">First Utterance:</span>
                <span className="font-medium text-[#0F172A]">"{firstMessage}"</span>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E2EEF8] mt-6">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 rounded-xl border border-[#E2EEF8] text-xs font-semibold text-[#64748B] hover:text-[#0F172A] disabled:opacity-30 transition-colors"
          >
            Previous Step
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 6))}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 active:scale-98"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCreate}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/25 transition-all active:scale-98"
            >
              Deploy Agent
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
