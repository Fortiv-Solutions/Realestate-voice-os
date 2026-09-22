import React from 'react';
import { useApp } from '../context/AppContext';
import { DateRangeDropdown } from './DateRangeDropdown';
import {
  Menu,
  Download,
  Plus,
  Bell,
  Search,
  Sparkles,
  Phone,
  PanelLeftClose,
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
  const { openCreateCampaignModal, navigate, openExportModal, openTestCallModal } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-[#F8FCFF]/90 backdrop-blur-md border-b border-[#E2EEF8] px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left Side: Title, Subtitle & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl border border-[#E2EEF8] bg-white text-[#64748B] hover:text-[#0284C7] hover:border-[#BAE6FD] hover:bg-[#F0F7FD] transition-colors shadow-subtle flex items-center justify-center cursor-pointer"
            aria-label="Toggle Sidebar"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-[#0284C7]" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
          <div>
            <h1 className="text-lg font-extrabold text-[#0F172A] tracking-tight">{title}</h1>
            {subtitle && <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Date Range Selector */}
          <DateRangeDropdown />

          {/* Export Action */}
          <button
            onClick={openExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E2EEF8] text-xs font-semibold text-[#0F172A] hover:bg-[#F0F7FD] shadow-subtle transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Export</span>
          </button>

          {/* Test Call Dial Simulator Button */}
          <button
            onClick={() => openTestCallModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ECFEFF] hover:bg-[#CFFAFE] text-[#0891B2] text-xs font-bold border border-[#A5F3FC] transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>Test Call</span>
          </button>

          {/* Main Action Button */}
          {showCreateCampaignButton && (
            <button
              onClick={openCreateCampaignModal}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Campaign</span>
            </button>
          )}

          {showCreateAgentButton && (
            <button
              onClick={() => navigate('/agents/new')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#06B6D4] hover:from-[#0369A1] hover:to-[#0891B2] text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all active:scale-98"
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
