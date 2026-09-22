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
          <h2 className="text-base font-extrabold text-[#0F172A]">Property Owners Directory</h2>
          <p className="text-xs text-[#64748B]">Portfolio records, total asset values and assigned brokers</p>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search owners by name or phone..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
          />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-[#E2EEF8] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2EEF8] text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                <th className="pb-3">Owner Name</th>
                <th className="pb-3">Phone & Email</th>
                <th className="pb-3">Properties Owned</th>
                <th className="pb-3">Portfolio Valuation</th>
                <th className="pb-3">Lead Status</th>
                <th className="pb-3">Assigned Broker</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EEF8]/60">
              {filteredOwners.map((o) => (
                <tr key={o.id} className="hover:bg-[#F0F7FD] transition-colors">
                  <td className="py-3.5 pr-2 font-bold text-[#0F172A]">{o.name}</td>
                  <td className="py-3.5 pr-2 text-[#64748B]">
                    <div className="font-mono text-[11px] text-[#0F172A] font-semibold">{o.phone}</div>
                    <div className="text-[10px] text-[#94A3B8]">{o.email}</div>
                  </td>
                  <td className="py-3.5 pr-2 font-semibold text-[#0F172A]">
                    {o.propertiesOwnedCount} Properties
                  </td>
                  <td className="py-3.5 pr-2 font-bold text-[#0284C7]">{o.totalPortfolioValue}</td>
                  <td className="py-3.5 pr-2">
                    <StatusBadge status={o.leadStatus} size="sm" />
                  </td>
                  <td className="py-3.5 pr-2 text-[#0284C7] font-semibold">{o.assignedBroker}</td>
                  <td className="py-3.5 text-right">
                    {o.leadStatus !== 'DNC' && (
                      <button
                        onClick={() => openTestCallModal()}
                        className="p-2 rounded-xl text-[#0284C7] hover:bg-[#E0F2FE] transition-colors"
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
