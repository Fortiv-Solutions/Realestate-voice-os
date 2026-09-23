import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { agentService } from '../services/agentService';
import { StatusBadge } from '../components/StatusBadge';
import {
  Bot,
  ArrowLeft,
  Sparkles,
  Phone,
  Sliders,
  FileText,
  BookOpen,
  PhoneCall,
  BarChart3,
  Settings,
  Save,
  Check,
  ShieldCheck,
  Volume2
} from 'lucide-react';

export const AgentDetailPage: React.FC<{ agentId: string }> = ({ agentId }) => {
  const { agents, navigate, openTestCallModal, refreshAllData } = useApp();
  const { showToast } = useToast();

  const agent = agents.find((a) => a.id === agentId) || agents[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'prompt' | 'knowledge' | 'calls' | 'analytics' | 'settings'>('overview');

  // Edit states
  const [systemPrompt, setSystemPrompt] = useState(agent?.systemPrompt || '');
  const [firstMessage, setFirstMessage] = useState(agent?.firstMessage || '');
  const [temperature, setTemperature] = useState(agent?.temperature || 0.4);
  const [speechSpeed, setSpeechSpeed] = useState(agent?.speechSpeed || 1.0);
  const [interruptionSensitivity, setInterruptionSensitivity] = useState(agent?.interruptionSensitivity || 'Medium');

  if (!agent) {
    return (
      <div className="p-8 text-center">
        <p className="text-xs text-[#6B7280]">Agent not found</p>
        <button onClick={() => navigate('/agents')} className="mt-2 text-xs font-bold text-[#2563EB]">
          Back to Agents
        </button>
      </div>
    );
  }

  const handleSavePrompt = () => {
    agentService.updateAgent(agent.id, {
      systemPrompt,
      firstMessage,
      temperature,
      speechSpeed,
      interruptionSensitivity,
    });
    refreshAllData();
    showToast('Agent Updated', 'Prompt and voice parameters saved successfully.', 'success');
  };

  const handleToggleStatus = () => {
    agentService.toggleAgentStatus(agent.id);
    refreshAllData();
    showToast('Status Changed', `Agent is now ${agent.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE'}.`, 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header with Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/agents')}
            className="p-2 rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#111827] hover:border-[#CBD5E1] hover:bg-[#F4F5F7] transition-colors shadow-subtle flex items-center justify-center cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">{agent.name}</h2>
              <StatusBadge status={agent.status} size="sm" />
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5">{agent.role} • {agent.companyName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToggleStatus}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              agent.status === 'ACTIVE'
                ? 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:border-[#CBD5E1]'
                : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
            }`}
          >
            {agent.status === 'ACTIVE' ? 'Pause Agent' : 'Activate Agent'}
          </button>

          <button
            onClick={() => openTestCallModal(agent.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Test Call</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB] shadow-card overflow-x-auto">
        {(
          [
            { id: 'overview', label: 'Overview', icon: Bot },
            { id: 'prompt', label: 'Prompt & Logic', icon: FileText },
            { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
            { id: 'calls', label: 'Calls & Transcripts', icon: PhoneCall },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Quick Stats & Voice Specs */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-4">
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Voice Parameters</h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Voice Profile:</span>
                  <span className="font-bold text-[#111827]">{agent.voiceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Accent:</span>
                  <span className="font-semibold text-[#2563EB]">{agent.voiceAccent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Provider Engine:</span>
                  <span className="font-semibold text-[#111827]">{agent.voiceProvider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Languages:</span>
                  <span className="font-medium text-[#111827]">{agent.languages.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Max Call Length:</span>
                  <span className="font-medium text-[#111827]">{agent.maxCallDurationMinutes} mins</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-1">
                <div className="text-[11px] font-bold text-[#111827]">First Utterance (Opening)</div>
                <div className="text-xs text-[#2563EB] font-mono bg-white p-2 rounded-lg border border-[#ECEEF1]">
                  "{agent.firstMessage}"
                </div>
              </div>
            </div>

            {/* Guardrails Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB]">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Active Safety & DNC Rules</span>
              </div>
              <ul className="text-xs text-[#6B7280] space-y-1.5 list-disc list-inside leading-relaxed font-medium">
                <li>Automatic DNC detection with zero pushback</li>
                <li>RERA database disclosure on number origin questions</li>
                <li>Deflection of unverified property valuations to human specialists</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Performance Summary */}
          <div className="lg:col-span-8 space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-4">
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Performance Metrics</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                  <span className="text-[10px] text-[#6B7280] font-semibold block">Lifetime Calls</span>
                  <span className="text-xl font-extrabold text-[#111827]">{agent.metrics.totalCalls.toLocaleString()}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                  <span className="text-[10px] text-[#6B7280] font-semibold block">Answer Rate</span>
                  <span className="text-xl font-extrabold text-[#2563EB]">{agent.metrics.answerRate}%</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                  <span className="text-[10px] text-[#6B7280] font-semibold block">Qualified Leads</span>
                  <span className="text-xl font-extrabold text-[#10B981]">{agent.metrics.qualifiedLeads}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                  <span className="text-[10px] text-[#6B7280] font-semibold block">Calls Today</span>
                  <span className="text-xl font-extrabold text-[#111827]">{agent.metrics.callsToday}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-2">
                <h4 className="text-xs font-bold text-[#111827]">Qualification Criteria</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B7280]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Must verify owner identity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Must extract selling timeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Must inquire expected price</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Minimum budget threshold: {agent.qualificationCriteria.minimumBudget || 'None'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Prompt & Logic Editor */}
      {activeTab === 'prompt' && (
        <div className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECEEF1]">
            <div>
              <h3 className="text-sm font-extrabold text-[#111827]">System Prompt & Logic Engine</h3>
              <p className="text-xs text-[#6B7280] mt-0.5">Fine-tune instructions, objection responses, and intent guidelines</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openTestCallModal(agent.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-xs font-bold border border-[#BFDBFE] transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Test Changes</span>
              </button>

              <button
                onClick={handleSavePrompt}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Prompt</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">First Message</label>
                <input
                  type="text"
                  value={firstMessage}
                  onChange={(e) => setFirstMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">System Instructions</label>
                <textarea
                  rows={14}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-mono text-[#111827] leading-relaxed focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Voice Fine-Tuning Controls */}
            <div className="lg:col-span-4 p-4 rounded-2xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-4">
              <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Voice Fine-Tuning</h4>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#6B7280]">Temperature:</span>
                  <span className="font-bold text-[#111827]">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[#2563EB]"
                />
                <span className="text-[10px] text-[#9CA3AF]">Lower = strictly factual; Higher = natural conversational</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#6B7280]">Speaking Speed:</span>
                  <span className="font-bold text-[#111827]">{speechSpeed}x</span>
                </div>
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
                <label className="block text-xs font-semibold text-[#6B7280] mb-1">Interruption Sensitivity</label>
                <select
                  value={interruptionSensitivity}
                  onChange={(e) => setInterruptionSensitivity(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                >
                  <option value="Low">Low (Speaks through background noise)</option>
                  <option value="Medium">Medium (Balanced real-time conversational)</option>
                  <option value="High">High (Immediate pause on user speech)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {activeTab !== 'overview' && activeTab !== 'prompt' && (
        <div className="p-8 rounded-2xl bg-white border border-[#ECEEF1] text-center space-y-2 shadow-card">
          <h3 className="text-xs font-bold text-[#111827] capitalize">{activeTab} section loaded</h3>
          <p className="text-xs text-[#6B7280]">Configuration and telemetry for {agent.name} are active.</p>
        </div>
      )}
    </div>
  );
};
