import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Bot,
  PlusCircle,
  Megaphone,
  Users,
  PhoneCall,
  Radio,
  Phone,
  Target,
  UserCheck,
  Building2,
  BarChart3,
  BrainCircuit,
  Puzzle,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  onToggleCollapse,
  onClose,
}) => {
  const { currentRoute, navigate } = useApp();

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'AI AGENTS',
      items: [
        { label: 'Agents', route: '/agents', icon: Bot },
        { label: 'Create Agent', route: '/agents/new', icon: PlusCircle, onClick: () => navigate('/agents/new') },
      ],
    },
    {
      title: 'CAMPAIGNS',
      items: [
        { label: 'Campaigns', route: '/campaigns', icon: Megaphone },
        { label: 'Contacts', route: '/contacts', icon: Users },
      ],
    },
    {
      title: 'CALLING',
      items: [
        { label: 'Call Logs', route: '/calls', icon: PhoneCall },
        { label: 'Live Calls', route: '/calls/live', icon: Radio },
        { label: 'Phone Numbers', route: '/phone-numbers', icon: Phone },
      ],
    },
    {
      title: 'LEADS',
      items: [
        { label: 'Leads', route: '/leads', icon: Target },
        { label: 'Property Owners', route: '/owners', icon: UserCheck },
        { label: 'Properties', route: '/properties', icon: Building2 },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        { label: 'Analytics', route: '/analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'AI INTELLIGENCE',
      items: [
        { label: 'AI Intelligence', route: '/intelligence', icon: BrainCircuit },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Integrations', route: '/integrations', icon: Puzzle },
        { label: 'Settings', route: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-[#E2EEF8] flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full'
        } ${
          isCollapsed ? 'lg:w-[72px] lg:translate-x-0' : 'lg:w-64 lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className={`h-16 px-4 flex items-center border-b border-[#E2EEF8] ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}>
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => {
              navigate('/dashboard');
              onClose();
            }}
            title="FORTIV AI Calling"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#0284C7] flex items-center justify-center text-white font-black text-sm shadow-md shadow-cyan-500/20 shrink-0">
              F
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold tracking-tight text-sm text-[#0F172A]">FORTIV</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                    AI Calling
                  </span>
                </div>
                <p className="text-[10px] text-[#64748B] font-medium leading-none mt-0.5 truncate">Real Estate Voice OS</p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button */}
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-xl text-[#94A3B8] hover:text-[#0284C7] hover:bg-[#F0F7FD] transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F0F7FD] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className={`flex-1 overflow-y-auto py-3 space-y-4 custom-scrollbar ${
          isCollapsed ? 'px-2' : 'px-3'
        }`}>
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase truncate">
                  {section.title}
                </div>
              )}
              {isCollapsed && (
                <div className="h-px bg-[#E2EEF8] my-2 mx-1" />
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive =
                    currentRoute === item.route ||
                    (item.route !== '/dashboard' && currentRoute.startsWith(item.route) && item.route !== '/analytics');
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.onClick) {
                          item.onClick();
                        } else {
                          navigate(item.route);
                        }
                        onClose();
                      }}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center rounded-xl text-xs font-semibold transition-all relative group ${
                        isCollapsed
                          ? 'justify-center p-2.5'
                          : 'gap-2.5 px-3 py-2 text-left'
                      } ${
                        isActive
                          ? 'bg-[#E0F2FE] text-[#0284C7] shadow-xs font-bold'
                          : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F0F7FD]'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#0284C7] rounded-r shadow-cyan-glow" />
                      )}
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#0284C7]' : 'text-[#64748B] group-hover:text-[#0284C7]'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}

                      {/* Tooltip for collapsed mode */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2.5 py-1 rounded-lg bg-[#0F172A] text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-lg z-50 font-medium">
                          {item.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
