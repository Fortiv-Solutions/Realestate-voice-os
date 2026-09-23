import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/StatusBadge';
import {
  Bot,
  Plus,
  Search,
  Sparkles,
  Phone,
  Settings,
  Globe,
  Sliders,
  Play,
  Pause,
  ArrowRight,
  MoreVertical
} from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const { agents, navigate, openTestCallModal } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('All');

  const filteredAgents = agents.filter((a) => {
    if (channelFilter !== 'All' && a.channel !== channelFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!a.name.toLowerCase().includes(q) && !a.role.toLowerCase().includes(q) && !a.id.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">AI Voice Agents</h2>
          <p className="text-xs text-[#6B7280] mt-1">Manage and fine-tune your real-estate AI voice consultants</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openTestCallModal()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-xs font-bold border border-[#BFDBFE] transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Test Playground</span>
          </button>

          <button
            onClick={() => navigate('/agents/new')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Create Agent</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-[#6B7280] whitespace-nowrap">Channels:</span>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
          >
            <option value="All">All Channels</option>
            <option value="Voice">Voice Only</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Omnichannel">Omnichannel</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by agent name, role or ID..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="p-5 rounded-2xl bg-white border border-[#ECEEF1] hover:border-[#CBD5E1] hover:shadow-card-hover shadow-card transition-all flex flex-col justify-between group space-y-4"
          >
            {/* Card Header */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#DBEAFE] shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                      {agent.name}
                    </h3>
                    <div className="text-[11px] text-[#6B7280] font-medium flex items-center gap-1.5 mt-0.5">
                      <span>{agent.channel}</span>
                      <span>•</span>
                      <span>{agent.type}</span>
                    </div>
                  </div>
                </div>

                <StatusBadge status={agent.status} size="sm" />
              </div>

              <p className="text-xs text-[#6B7280] line-clamp-2 mt-2 leading-relaxed">{agent.role}</p>
            </div>

            {/* Voice & Specs */}
            <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Voice Profile:</span>
                <span className="font-bold text-[#111827] truncate max-w-[150px]">{agent.voiceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Accent / Provider:</span>
                <span className="font-semibold text-[#2563EB]">{agent.voiceAccent} ({agent.voiceProvider})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Languages:</span>
                <span className="font-medium text-[#111827]">{agent.languages.join(' • ')}</span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-[#F0F2F5]">
              <div>
                <span className="text-[10px] text-[#6B7280] font-semibold block">Calls Today</span>
                <span className="font-extrabold text-[#111827]">{agent.metrics.callsToday}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B7280] font-semibold block">Answer Rate</span>
                <span className="font-extrabold text-[#2563EB]">{agent.metrics.answerRate}%</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B7280] font-semibold block">Qualified</span>
                <span className="font-extrabold text-[#10B981]">{agent.metrics.qualifiedLeads}</span>
              </div>
            </div>

            {/* Card Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => navigate(`/agents/${agent.id}`)}
                className="flex-1 py-2 px-3 rounded-xl bg-[#F8F9FA] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-bold text-[#111827] hover:text-[#2563EB] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => openTestCallModal(agent.id)}
                className="p-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xs transition-all active:scale-95"
                title="Launch Live Test Call"
              >
                <Phone className="w-3.5 h-3.5 fill-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
