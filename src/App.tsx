import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import { AgentsPage } from './pages/AgentsPage';
import { AgentDetailPage } from './pages/AgentDetailPage';
import { CreateAgentPage } from './pages/CreateAgentPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { ContactsPage } from './pages/ContactsPage';
import { CallLogsPage } from './pages/CallLogsPage';
import { CallDetailPage } from './pages/CallDetailPage';
import { LeadsPage } from './pages/LeadsPage';
import { OwnersPage } from './pages/OwnersPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AIIntelligencePage } from './pages/AIIntelligencePage';
import { PhoneNumbersPage } from './pages/PhoneNumbersPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { SettingsPage } from './pages/SettingsPage';

// Modals
import { TestCallModal } from './components/modals/TestCallModal';
import { CreateCampaignModal } from './components/modals/CreateCampaignModal';
import { ExportModal } from './components/modals/ExportModal';
import { ScheduleCallbackModal } from './components/modals/ScheduleCallbackModal';

export const AppContent: React.FC = () => {
  const { currentRoute } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Router dispatcher
  const renderCurrentPage = () => {
    if (currentRoute === '/dashboard') {
      return <DashboardPage />;
    }
    if (currentRoute === '/agents/new') {
      return <CreateAgentPage />;
    }
    if (currentRoute.startsWith('/agents/') && currentRoute !== '/agents') {
      const agentId = currentRoute.replace('/agents/', '');
      return <AgentDetailPage agentId={agentId} />;
    }
    if (currentRoute === '/agents') {
      return <AgentsPage />;
    }
    if (currentRoute === '/campaigns' || currentRoute.startsWith('/campaigns/')) {
      return <CampaignsPage />;
    }
    if (currentRoute === '/contacts') {
      return <ContactsPage />;
    }
    if (currentRoute.startsWith('/calls/') && currentRoute !== '/calls' && currentRoute !== '/calls/live') {
      const callId = currentRoute.replace('/calls/', '');
      return <CallDetailPage callId={callId} />;
    }
    if (currentRoute === '/calls' || currentRoute === '/calls/live') {
      return <CallLogsPage />;
    }
    if (currentRoute === '/leads' || currentRoute.startsWith('/leads/')) {
      return <LeadsPage />;
    }
    if (currentRoute === '/owners') {
      return <OwnersPage />;
    }
    if (currentRoute === '/properties') {
      return <PropertiesPage />;
    }
    if (currentRoute.startsWith('/analytics')) {
      const sub = currentRoute.replace('/analytics/', '').replace('/analytics', '') || 'calls';
      return <AnalyticsPage initialSubTab={sub} />;
    }
    if (currentRoute === '/intelligence' || currentRoute === '/evals') {
      const sub = currentRoute === '/evals' ? 'evals' : 'intelligence';
      return <AIIntelligencePage initialSubTab={sub} />;
    }
    if (currentRoute === '/knowledge-base') {
      return <AIIntelligencePage initialSubTab="knowledge_base" />;
    }
    if (currentRoute === '/phone-numbers') {
      return <PhoneNumbersPage />;
    }
    if (currentRoute === '/integrations') {
      return <IntegrationsPage />;
    }
    if (currentRoute === '/settings') {
      return <SettingsPage />;
    }

    return <DashboardPage />;
  };

  const getPageMeta = () => {
    if (currentRoute === '/dashboard') {
      return {
        title: 'Dashboard',
        subtitle: 'Monitor your AI calling operations, property-owner leads and real-estate intelligence.',
        showCreateCampaign: true,
      };
    }
    if (currentRoute === '/agents') {
      return {
        title: 'AI Voice Agents',
        subtitle: 'Manage and fine-tune your real-estate AI voice consultants',
        showCreateCampaign: false,
        showCreateAgent: true,
      };
    }
    if (currentRoute === '/agents/new') {
      return {
        title: 'Create AI Agent',
        subtitle: 'Configure persona, voice model, and qualification gates',
        showCreateCampaign: false,
      };
    }
    if (currentRoute.startsWith('/agents/')) {
      return {
        title: 'Agent Intelligence Studio',
        subtitle: 'Fine-tune system prompts, voice latency, and real-time parameters',
        showCreateCampaign: false,
      };
    }
    if (currentRoute === '/campaigns') {
      return {
        title: 'Calling Campaigns',
        subtitle: 'Automated outbound property owner acquisition pipelines',
        showCreateCampaign: true,
      };
    }
    if (currentRoute === '/contacts') {
      return {
        title: 'Contacts Directory',
        subtitle: 'Verified property owners database across Ahmedabad',
        showCreateCampaign: false,
      };
    }
    if (currentRoute.startsWith('/calls/') && currentRoute !== '/calls') {
      return {
        title: 'Call Intelligence Review',
        subtitle: 'Detailed audio playback, transcript, and qualification extraction',
        showCreateCampaign: false,
      };
    }
    if (currentRoute === '/calls' || currentRoute === '/calls/live') {
      return {
        title: 'Call Logs & Transcripts',
        subtitle: 'Complete calling history, durations, sentiment, and AI tags',
        showCreateCampaign: false,
      };
    }
    if (currentRoute === '/leads') {
      return {
        title: 'Property Owner Leads',
        subtitle: 'HOT, WARM, COLD, CALLBACK & DNC CRM pipeline',
        showCreateCampaign: true,
      };
    }
    if (currentRoute === '/owners') {
      return {
        title: 'Property Owners',
        subtitle: 'Portfolio tracking and broker assignments',
        showCreateCampaign: false,
      };
    }
    if (currentRoute === '/properties') {
      return {
        title: 'Property Inventory',
        subtitle: 'Residential & commercial assets database',
        showCreateCampaign: false,
      };
    }
    if (currentRoute.startsWith('/analytics')) {
      return {
        title: 'Analytics & Insights',
        subtitle: 'Operational velocity, channel distribution, and conversion funnels',
        showCreateCampaign: false,
      };
    }
    if (currentRoute === '/intelligence' || currentRoute === '/evals') {
      return {
        title: 'Conversation Intelligence',
        subtitle: 'Real-time entity extraction and sentiment precision',
        showCreateCampaign: false,
      };
    }
    if (currentRoute === '/knowledge-base') {
      return {
        title: 'Knowledge Base',
        subtitle: 'Market reports and objection handling playbooks for AI models',
        showCreateCampaign: false,
      };
    }
    if (currentRoute === '/phone-numbers') {
      return {
        title: 'Phone Numbers & DIDs',
        subtitle: 'Carrier routing, caller ID reputation, and number health',
        showCreateCampaign: false,
      };
    }
    if (currentRoute === '/integrations') {
      return {
        title: 'System Integrations',
        subtitle: 'Native CRM, workflow engine, and voice provider connections',
        showCreateCampaign: false,
      };
    }
    if (currentRoute === '/settings') {
      return {
        title: 'Settings',
        subtitle: 'Platform configuration, RERA compliance, and global limits',
        showCreateCampaign: false,
      };
    }

    return {
      title: 'Dashboard',
      subtitle: 'Monitor your AI calling operations, property-owner leads and real-estate intelligence.',
      showCreateCampaign: true,
    };
  };

  const meta = getPageMeta();

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#111827]">
      {/* Collapsible & Openable Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-[76px]' : 'lg:pl-64'
      }`}>
        {/* Top Header */}
        <Header
          onMenuToggle={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 1024) {
              setIsSidebarOpen(!isSidebarOpen);
            } else {
              setIsSidebarCollapsed(!isSidebarCollapsed);
            }
          }}
          isSidebarCollapsed={isSidebarCollapsed}
          title={meta.title}
          subtitle={meta.subtitle}
          showCreateCampaignButton={meta.showCreateCampaign}
          showCreateAgentButton={meta.showCreateAgent}
        />

        {/* Page Content View */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 w-full">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Global Modals */}
      <TestCallModal />
      <CreateCampaignModal />
      <ExportModal />
      <ScheduleCallbackModal />
    </div>
  );
};
