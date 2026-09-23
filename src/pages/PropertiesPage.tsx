import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/StatusBadge';
import { Building2, Plus, Search, Tag } from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const { properties } = useApp();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = properties.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.ownerName.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">Property Inventory Intelligence</h2>
          <p className="text-xs text-[#6B7280] mt-1">Residential and commercial assets mapped to owners & active buyer demand</p>
        </div>

        <button
          onClick={() => showToast('Add Property', 'Property intake form opened.', 'info')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      <div className="p-3.5 rounded-2xl bg-white border border-[#ECEEF1] shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, owner or locality..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-[#ECEEF1] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#ECEEF1] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="pb-3">Property Name & Location</th>
                <th className="pb-3">Owner Contact</th>
                <th className="pb-3">Type & Area</th>
                <th className="pb-3">Asking Price</th>
                <th className="pb-3">Market Valuation</th>
                <th className="pb-3">Occupancy</th>
                <th className="pb-3">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5]">
              {filteredProperties.map((p) => (
                <tr key={p.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3.5 pr-2">
                    <div className="font-bold text-[#111827]">{p.title}</div>
                    <div className="text-[11px] text-[#6B7280]">{p.locality}, {p.city}</div>
                  </td>
                  <td className="py-3.5 pr-2">
                    <div className="font-bold text-[#111827]">{p.ownerName}</div>
                    <div className="text-[10px] text-[#9CA3AF] font-mono">{p.ownerPhone}</div>
                  </td>
                  <td className="py-3.5 pr-2">
                    <div className="font-semibold text-[#111827]">{p.propertyType}</div>
                    <div className="text-[10px] text-[#6B7280]">{p.carpetAreaSqFt.toLocaleString()} sq ft</div>
                  </td>
                  <td className="py-3.5 pr-2 font-bold text-[#2563EB]">{p.askingPrice}</td>
                  <td className="py-3.5 pr-2 font-semibold text-[#111827]">{p.marketValuation}</td>
                  <td className="py-3.5 pr-2">
                    <span className="text-[11px] font-medium text-[#6B7280]">{p.occupancyStatus}</span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center flex-wrap gap-1">
                      {p.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#2563EB] font-semibold border border-[#BFDBFE]">
                          {t}
                        </span>
                      ))}
                    </div>
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
