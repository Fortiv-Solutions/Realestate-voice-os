import React, { useState, useRef, useEffect } from 'react';
import { useApp, DateRange } from '../context/AppContext';
import { Calendar, ChevronDown, Check } from 'lucide-react';

export const DateRangeDropdown: React.FC = () => {
  const { dateRange, setDateRange, dateRangeLabel } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { value: DateRange; label: string; period: string }[] = [
    { value: 'last_30_days', label: 'Last 30 days', period: 'Aug 23 – Sep 22, 2026' },
    { value: 'last_7_days', label: 'Last 7 days', period: 'Sep 15 – Sep 22, 2026' },
    { value: 'last_90_days', label: 'Last 90 days', period: 'Jun 24 – Sep 22, 2026' },
    { value: 'yesterday', label: 'Yesterday', period: 'Sep 21, 2026' },
    { value: 'last_week', label: 'Last week', period: 'Sep 08 – Sep 14, 2026' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] hover:bg-[#F0F7FD] shadow-subtle transition-colors"
      >
        <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
        <span>{dateRangeLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-56 rounded-2xl bg-white border border-[#E2EEF8] shadow-dropdown z-30 py-1.5 animate-in fade-in-50 zoom-in-95">
          <div className="px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider text-[#94A3B8]">
            Date Range Filter
          </div>
          {options.map((opt) => {
            const isSelected = dateRange === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setDateRange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                  isSelected ? 'bg-[#E0F2FE] text-[#0284C7] font-bold' : 'text-[#0F172A] hover:bg-[#F0F7FD]'
                }`}
              >
                <div>
                  <div>{opt.label}</div>
                  <div className="text-[10px] text-[#64748B] font-normal">{opt.period}</div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#0284C7]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
