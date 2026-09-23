import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DateRangeDropdown } from './DateRangeDropdown';
import {
  Menu,
  Download,
  Plus,
  Search,
  PanelLeftOpen
} from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  isSidebarCollapsed?: boolean;
  title: string;
  subtitle?: string;
  showCreateCampaignButton?: boolean;
  showCreateAgentButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  isSidebarCollapsed = false,
  title,
  subtitle,
  showCreateCampaignButton = true,
  showCreateAgentButton = false,
}) => {
  const { openCreateCampaignModal, navigate, openExportModal } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-[#ECEEF1] px-4 lg:px-8 h-16 flex items-center transition-all">
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Left Side: Sidebar Toggle & Breadcrumb navigation */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#111827] hover:border-[#CBD5E1] hover:bg-[#F4F5F7] transition-colors shadow-subtle flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Toggle Sidebar"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-[#2563EB]" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>

          <div className="flex items-center gap-2 text-xs truncate">
            <span className="text-[#8C95A6] font-medium truncate">Dashboard</span>
            <span className="text-[#CBD5E1]">/</span>
            <span className="text-[#111827] font-bold truncate">{title || 'Overview'}</span>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Calina AI Pill Search Input */}
          <div className="relative hidden md:flex items-center">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 shadow-subtle w-44 lg:w-56 transition-all"
            />
          </div>

          {/* Date Range Selector */}
          <DateRangeDropdown />

          {/* Export Action */}
          <button
            onClick={openExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-[#F4F5F7] shadow-subtle transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Export</span>
          </button>

          {/* Main Action Button */}
          {showCreateCampaignButton && (
            <button
              onClick={openCreateCampaignModal}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Campaign</span>
            </button>
          )}

          {showCreateAgentButton && (
            <button
              onClick={() => navigate('/agents/new')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Agent</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
