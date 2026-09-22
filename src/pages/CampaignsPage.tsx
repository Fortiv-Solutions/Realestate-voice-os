import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { campaignService } from '../services/campaignService';
import { StatusBadge } from '../components/StatusBadge';
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  Users,
  PhoneCall,
  Target,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const { campaigns, openCreateCampaignModal, refreshAllData, navigate } = useApp();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = campaignService.toggleCampaignStatus(id);
    refreshAllData();
    if (updated) {
      showToast(
        'Campaign Updated',
        `Campaign "${updated.name}" is now ${updated.status}.`,
        updated.status === 'ACTIVE' ? 'success' : 'info'
      );
    }
  };

  const filteredCampaigns = campaigns.filter((c) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.locality.toLowerCase().includes(q) ||
        c.agentName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">Outbound Calling Campaigns</h2>
          <p className="text-xs text-[#64748B]">Automated property owner outreach & qualification pipelines</p>
        </div>

        <button
          onClick={openCreateCampaignModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns by name, locality or agent..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
          />
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCampaigns.map((camp) => {
          const progressPct = Math.round((camp.calledCount / camp.totalContacts) * 100);
          return (
            <div
              key={camp.id}
              className="p-5 rounded-2xl bg-white border border-[#E2EEF8] hover:border-[#BAE6FD] hover:shadow-cyan-glow/20 shadow-card transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] leading-snug group-hover:text-[#0284C7] transition-colors">
                      {camp.name}
                    </h3>
                    <p className="text-[11px] text-[#64748B] mt-0.5">{camp.locality} • {camp.targetPropertyType}</p>
                  </div>
                  <StatusBadge status={camp.status} size="sm" />
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs text-[#64748B] flex items-center justify-between">
                  <span>Assigned Agent:</span>
                  <span className="font-bold text-[#0F172A] truncate max-w-[140px]">{camp.agentName.split('—')[0]}</span>
                </div>
              </div>

              {/* Progress & KPIs */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#64748B] font-semibold">
                    <span>Dialing Progress ({progressPct}%)</span>
                    <span className="font-extrabold text-[#0F172A]">
                      {camp.calledCount.toLocaleString()} / {camp.totalContacts.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-[#F0F7FD] h-2 rounded-full overflow-hidden border border-[#E2EEF8]">
                    <div
                      className="bg-gradient-to-r from-[#0284C7] to-[#06B6D4] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs p-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8]">
                  <div>
                    <span className="text-[10px] text-[#64748B] font-semibold block">Answered</span>
                    <span className="font-extrabold text-[#0F172A]">{camp.answeredCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] font-semibold block">Answer Rate</span>
                    <span className="font-extrabold text-[#0284C7]">{camp.answerRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] font-semibold block">Qualified</span>
                    <span className="font-extrabold text-[#06B6D4]">{camp.qualifiedCount}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#E2EEF8]">
                <button
                  onClick={(e) => handleToggleStatus(camp.id, e)}
                  className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    camp.status === 'ACTIVE'
                      ? 'bg-white border-[#E2EEF8] text-[#64748B] hover:text-[#0F172A]'
                      : 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7]'
                  }`}
                >
                  {camp.status === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{camp.status === 'ACTIVE' ? 'Pause Dialing' : 'Resume Dialing'}</span>
                </button>

                <button
                  onClick={() => navigate('/contacts')}
                  className="p-2 rounded-xl border border-[#E2EEF8] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
                  title="View Contacts"
                >
                  <Users className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
