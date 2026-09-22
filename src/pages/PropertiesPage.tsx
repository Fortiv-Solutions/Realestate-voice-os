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
          <h2 className="text-base font-extrabold text-[#0F172A]">Property Inventory Intelligence</h2>
          <p className="text-xs text-[#64748B]">Residential and commercial assets mapped to owners & active buyer demand</p>
        </div>

        <button
          onClick={() => showToast('Add Property', 'Property intake form opened.', 'info')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      <div className="p-3.5 rounded-2xl bg-white border border-[#E2EEF8] shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, owner or locality..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
          />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-[#E2EEF8] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2EEF8] text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                <th className="pb-3">Property Name & Location</th>
                <th className="pb-3">Owner Contact</th>
                <th className="pb-3">Type & Area</th>
                <th className="pb-3">Asking Price</th>
                <th className="pb-3">Market Valuation</th>
                <th className="pb-3">Occupancy</th>
                <th className="pb-3">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EEF8]/60">
              {filteredProperties.map((p) => (
                <tr key={p.id} className="hover:bg-[#F0F7FD] transition-colors">
                  <td className="py-3.5 pr-2">
                    <div className="font-bold text-[#0F172A]">{p.title}</div>
                    <div className="text-[11px] text-[#64748B]">{p.locality}, {p.city}</div>
                  </td>
                  <td className="py-3.5 pr-2">
                    <div className="font-bold text-[#0F172A]">{p.ownerName}</div>
                    <div className="text-[10px] text-[#94A3B8] font-mono">{p.ownerPhone}</div>
                  </td>
                  <td className="py-3.5 pr-2">
                    <div className="font-semibold text-[#0F172A]">{p.propertyType}</div>
                    <div className="text-[10px] text-[#64748B]">{p.carpetAreaSqFt.toLocaleString()} sq ft</div>
                  </td>
                  <td className="py-3.5 pr-2 font-bold text-[#0284C7]">{p.askingPrice}</td>
                  <td className="py-3.5 pr-2 font-semibold text-[#0F172A]">{p.marketValuation}</td>
                  <td className="py-3.5 pr-2">
                    <span className="text-[11px] font-medium text-[#64748B]">{p.occupancyStatus}</span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center flex-wrap gap-1">
                      {p.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 rounded-md bg-[#E0F2FE] text-[#0284C7] font-semibold border border-[#BAE6FD]">
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
