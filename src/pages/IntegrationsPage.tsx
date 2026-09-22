import React from 'react';
import { useToast } from '../context/ToastContext';
import {
  Puzzle,
  Database,
  GitBranch,
  Volume2,
  Mic,
  PhoneCall,
  Bot,
  CheckCircle2,
  Sliders,
  XCircle
} from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const { showToast } = useToast();

  const integrations = [
    {
      id: 'int-1',
      name: 'Fortiv Internal CRM',
      category: 'CRM',
      provider: 'Native Database Engine',
      status: 'Active',
      description: 'Built-in real estate property, lead, and owner CRM with automatic call record sync.',
      badgeType: 'active',
      icon: Database,
    },
    {
      id: 'int-2',
      name: 'Fortiv Workflow Engine',
      category: 'Automation',
      provider: 'Local Event Bus',
      status: 'Active',
      description: 'Internal event-driven workflow engine executing qualification, DNC enforcement & handoffs.',
      badgeType: 'active',
      icon: GitBranch,
    },
    {
      id: 'int-3',
      name: 'Fish Audio Engine',
      category: 'Voice Synthesis',
      provider: 'Fish Audio WebRTC',
      status: 'Configurable',
      description: 'Ultra-low latency conversational voice synthesis for Indian & UK accents.',
      badgeType: 'configurable',
      icon: Volume2,
    },
    {
      id: 'int-4',
      name: 'Sarvam AI Speech',
      category: 'Vernacular ASR / TTS',
      provider: 'Sarvam AI',
      status: 'Configurable',
      description: 'Indian vernacular speech recognition and translation across Hindi & Gujarati.',
      badgeType: 'configurable',
      icon: Mic,
    },
    {
      id: 'int-5',
      name: 'External AI Provider (OpenAI / Claude)',
      category: 'LLM Gateway',
      provider: 'External Cloud',
      status: 'Not Connected',
      description: 'Optional cloud LLM fallback. Currently running on local Fortiv AI engine.',
      badgeType: 'disconnected',
      icon: Bot,
    },
    {
      id: 'int-6',
      name: 'Telephony Carrier Provider (Twilio / Plivo)',
      category: 'PSTN Gateway',
      provider: 'External SIP Trunk',
      status: 'Not Connected',
      description: 'Direct SIP trunking for bulk outbound PSTN calling.',
      badgeType: 'disconnected',
      icon: PhoneCall,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-base font-extrabold text-[#0F172A]">System Integrations & Gateways</h2>
        <p className="text-xs text-[#64748B]">Connected internal engines and configurable voice/telephony providers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((item) => {
          const IconComponent = item.icon;
          const isActive = item.badgeType === 'active';
          const isConfigurable = item.badgeType === 'configurable';
          const isDisconnected = item.badgeType === 'disconnected';

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-[#E2EEF8] hover:border-[#BAE6FD] hover:shadow-cyan-glow/20 shadow-card transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FCFF] text-[#0284C7] border border-[#E2EEF8] flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[#0284C7]" />
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]'
                        : isConfigurable
                        ? 'bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]'
                        : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-[#0284C7]' : isConfigurable ? 'bg-[#06B6D4] animate-pulse' : 'bg-[#94A3B8]'
                      }`}
                    />
                    <span>{item.status}</span>
                  </span>
                </div>

                <h3 className="text-xs font-bold text-[#0F172A]">{item.name}</h3>
                <p className="text-[11px] text-[#94A3B8] font-medium">{item.category} • {item.provider}</p>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-[#E2EEF8]">
                <button
                  onClick={() => {
                    showToast(
                      item.name,
                      isActive
                        ? 'Native engine is operating normally.'
                        : 'Configuration settings opened.',
                      'info'
                    );
                  }}
                  className={`w-full py-2 rounded-xl text-xs font-bold border transition-colors ${
                    isActive
                      ? 'bg-[#F8FCFF] border-[#E2EEF8] text-[#0F172A] hover:bg-[#F0F7FD]'
                      : isConfigurable
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white border-transparent shadow-xs'
                      : 'bg-white border-[#E2EEF8] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {isActive ? 'View Diagnostics' : isConfigurable ? 'Configure Keys' : 'Connect'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
