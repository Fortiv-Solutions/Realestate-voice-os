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
          <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">Outbound Calling Campaigns</h2>
          <p className="text-xs text-[#6B7280] mt-1">Automated property owner outreach & qualification pipelines</p>
        </div>

        <button
          onClick={openCreateCampaignModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns by name, locality or agent..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
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
              className="p-5 rounded-2xl bg-white border border-[#ECEEF1] hover:border-[#CBD5E1] hover:shadow-card-hover shadow-card transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xs font-bold text-[#111827] leading-snug group-hover:text-[#2563EB] transition-colors">
                      {camp.name}
                    </h3>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">{camp.locality} • {camp.targetPropertyType}</p>
                  </div>
                  <StatusBadge status={camp.status} size="sm" />
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1] text-xs text-[#6B7280] flex items-center justify-between">
                  <span>Assigned Agent:</span>
                  <span className="font-bold text-[#111827] truncate max-w-[140px]">{camp.agentName.split('—')[0]}</span>
                </div>
              </div>

              {/* Progress & KPIs */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#6B7280] font-semibold">
                    <span>Dialing Progress ({progressPct}%)</span>
                    <span className="font-extrabold text-[#111827]">
                      {camp.calledCount.toLocaleString()} / {camp.totalContacts.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-[#F0F2F5] h-2 rounded-full overflow-hidden border border-[#ECEEF1]">
                    <div
                      className="bg-gradient-to-r from-[#2563EB] to-[#60A5FA] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs p-2 rounded-xl bg-[#F8F9FA] border border-[#ECEEF1]">
                  <div>
                    <span className="text-[10px] text-[#6B7280] font-semibold block">Answered</span>
                    <span className="font-extrabold text-[#111827]">{camp.answeredCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7280] font-semibold block">Answer Rate</span>
                    <span className="font-extrabold text-[#2563EB]">{camp.answerRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7280] font-semibold block">Qualified</span>
                    <span className="font-extrabold text-[#10B981]">{camp.qualifiedCount}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#F0F2F5]">
                <button
                  onClick={(e) => handleToggleStatus(camp.id, e)}
                  className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    camp.status === 'ACTIVE'
                      ? 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] hover:border-[#CBD5E1]'
                      : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'
                  }`}
                >
                  {camp.status === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{camp.status === 'ACTIVE' ? 'Pause Dialing' : 'Resume Dialing'}</span>
                </button>

                <button
                  onClick={() => navigate('/contacts')}
                  className="p-2 rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#111827] hover:border-[#CBD5E1] hover:bg-[#F4F5F7] transition-colors"
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
