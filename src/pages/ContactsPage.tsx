import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/StatusBadge';
import { Users, Search, Plus, PhoneCall, Filter, Building2, MapPin } from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { contacts, openTestCallModal } = useApp();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [localityFilter, setLocalityFilter] = useState('All');

  const filteredContacts = contacts.filter((c) => {
    if (localityFilter !== 'All' && c.locality !== localityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.projectBuilding.toLowerCase().includes(q) ||
        c.locality.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">Property Owner Contacts</h2>
          <p className="text-xs text-[#64748B]">Verified property database across Ahmedabad & Gujarat</p>
        </div>

        <button
          onClick={() => showToast('Import Feature', 'Upload CSV / Excel contact lists.', 'info')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contacts</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
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

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by owner name, phone or building..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F8FCFF] border border-[#E2EEF8] text-xs font-medium text-[#0F172A] focus:outline-hidden focus:border-[#0284C7]"
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2EEF8] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2EEF8] text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                <th className="pb-3">Owner Name</th>
                <th className="pb-3">Phone & Email</th>
                <th className="pb-3">Property Specs</th>
                <th className="pb-3">Building / Project</th>
                <th className="pb-3">Est. Value</th>
                <th className="pb-3">Dialing Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EEF8]/60">
              {filteredContacts.map((c) => (
                <tr key={c.id} className="hover:bg-[#F0F7FD] transition-colors">
                  <td className="py-3.5 pr-2 font-bold text-[#0F172A]">{c.name}</td>
                  <td className="py-3.5 pr-2 text-[#64748B]">
                    <div className="font-mono text-[11px] text-[#0F172A] font-semibold">{c.phone}</div>
                    <div className="text-[10px] text-[#94A3B8]">{c.email}</div>
                  </td>
                  <td className="py-3.5 pr-2">
                    <span className="font-semibold text-[#0F172A]">{c.propertyType}</span>
                    <span className="text-[11px] text-[#64748B] block">{c.locality}</span>
                  </td>
                  <td className="py-3.5 pr-2 text-[#64748B]">
                    <div className="font-medium text-[#0F172A]">{c.projectBuilding}</div>
                    <div className="text-[10px] text-[#94A3B8]">{c.unitNumber || 'Unit N/A'}</div>
                  </td>
                  <td className="py-3.5 pr-2 font-bold text-[#0284C7]">{c.estimatedValue}</td>
                  <td className="py-3.5 pr-2">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => openTestCallModal()}
                      className="p-2 rounded-xl text-[#0284C7] hover:bg-[#E0F2FE] transition-colors"
                      title="Test Dial This Owner"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </button>
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
