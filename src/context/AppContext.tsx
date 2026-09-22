import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Agent, CallRecord, Lead, Campaign, Contact, PropertyRecord, OwnerRecord } from '../types';
import { agentService } from '../services/agentService';
import { callService } from '../services/callService';
import { leadService } from '../services/leadService';
import { campaignService } from '../services/campaignService';
import { propertyService } from '../services/propertyService';

export type DateRange = 'last_30_days' | 'last_7_days' | 'last_90_days' | 'yesterday' | 'last_week';

interface AppContextType {
  currentRoute: string;
  routeParams: Record<string, string>;
  navigate: (route: string, params?: Record<string, string>) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  dateRangeLabel: string;
  
  // Data caches
  agents: Agent[];
  calls: CallRecord[];
  leads: Lead[];
  campaigns: Campaign[];
  contacts: Contact[];
  properties: PropertyRecord[];
  owners: OwnerRecord[];
  
  // Data Refreshers
  refreshAllData: () => void;
  
  // Modal states
  isTestCallOpen: boolean;
  openTestCallModal: (agentId?: string) => void;
  closeTestCallModal: () => void;
  testCallAgentId?: string;

  isCreateCampaignOpen: boolean;
  openCreateCampaignModal: () => void;
  closeCreateCampaignModal: () => void;

  isExportOpen: boolean;
  openExportModal: () => void;
  closeExportModal: () => void;

  isScheduleCallbackOpen: boolean;
  selectedLeadForCallback?: Lead;
  openScheduleCallbackModal: (lead: Lead) => void;
  closeScheduleCallbackModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const dateRangeLabels: Record<DateRange, string> = {
  last_30_days: 'Last 30 days',
  last_7_days: 'Last 7 days',
  last_90_days: 'Last 90 days',
  yesterday: 'Yesterday',
  last_week: 'Last week',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>('/dashboard');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});
  const [dateRange, setDateRange] = useState<DateRange>('last_30_days');

  // Loaded data
  const [agents, setAgents] = useState<Agent[]>([]);
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [properties, setProperties] = useState<PropertyRecord[]>([]);
  const [owners, setOwners] = useState<OwnerRecord[]>([]);

  // Modals
  const [isTestCallOpen, setIsTestCallOpen] = useState(false);
  const [testCallAgentId, setTestCallAgentId] = useState<string | undefined>();
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isScheduleCallbackOpen, setIsScheduleCallbackOpen] = useState(false);
  const [selectedLeadForCallback, setSelectedLeadForCallback] = useState<Lead | undefined>();

  const refreshAllData = () => {
    setAgents(agentService.getAgents());
    setCalls(callService.getCalls());
    setLeads(leadService.getLeads());
    setCampaigns(campaignService.getCampaigns());
    setContacts(campaignService.getContacts());
    setProperties(propertyService.getProperties());
    setOwners(propertyService.getOwners());
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const navigate = (route: string, params: Record<string, string> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTestCallModal = (agentId?: string) => {
    setTestCallAgentId(agentId || (agents[0] ? agents[0].id : undefined));
    setIsTestCallOpen(true);
  };

  const closeTestCallModal = () => {
    setIsTestCallOpen(false);
    setTestCallAgentId(undefined);
    refreshAllData();
  };

  const openCreateCampaignModal = () => setIsCreateCampaignOpen(true);
  const closeCreateCampaignModal = () => {
    setIsCreateCampaignOpen(false);
    refreshAllData();
  };

  const openExportModal = () => setIsExportOpen(true);
  const closeExportModal = () => setIsExportOpen(false);

  const openScheduleCallbackModal = (lead: Lead) => {
    setSelectedLeadForCallback(lead);
    setIsScheduleCallbackOpen(true);
  };

  const closeScheduleCallbackModal = () => {
    setIsScheduleCallbackOpen(false);
    setSelectedLeadForCallback(undefined);
    refreshAllData();
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigate,
        dateRange,
        setDateRange,
        dateRangeLabel: dateRangeLabels[dateRange],
        agents,
        calls,
        leads,
        campaigns,
        contacts,
        properties,
        owners,
        refreshAllData,
        isTestCallOpen,
        openTestCallModal,
        closeTestCallModal,
        testCallAgentId,
        isCreateCampaignOpen,
        openCreateCampaignModal,
        closeCreateCampaignModal,
        isExportOpen,
        openExportModal,
        closeExportModal,
        isScheduleCallbackOpen,
        selectedLeadForCallback,
        openScheduleCallbackModal,
        closeScheduleCallbackModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
