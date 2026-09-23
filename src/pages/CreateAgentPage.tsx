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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/agents')}
          className="p-2 rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#111827] hover:border-[#CBD5E1] hover:bg-[#F4F5F7] transition-colors shadow-xs flex items-center justify-center cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">Create AI Voice Agent</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Configure persona, voice model, conversational intelligence, and qualification gates</p>
        </div>
      </div>

      {/* 6-Step Stepper */}
      <div className="p-2.5 rounded-2xl bg-white border border-[#ECEEF1] shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {steps.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <button
                key={step.num}
                onClick={() => isCompleted && setCurrentStep(step.num)}
                className={`flex items-center justify-center sm:justify-start gap-2.5 p-2.5 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB]'
                    : isCompleted
                    ? 'bg-[#F8F9FA] text-[#111827] hover:bg-[#F4F5F7]'
                    : 'text-[#9CA3AF] opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    isCompleted
                      ? 'bg-[#10B981] text-white'
                      : isCurrent
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-[#E5E7EB] text-[#6B7280]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.num}
                </div>
                <span className="text-xs font-bold truncate">{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Content Area */}
      <div className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-xs flex flex-col justify-between">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Step 1: Agent Identification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Agent Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Role / Job Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Company / Agency Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Call Channel</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                >
                  <option value="Voice">Voice Calling</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Omnichannel">Omnichannel</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Voice & Persona */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Step 2: Voice & Accent</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Voice Persona</label>
                <input
                  type="text"
                  value={voiceName}
                  onChange={(e) => setVoiceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Voice Accent</label>
                <select
                  value={voiceAccent}
                  onChange={(e) => setVoiceAccent(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                >
                  <option value="Indian English">Indian English (Natural Consultative)</option>
                  <option value="Hindi">Hindi / Hinglish</option>
                  <option value="Gujarati">Gujarati / English Mix</option>
                  <option value="British English">British English (Dubai Broker Accent)</option>
                  <option value="US English">US English</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">TTS Provider</label>
                <select
                  value={voiceProvider}
                  onChange={(e) => setVoiceProvider(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                >
                  <option value="Fish Audio">Fish Audio (Ultra-low latency)</option>
                  <option value="Sarvam AI">Sarvam AI (Indian Vernacular)</option>
                  <option value="ElevenLabs">ElevenLabs (High-fidelity)</option>
                  <option value="Cartesia Sonic">Cartesia Sonic</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Intelligence & Prompt */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Step 3: Conversational Prompt</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">First Message (Under 6 words)</label>
                <input
                  type="text"
                  value={firstMessage}
                  onChange={(e) => setFirstMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">System Instructions</label>
                <textarea
                  rows={8}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-mono text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Calling Settings */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Step 4: Real-Time Telephony Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-2">
                <label className="block text-xs font-semibold text-[#111827]">Temperature ({temperature})</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-2">
                <label className="block text-xs font-semibold text-[#111827]">Speech Speed ({speechSpeed}x)</label>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.02"
                  value={speechSpeed}
                  onChange={(e) => setSpeechSpeed(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Interruption Sensitivity</label>
                <select
                  value={interruptionSensitivity}
                  onChange={(e) => setInterruptionSensitivity(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Max Call Duration (Minutes)</label>
                <input
                  type="number"
                  value={maxCallDurationMinutes}
                  onChange={(e) => setMaxCallDurationMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Lead Qualification */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Step 5: Qualification Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                <input
                  type="checkbox"
                  checked={mustBeOwner}
                  onChange={(e) => setMustBeOwner(e.target.checked)}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-xs text-[#111827] font-medium">Require verified owner</span>
              </label>

              <label className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                <input
                  type="checkbox"
                  checked={requireSellingTimeline}
                  onChange={(e) => setRequireSellingTimeline(e.target.checked)}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-xs text-[#111827] font-medium">Extract selling timeline</span>
              </label>

              <label className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                <input
                  type="checkbox"
                  checked={requireExpectedPrice}
                  onChange={(e) => setRequireExpectedPrice(e.target.checked)}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-xs text-[#111827] font-medium">Extract target price</span>
              </label>
            </div>

            <div className="max-w-md pt-2">
              <label className="block text-xs font-semibold text-[#111827] mb-1.5">Minimum Budget Threshold</label>
              <input
                type="text"
                value={minimumBudget}
                onChange={(e) => setMinimumBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
              />
            </div>
          </div>
        )}

        {/* Step 6: Review & Final Confirmation */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Step 6: Review & Launch</h3>
            <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-2.5 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#ECEEF1]">
                <span className="text-[#6B7280]">Agent Name:</span>
                <span className="font-bold text-[#111827]">{name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#ECEEF1]">
                <span className="text-[#6B7280]">Voice Profile:</span>
                <span className="font-bold text-[#2563EB]">{voiceName} ({voiceAccent})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#ECEEF1]">
                <span className="text-[#6B7280]">Provider:</span>
                <span className="font-bold text-[#111827]">{voiceProvider}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#ECEEF1]">
                <span className="text-[#6B7280]">First Utterance:</span>
                <span className="font-medium text-[#111827]">"{firstMessage}"</span>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-[#ECEEF1] mt-6">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:border-[#CBD5E1] disabled:opacity-30 transition-colors cursor-pointer"
          >
            Previous Step
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 6))}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 active:scale-98 cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCreate}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              Deploy Agent
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
