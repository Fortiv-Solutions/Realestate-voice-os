import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { UserCheck, Search, PhoneCall, Building2 } from 'lucide-react';

export const OwnersPage: React.FC = () => {
  const { owners, openTestCallModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOwners = owners.filter((o) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return o.name.toLowerCase().includes(q) || o.phone.includes(q) || o.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">Property Owners Directory</h2>
          <p className="text-xs text-[#6B7280] mt-1">Portfolio records, total asset values and assigned brokers</p>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search owners by name or phone..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-[#ECEEF1] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#ECEEF1] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="pb-3">Owner Name</th>
                <th className="pb-3">Phone & Email</th>
                <th className="pb-3">Properties Owned</th>
                <th className="pb-3">Portfolio Valuation</th>
                <th className="pb-3">Lead Status</th>
                <th className="pb-3">Assigned Broker</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5]">
              {filteredOwners.map((o) => (
                <tr key={o.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3.5 pr-2 font-bold text-[#111827]">{o.name}</td>
                  <td className="py-3.5 pr-2 text-[#6B7280]">
                    <div className="font-mono text-[11px] text-[#111827] font-semibold">{o.phone}</div>
                    <div className="text-[10px] text-[#9CA3AF]">{o.email}</div>
                  </td>
                  <td className="py-3.5 pr-2 font-semibold text-[#111827]">
                    {o.propertiesOwnedCount} Properties
                  </td>
                  <td className="py-3.5 pr-2 font-bold text-[#2563EB]">{o.totalPortfolioValue}</td>
                  <td className="py-3.5 pr-2">
                    <StatusBadge status={o.leadStatus} size="sm" />
                  </td>
                  <td className="py-3.5 pr-2 text-[#2563EB] font-semibold">{o.assignedBroker}</td>
                  <td className="py-3.5 text-right">
                    {o.leadStatus !== 'DNC' && (
                      <button
                        onClick={() => openTestCallModal()}
                        className="p-2 rounded-xl text-[#2563EB] hover:bg-[#EFF6FF] transition-colors cursor-pointer"
                        title="Simulate Call"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </button>
                    )}
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
