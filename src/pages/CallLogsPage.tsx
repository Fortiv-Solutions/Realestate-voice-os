import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import {
  PhoneCall,
  Search,
  Filter,
  Play,
  ArrowUpDown,
  Sparkles,
  Download,
  Clock,
  ArrowRight
} from 'lucide-react';

export const CallLogsPage: React.FC = () => {
  const { calls, navigate, openExportModal, openTestCallModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [outcomeFilter, setOutcomeFilter] = useState('All');

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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">Call Logs & Transcripts</h2>
          <p className="text-xs text-[#64748B]">Detailed conversation transcripts, duration, audio recordings and AI qualification tags</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={openExportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] hover:bg-[#F0F7FD] shadow-card transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => openTestCallModal()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Live Test</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#64748B]">Lead Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
            >
              <option value="All">All Statuses</option>
              <option value="HOT">HOT</option>
              <option value="WARM">WARM</option>
              <option value="COLD">COLD</option>
              <option value="CALLBACK">CALLBACK</option>
              <option value="DNC">DNC</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#64748B]">Outcome:</span>
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
            >
              <option value="All">All Outcomes</option>
              <option value="Qualified">Qualified</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Not Interested">Not Interested</option>
              <option value="DNC">DNC</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by owner, phone, locality or agent..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
          />
        </div>
      </div>

      {/* Main Call Logs Table */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2EEF8] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2EEF8] text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                <th className="pb-3">Owner</th>
                <th className="pb-3">Property</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Agent</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3">Outcome</th>
                <th className="pb-3">Lead Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EEF8]/60">
              {filteredCalls.map((call) => (
                <tr
                  key={call.id}
                  onClick={() => navigate(`/calls/${call.id}`)}
                  className="hover:bg-[#F0F7FD] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 pr-2">
                    <div className="font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                      {call.ownerName}
                    </div>
                    <div className="text-[10px] text-[#94A3B8] font-mono">{call.phoneNumber}</div>
                  </td>
                  <td className="py-3.5 pr-2 font-medium text-[#0F172A]">{call.propertyType}</td>
                  <td className="py-3.5 pr-2 text-[#64748B]">{call.propertyLocality}</td>
                  <td className="py-3.5 pr-2">
                    <span className="font-semibold text-[#0284C7]">{call.agentName.split('—')[0]}</span>
                  </td>
                  <td className="py-3.5 pr-2 text-[#64748B] whitespace-nowrap">{(call.callDate || '').split('T')[0]}</td>
                  <td className="py-3.5 pr-2 text-[#64748B] font-mono">{call.durationFormatted || `${Math.floor((call.durationSec || 0) / 60)}m ${(call.durationSec || 0) % 60}s`}</td>
                  <td className="py-3.5 pr-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#F0F7FD] border border-[#E2EEF8] font-bold text-[#0F172A] text-[11px]">
                      {call.outcome}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2">
                    <StatusBadge status={call.leadStatus} size="sm" />
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="text-xs font-bold text-[#0284C7] group-hover:underline inline-flex items-center gap-1">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
