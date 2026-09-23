import React from 'react';
import { useToast } from '../context/ToastContext';
import { Phone, Plus, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const PhoneNumbersPage: React.FC = () => {
  const { showToast } = useToast();

  const numbers = [
    {
      id: 'num-1',
      number: '+91 79 4001 8820',
      region: 'Ahmedabad (Landline DID)',
      assignedCampaign: 'Satellite & Prahlad Nagar High-Intent Resale',
      status: 'Active',
      reputationScore: '98/100 (Clean)',
      callsToday: 412,
    },
    {
      id: 'num-2',
      number: '+91 79 4001 8821',
      region: 'Ahmedabad (Landline DID)',
      assignedCampaign: 'Bodakdev & Thaltej Ultra-Luxury Villas',
      status: 'Active',
      reputationScore: '96/100 (Clean)',
      callsToday: 184,
    },
    {
      id: 'num-3',
      number: '+91 98250 11000',
      region: 'Gujarat Mobile DID',
      assignedCampaign: 'Bopal & South Bopal New-Age Investors',
      status: 'Reserved',
      reputationScore: '94/100 (Clean)',
      callsToday: 0,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">Telephony & Phone Number Pool</h2>
          <p className="text-xs text-[#6B7280] mt-1">Dedicated DIDs, carrier routing, caller ID reputation & line health</p>
        </div>

        <button
          onClick={() => showToast('Purchase DID', 'Number provisioning opened.', 'info')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Phone Number</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-[#ECEEF1] shadow-card overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#ECEEF1] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
              <th className="pb-3">Phone Number</th>
              <th className="pb-3">Region / Type</th>
              <th className="pb-3">Assigned Campaign</th>
              <th className="pb-3">Reputation Health</th>
              <th className="pb-3">Calls Today</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F2F5]">
            {numbers.map((n) => (
              <tr key={n.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="py-3.5 pr-2 font-mono font-bold text-xs text-[#111827] flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{n.number}</span>
                </td>
                <td className="py-3.5 pr-2 text-[#6B7280]">{n.region}</td>
                <td className="py-3.5 pr-2 font-semibold text-[#111827]">{n.assignedCampaign}</td>
                <td className="py-3.5 pr-2">
                  <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-md border border-[#BFDBFE]">
                    {n.reputationScore}
                  </span>
                </td>
                <td className="py-3.5 pr-2 font-mono font-bold text-[#111827]">{n.callsToday}</td>
                <td className="py-3.5 text-right">
                  <span className="text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                    {n.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
