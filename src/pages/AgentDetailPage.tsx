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
        <p className="text-xs text-[#64748B]">Agent not found</p>
        <button onClick={() => navigate('/agents')} className="mt-2 text-xs font-bold text-[#0284C7]">
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
            className="p-2 rounded-xl border border-[#E2EEF8] text-[#64748B] hover:text-[#0F172A] hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-[#0F172A]">{agent.name}</h2>
              <StatusBadge status={agent.status} size="sm" />
            </div>
            <p className="text-xs text-[#64748B]">{agent.role} • {agent.companyName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToggleStatus}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              agent.status === 'ACTIVE'
                ? 'bg-white border-[#E2EEF8] text-[#64748B] hover:text-[#0F172A]'
                : 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7]'
            }`}
          >
            {agent.status === 'ACTIVE' ? 'Pause Agent' : 'Activate Agent'}
          </button>

          <button
            onClick={() => openTestCallModal(agent.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Test Call</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-white border border-[#E2EEF8] shadow-card overflow-x-auto">
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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#06B6D4] text-white shadow-sm shadow-cyan-500/20'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FD]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
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
            <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Voice Parameters</h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Voice Profile:</span>
                  <span className="font-bold text-[#0F172A]">{agent.voiceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Accent:</span>
                  <span className="font-semibold text-[#0284C7]">{agent.voiceAccent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Provider Engine:</span>
                  <span className="font-semibold text-[#06B6D4]">{agent.voiceProvider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Languages:</span>
                  <span className="font-medium text-[#0F172A]">{agent.languages.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Max Call Length:</span>
                  <span className="font-medium text-[#0F172A]">{agent.maxCallDurationMinutes} mins</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] space-y-1">
                <div className="text-[11px] font-bold text-[#0F172A]">First Utterance (Opening)</div>
                <div className="text-xs text-[#0284C7] font-mono bg-white p-2 rounded-lg border border-[#E2EEF8]">
                  "{agent.firstMessage}"
                </div>
              </div>
            </div>

            {/* Guardrails Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0284C7]">
                <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
                <span>Active Safety & DNC Rules</span>
              </div>
              <ul className="text-xs text-[#64748B] space-y-1.5 list-disc list-inside leading-relaxed font-medium">
                <li>Automatic DNC detection with zero pushback</li>
                <li>RERA database disclosure on number origin questions</li>
                <li>Deflection of unverified property valuations to human specialists</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Performance Summary */}
          <div className="lg:col-span-8 space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-4">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Performance Metrics</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8]">
                  <span className="text-[10px] text-[#64748B] font-semibold block">Lifetime Calls</span>
                  <span className="text-xl font-extrabold text-[#0F172A]">{agent.metrics.totalCalls.toLocaleString()}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8]">
                  <span className="text-[10px] text-[#64748B] font-semibold block">Answer Rate</span>
                  <span className="text-xl font-extrabold text-[#0284C7]">{agent.metrics.answerRate}%</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8]">
                  <span className="text-[10px] text-[#64748B] font-semibold block">Qualified Leads</span>
                  <span className="text-xl font-extrabold text-[#06B6D4]">{agent.metrics.qualifiedLeads}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8]">
                  <span className="text-[10px] text-[#64748B] font-semibold block">Calls Today</span>
                  <span className="text-xl font-extrabold text-[#0F172A]">{agent.metrics.callsToday}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] space-y-2">
                <h4 className="text-xs font-bold text-[#0F172A]">Qualification Criteria</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Must verify owner identity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Must extract selling timeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Must inquire expected price</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0284C7]" />
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
        <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-card space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2EEF8]">
            <div>
              <h3 className="text-sm font-extrabold text-[#0F172A]">System Prompt & Logic Engine</h3>
              <p className="text-xs text-[#64748B]">Fine-tune instructions, objection responses, and intent guidelines</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openTestCallModal(agent.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ECFEFF] hover:bg-[#CFFAFE] text-[#0891B2] text-xs font-bold border border-[#A5F3FC] transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Test Changes</span>
              </button>

              <button
                onClick={handleSavePrompt}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Prompt</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">First Message</label>
                <input
                  type="text"
                  value={firstMessage}
                  onChange={(e) => setFirstMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">System Instructions</label>
                <textarea
                  rows={14}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-mono text-[#0F172A] leading-relaxed focus:outline-hidden focus:border-[#0284C7]"
                />
              </div>
            </div>

            {/* Voice Fine-Tuning Controls */}
            <div className="lg:col-span-4 p-4 rounded-2xl bg-[#F8FCFF] border border-[#E2EEF8] space-y-4">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Voice Fine-Tuning</h4>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#64748B]">Temperature:</span>
                  <span className="font-bold text-[#0F172A]">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[#0284C7]"
                />
                <span className="text-[10px] text-[#94A3B8]">Lower = strictly factual; Higher = natural conversational</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#64748B]">Speaking Speed:</span>
                  <span className="font-bold text-[#0F172A]">{speechSpeed}x</span>
                </div>
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
                <label className="block text-xs font-semibold text-[#64748B] mb-1">Interruption Sensitivity</label>
                <select
                  value={interruptionSensitivity}
                  onChange={(e) => setInterruptionSensitivity(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
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
        <div className="p-8 rounded-2xl bg-white border border-[#E2EEF8] text-center space-y-2 shadow-card">
          <h3 className="text-xs font-bold text-[#0F172A] capitalize">{activeTab} section loaded</h3>
          <p className="text-xs text-[#64748B]">Configuration and telemetry for {agent.name} are active.</p>
        </div>
      )}
    </div>
  );
};
