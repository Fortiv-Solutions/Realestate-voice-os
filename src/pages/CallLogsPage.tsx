import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PhoneCall,
  Search,
  Filter,
  Sparkles,
  Download,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Layers,
  SlidersHorizontal,
  Calendar
} from 'lucide-react';

export const CallLogsPage: React.FC = () => {
  const { calls, navigate, openExportModal, openTestCallModal } = useApp();
  const [activeTab, setActiveTab] = useState<'calls' | 'workflows'>('calls');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [outcomeFilter, setOutcomeFilter] = useState('All');
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);

  const filteredCalls = calls.filter((c) => {
    if (statusFilter !== 'All' && c.leadStatus !== statusFilter) return false;
    if (outcomeFilter !== 'All' && !c.outcome.includes(outcomeFilter)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.ownerName.toLowerCase().includes(q) ||
        c.phoneNumber.includes(q) ||
        c.propertyLocality.toLowerCase().includes(q) ||
        c.agentName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16 max-w-[1600px] mx-auto">
      {/* 1. Header Bar with Tabs & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black text-[#111827] tracking-tight">Logs</h1>

          {/* Sub-tabs: Calls | Workflows */}
          <div className="flex items-center p-1 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB]">
            <button
              onClick={() => setActiveTab('calls')}
              className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'calls'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Calls
            </button>
            <button
              onClick={() => setActiveTab('workflows')}
              className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'workflows'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Workflows
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Date range badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#ECEEF1] text-xs font-medium text-[#6B7280] shadow-card">
            <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span>Date range: <strong className="text-[#111827]">23 Aug - 23 Sep</strong></span>
          </div>

          <button
            onClick={openExportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:border-[#CBD5E1] shadow-card transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Export</span>
          </button>

          <button
            onClick={() => openTestCallModal()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Live Test</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              statusFilter !== 'All' || outcomeFilter !== 'All'
                ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]'
                : 'bg-[#F8F9FA] text-[#4B5563] border-[#E5E7EB] hover:bg-[#F0F2F5]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {(statusFilter !== 'All' || outcomeFilter !== 'All') && (
              <span className="w-4 h-4 rounded-full bg-[#2563EB] text-white text-[10px] flex items-center justify-center font-mono">
                {(statusFilter !== 'All' ? 1 : 0) + (outcomeFilter !== 'All' ? 1 : 0)}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#6B7280]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            >
              <option value="All">All</option>
              <option value="HOT">HOT</option>
              <option value="WARM">WARM</option>
              <option value="COLD">COLD</option>
              <option value="CALLBACK">CALLBACK</option>
              <option value="DNC">DNC</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#6B7280]">Outcome:</span>
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            >
              <option value="All">All</option>
              <option value="Qualified">Qualified</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Not Interested">Not Interested</option>
              <option value="DNC">DNC</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by callee, phone, agent..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* 3. Full-Width Call Logs Table */}
      <div className="p-4 rounded-2xl bg-white border border-[#ECEEF1] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#ECEEF1] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="pb-3 pl-2">Assistant</th>
                <th className="pb-3">Callee</th>
                <th className="pb-3">Called on</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3 pr-2 text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5]">
              {filteredCalls.map((call) => {
                const shortAgent = call.agentName.split('—')[0].trim() || 'Agent';
                const cost = call.telemetry?.costInr || 12.0;

                return (
                  <tr
                    key={call.id}
                    onClick={() => navigate(`/calls/${call.id}`)}
                    className="hover:bg-[#F9FAFB] transition-all cursor-pointer group"
                  >
                    <td className="py-3.5 pl-2 pr-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#F4F5F7] group-hover:bg-[#EFF6FF] text-[#6B7280] group-hover:text-[#2563EB] flex items-center justify-center shrink-0 transition-colors">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors whitespace-nowrap">
                          {shortAgent}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 pr-2">
                      <div className="font-mono text-xs font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                        {call.phoneNumber}
                      </div>
                      <div className="text-[11px] text-[#6B7280]">{call.ownerName}</div>
                    </td>

                    <td className="py-3.5 pr-2 text-[#6B7280] whitespace-nowrap font-mono text-[11px]">
                      <div>{(call.callDate || '').split('T')[0].replace('2026-', '22/') + '/26'}</div>
                      <div className="text-[10px] text-[#9CA3AF]">
                        {call.telemetry?.callStartedAtFormatted?.split(', ')[1] || '02:18:33 PM'}
                      </div>
                    </td>

                    <td className="py-3.5 pr-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] font-bold text-[10px] border border-[#A7F3D0] inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        Completed
                      </span>
                    </td>

                    <td className="py-3.5 pr-2 text-[#6B7280] font-mono text-xs">
                      {call.durationFormatted || `${Math.floor((call.durationSec || 0) / 60)}m ${(call.durationSec || 0) % 60}s`}
                    </td>

                    <td className="py-3.5 pr-2 text-right font-bold text-[#111827]">
                      ₹{cost.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-3 border-t border-[#ECEEF1] flex items-center justify-between text-[11px] text-[#6B7280]">
          <span>1 to {filteredCalls.length} of {filteredCalls.length} results</span>
          <div className="flex items-center gap-1 font-bold text-xs">
            <button className="px-2 py-1 rounded bg-[#F8F9FA] border border-[#E5E7EB] text-[#111827]">1</button>
          </div>
        </div>
      </div>
    </div>
  );
};
