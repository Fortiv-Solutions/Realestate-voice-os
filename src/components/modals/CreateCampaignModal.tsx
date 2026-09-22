import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { campaignService } from '../../services/campaignService';
import { X, Megaphone, Check } from 'lucide-react';

export const CreateCampaignModal: React.FC = () => {
  const { isCreateCampaignOpen, closeCreateCampaignModal, agents } = useApp();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0]?.id || 'agent-1');
  const [locality, setLocality] = useState('Satellite & Prahlad Nagar');
  const [targetPropertyType, setTargetPropertyType] = useState('2 & 3 BHK Apartments');
  const [totalContacts, setTotalContacts] = useState(2500);
  const [dailyCallLimit, setDailyCallLimit] = useState(300);
  const [concurrencyLimit, setConcurrencyLimit] = useState(10);
  const [callingHours, setCallingHours] = useState('10:00 AM - 06:30 PM IST');

  if (!isCreateCampaignOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const agent = agents.find((a) => a.id === selectedAgentId) || agents[0];

    campaignService.createCampaign({
      name,
      agentId: agent.id,
      agentName: agent.name,
      status: 'ACTIVE',
      totalContacts,
      locality,
      city: 'Ahmedabad',
      targetPropertyType,
      startDate: new Date().toISOString().split('T')[0],
      dailyCallLimit,
      concurrencyLimit,
      callingHours,
    });

    showToast('Campaign Created', `Outbound campaign "${name}" is now active.`, 'success');
    closeCreateCampaignModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in-50">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#E2EEF8] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="px-6 py-4 bg-[#F8FCFF] border-b border-[#E2EEF8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#0284C7] text-white flex items-center justify-center shadow-xs">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0F172A]">Create Outbound Campaign</h3>
              <p className="text-xs text-[#64748B]">Launch automated AI calling on selected property owners</p>
            </div>
          </div>
          <button
            onClick={closeCreateCampaignModal}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">Campaign Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Thaltej 4 BHK Villa Acquisition"
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Assigned AI Agent</label>
              <select
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
              >
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Target Locality</label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Property Inventory Focus</label>
              <input
                type="text"
                value={targetPropertyType}
                onChange={(e) => setTargetPropertyType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Contacts to Dial</label>
              <input
                type="number"
                value={totalContacts}
                onChange={(e) => setTotalContacts(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Daily Dialing Cap</label>
              <input
                type="number"
                value={dailyCallLimit}
                onChange={(e) => setDailyCallLimit(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">Concurrency Lines</label>
              <input
                type="number"
                value={concurrencyLimit}
                onChange={(e) => setConcurrencyLimit(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2EEF8]">
            <button
              type="button"
              onClick={closeCreateCampaignModal}
              className="px-4 py-2 rounded-xl border border-[#E2EEF8] text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
            >
              Launch Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
