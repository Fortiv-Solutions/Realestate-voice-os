import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Settings, Save, Shield, Globe, Bell, User } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();

  const [agencyName, setAgencyName] = useState('Fortiv Real Estate Solutions');
  const [primaryCity, setPrimaryCity] = useState('Ahmedabad, Gujarat');
  const [reraNumber, setReraNumber] = useState('PR/GJ/AHMEDABAD/2026/RERA9981');
  const [complianceMode, setComplianceMode] = useState('Strict (Automatic DNC)');
  const [defaultCurrency, setDefaultCurrency] = useState('INR (₹ Lakhs & Crores)');
  const [dailyGlobalCap, setDailyGlobalCap] = useState(2500);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings Saved', 'Global real estate platform settings updated.', 'success');
  };

  return (
    <div className="max-w-4xl space-y-6 pb-16">
      <div>
        <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">Platform & Workspace Settings</h2>
        <p className="text-xs text-[#6B7280] mt-1">Configure company profiles, RERA compliance, timezone, and global dialing caps</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-card space-y-5">
        <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider pb-2 border-b border-[#ECEEF1]">
          Agency Profile & Regulatory
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Real Estate Agency Name</label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Primary Market Location</label>
            <input
              type="text"
              value={primaryCity}
              onChange={(e) => setPrimaryCity(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">RERA License Registration ID</label>
            <input
              type="text"
              value={reraNumber}
              onChange={(e) => setReraNumber(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">DNC & TCPA Compliance Mode</label>
            <select
              value={complianceMode}
              onChange={(e) => setComplianceMode(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            >
              <option>Strict (Instant DNC Blacklist Enforcement)</option>
              <option>Standard (Confirmation Prompt before DNC)</option>
            </select>
          </div>
        </div>

        <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider pt-4 pb-2 border-b border-[#ECEEF1]">
          Global Calling Limits
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Currency & Valuation Format</label>
            <input
              type="text"
              value={defaultCurrency}
              onChange={(e) => setDefaultCurrency(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Daily Total Workspace Calling Cap</label>
            <input
              type="number"
              value={dailyGlobalCap}
              onChange={(e) => setDailyGlobalCap(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#ECEEF1]">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
