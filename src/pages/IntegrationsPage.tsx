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
        <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">System Integrations & Gateways</h2>
        <p className="text-xs text-[#6B7280] mt-1">Connected internal engines and configurable voice/telephony providers</p>
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
              className="p-5 rounded-2xl bg-white border border-[#ECEEF1] hover:border-[#CBD5E1] hover:shadow-card-hover shadow-card transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[#2563EB]" />
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]'
                        : isConfigurable
                        ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]'
                        : 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-[#10B981]' : isConfigurable ? 'bg-[#2563EB] animate-pulse' : 'bg-[#9CA3AF]'
                      }`}
                    />
                    <span>{item.status}</span>
                  </span>
                </div>

                <h3 className="text-xs font-bold text-[#111827]">{item.name}</h3>
                <p className="text-[11px] text-[#9CA3AF] font-medium mt-0.5">{item.category} • {item.provider}</p>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-[#F0F2F5]">
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
                  className={`w-full py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#F8F9FA] border-[#E5E7EB] text-[#111827] hover:bg-[#F3F4F6]'
                      : isConfigurable
                      ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white border-transparent shadow-xs'
                      : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:text-[#111827] hover:border-[#CBD5E1]'
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
