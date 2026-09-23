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
  ChevronRight,
  HelpCircle,
  X
} from 'lucide-react';

interface NavItem {
  label: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  onClick?: () => void;
}

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

  const navSections: { title: string; items: NavItem[] }[] = [
    {
      title: 'OVERVIEW',
      items: [
        {
          label: 'Dashboard',
          route: '/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'AI AGENTS',
      items: [
        { label: 'Agents', route: '/agents', icon: Bot, badge: '4' },
        { label: 'Create Agent', route: '/agents/new', icon: PlusCircle, onClick: () => navigate('/agents/new') },
      ],
    },
    {
      title: 'CAMPAIGNS',
      items: [
        { label: 'Campaigns', route: '/campaigns', icon: Megaphone },
        { label: 'Contacts', route: '/contacts', icon: Users, badge: '12k' },
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
        className={`fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-[#ECEEF1] flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full'
        } ${
          isCollapsed ? 'lg:w-[76px] lg:translate-x-0' : 'lg:w-64 lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className={`h-16 flex items-center border-b border-[#ECEEF1] ${
          isCollapsed ? 'justify-center px-0' : 'justify-between px-4'
        }`}>
          <div
            className={`flex items-center cursor-pointer select-none ${
              isCollapsed ? 'justify-center' : 'gap-3 min-w-0'
            }`}
            onClick={() => {
              navigate('/dashboard');
              onClose();
            }}
            title="VoiceOS — Realestate Voice Intelligence"
          >
            {/* Circular Blue Avatar Icon - perfectly centered */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0" />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold tracking-tight text-sm text-[#111827] truncate">VoiceOS</span>
                </div>
                <p className="text-[11px] text-[#8C95A6] font-medium leading-none mt-0.5 truncate">Realestate Voice Intelligence</p>
              </div>
            )}
          </div>

          {/* Desktop Chevron / Toggle */}
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1 rounded-lg text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F4F5F7] transition-colors"
              title="Collapse sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F4F5F7] transition-colors"
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
                <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase truncate">
                  {section.title}
                </div>
              )}
              {isCollapsed && (
                <div className="h-px bg-[#ECEEF1] my-2 mx-1" />
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    currentRoute === item.route ||
                    (item.route !== '/dashboard' && currentRoute.startsWith(item.route) && item.route !== '/analytics');
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="space-y-1 flex justify-center">
                      <button
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick();
                          } else {
                            navigate(item.route);
                          }
                          onClose();
                        }}
                        title={isCollapsed ? item.label : undefined}
                        className={`transition-all relative group flex items-center ${
                          isCollapsed
                            ? 'w-9 h-9 justify-center rounded-xl p-0'
                            : 'w-full justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold'
                        } ${
                          isActive
                            ? 'bg-white border border-[#E5E7EB] text-[#111827] font-bold shadow-xs'
                            : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F5F7]'
                        }`}
                      >
                        {isCollapsed ? (
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? 'text-[#2563EB]' : 'text-[#6B7280] group-hover:text-[#111827]'
                            }`}
                          />
                        ) : (
                          <>
                            <div className="flex items-center gap-2.5 truncate">
                              <Icon
                                className={`w-4 h-4 shrink-0 transition-colors ${
                                  isActive ? 'text-[#111827]' : 'text-[#6B7280] group-hover:text-[#111827]'
                                }`}
                              />
                              <span className="truncate">{item.label}</span>
                            </div>

                            {item.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#4B5563]">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}

                        {/* Tooltip for collapsed mode */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-[#18181B] text-white text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-xl z-50 font-medium">
                            {item.label}
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Help Center Link */}
        <div className={`border-t border-[#ECEEF1] ${isCollapsed ? 'p-2 flex justify-center' : 'p-3'}`}>
          <button
            onClick={() => navigate('/settings')}
            title="Help center"
            className={`flex items-center rounded-xl text-xs font-semibold text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F5F7] transition-colors ${
              isCollapsed ? 'w-9 h-9 justify-center p-0' : 'w-full gap-2 px-3 py-2'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#9CA3AF]" />
            {!isCollapsed && <span>Help center</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
