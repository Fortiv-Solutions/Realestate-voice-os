import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { LeadStatus, Lead } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import {
  Target,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Plus,
  CalendarCheck,
  UserCheck,
  Phone,
  Building2,
  ArrowRight
} from 'lucide-react';

export const LeadsPage: React.FC = () => {
  const { leads, navigate, openScheduleCallbackModal } = useApp();
  const { showToast } = useToast();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [localityFilter, setLocalityFilter] = useState('All');

  const filteredLeads = leads.filter((l) => {
    if (localityFilter !== 'All' && l.locality !== localityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        l.ownerName.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.locality.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns: { status: LeadStatus; label: string; count: number; colorClass: string }[] = [
    {
      status: 'HOT',
      label: 'HOT Leads',
      count: filteredLeads.filter((l) => l.status === 'HOT').length,
      colorClass: 'border-t-2 border-t-[#06B6D4]',
    },
    {
      status: 'WARM',
      label: 'WARM Opportunities',
      count: filteredLeads.filter((l) => l.status === 'WARM').length,
      colorClass: 'border-t-2 border-t-[#0284C7]',
    },
    {
      status: 'CALLBACK',
      label: 'Follow Up / Callback',
      count: filteredLeads.filter((l) => l.status === 'CALLBACK').length,
      colorClass: 'border-t-2 border-t-[#6366F1]',
    },
    {
      status: 'COLD',
      label: 'COLD Nurturing',
      count: filteredLeads.filter((l) => l.status === 'COLD').length,
      colorClass: 'border-t-2 border-t-[#94A3B8]',
    },
    {
      status: 'DNC',
      label: 'DNC Blacklist',
      count: filteredLeads.filter((l) => l.status === 'DNC').length,
      colorClass: 'border-t-2 border-t-[#EF4444]',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">Property Owner Leads & CRM</h2>
          <p className="text-xs text-[#64748B]">Verified real estate lead lifecycle and specialist handoffs</p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 rounded-xl bg-white border border-[#E2EEF8] shadow-card">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'kanban' ? 'bg-[#E0F2FE] text-[#0284C7] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'table' ? 'bg-[#E0F2FE] text-[#0284C7] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-[#64748B]">Locality:</span>
          <select
            value={localityFilter}
            onChange={(e) => setLocalityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
          >
            <option value="All">All Localities</option>
            <option value="Satellite">Satellite</option>
            <option value="Bodakdev">Bodakdev</option>
            <option value="Bopal">Bopal</option>
            <option value="Prahlad Nagar">Prahlad Nagar</option>
            <option value="Thaltej">Thaltej</option>
            <option value="SG Highway">SG Highway</option>
          </select>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, phone or locality..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
          />
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto">
          {columns.map((col) => {
            const colLeads = filteredLeads.filter((l) => l.status === col.status);
            return (
              <div
                key={col.status}
                className={`p-3.5 rounded-2xl bg-[#F8FCFF] border border-[#E2EEF8] flex flex-col min-h-[480px] space-y-3 ${col.colorClass}`}
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-[#0F172A]">{col.label}</span>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-white text-[#0284C7] border border-[#E2EEF8] shadow-xs">
                    {col.count}
                  </span>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-white border border-[#E2EEF8] hover:border-[#BAE6FD] hover:shadow-cyan-glow/15 shadow-card transition-all space-y-2.5 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                            {lead.ownerName}
                          </h4>
                          <p className="text-[11px] text-[#64748B] font-medium">{lead.propertyType} • {lead.locality}</p>
                        </div>
                        <span className="text-[10px] font-bold text-[#0891B2] bg-[#ECFEFF] px-1.5 py-0.5 rounded border border-[#A5F3FC]">
                          {lead.qualificationScore}%
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] space-y-1 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-[#64748B]">Target:</span>
                          <span className="font-bold text-[#0284C7]">{lead.expectedPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#64748B]">Timeline:</span>
                          <span className="font-medium text-[#0F172A]">{lead.sellingTimeline}</span>
                        </div>
                      </div>

                      {lead.assignedHumanSpecialist && (
                        <div className="text-[10px] text-[#0284C7] font-semibold flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-[#06B6D4]" />
                          <span className="truncate">{lead.assignedHumanSpecialist.split('(')[0]}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-[#E2EEF8] flex items-center justify-between gap-2">
                        {lead.status !== 'DNC' ? (
                          <button
                            onClick={() => openScheduleCallbackModal(lead)}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-[#F0F7FD] hover:bg-[#E0F2FE] text-[11px] font-bold text-[#0F172A] hover:text-[#0284C7] border border-[#E2EEF8] flex items-center justify-center gap-1 transition-colors"
                          >
                            <CalendarCheck className="w-3 h-3 text-[#0284C7]" />
                            <span>Handoff</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-[#EF4444] font-bold">Do Not Contact</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="p-4 rounded-2xl bg-white border border-[#E2EEF8] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E2EEF8] text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Property</th>
                  <th className="pb-3">Locality</th>
                  <th className="pb-3">Expected Price</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Specialist</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EEF8]/60">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#F0F7FD] transition-colors">
                    <td className="py-3.5 pr-2">
                      <div className="font-bold text-[#0F172A]">{lead.ownerName}</div>
                      <div className="text-[10px] text-[#94A3B8] font-mono">{lead.phone}</div>
                    </td>
                    <td className="py-3.5 pr-2 font-semibold text-[#0F172A]">{lead.propertyType}</td>
                    <td className="py-3.5 pr-2 text-[#64748B]">{lead.locality}, {lead.city}</td>
                    <td className="py-3.5 pr-2 font-bold text-[#0284C7]">{lead.expectedPrice}</td>
                    <td className="py-3.5 pr-2">
                      <StatusBadge status={lead.status} size="sm" />
                    </td>
                    <td className="py-3.5 pr-2 text-[#0284C7] font-semibold text-[11px]">
                      {lead.assignedHumanSpecialist || 'Unassigned'}
                    </td>
                    <td className="py-3.5 text-right">
                      {lead.status !== 'DNC' && (
                        <button
                          onClick={() => openScheduleCallbackModal(lead)}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-[11px] font-bold shadow-xs transition-all active:scale-95"
                        >
                          Schedule
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
