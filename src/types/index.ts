export type LeadStatus = 'HOT' | 'WARM' | 'COLD' | 'CALLBACK' | 'DNC';

export type CallOutcome = 
  | 'Answered - Qualified'
  | 'Answered - Follow Up'
  | 'Answered - Not Interested'
  | 'Answered - DNC'
  | 'Unanswered - Busy'
  | 'Unanswered - No Answer'
  | 'Canceled';

export type PropertyType = '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | 'Villa' | 'Plot' | 'Commercial Office';

export interface Agent {
  id: string;
  name: string;
  role: string;
  companyName: string;
  status: 'ACTIVE' | 'PAUSED' | 'DRAFT';
  channel: 'Voice' | 'WhatsApp' | 'Omnichannel';
  type: 'Outbound' | 'Inbound' | 'Blended';
  voiceId: string;
  voiceName: string;
  voiceAccent: 'Indian English' | 'Hindi' | 'Gujarati' | 'British English' | 'US English';
  voiceProvider: 'Fish Audio' | 'Sarvam AI' | 'ElevenLabs' | 'Cartesia Sonic';
  languages: string[];
  systemPrompt: string;
  firstMessage: string;
  temperature: number;
  speechSpeed: number;
  interruptionSensitivity: 'Low' | 'Medium' | 'High';
  maxCallDurationMinutes: number;
  qualificationCriteria: {
    minimumBudget?: string;
    mustBeOwner: boolean;
    requireSellingTimeline: boolean;
    requireExpectedPrice: boolean;
  };
  metrics: {
    totalCalls: number;
    answerRate: number;
    qualifiedLeads: number;
    avgDurationSec: number;
    callsToday: number;
    activityScore: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptEntry {
  id: string;
  speaker: 'AI' | 'OWNER' | 'SYSTEM';
  speakerName: string;
  text: string;
  timestamp: string; // e.g. "00:14"
  timeSec: number;
  sentiment?: 'positive' | 'neutral' | 'skeptical' | 'hostile';
  intentDetected?: string;
}

export interface ExtractedPropertyData {
  ownerName?: string;
  propertyLocation?: string;
  propertyType?: PropertyType;
  bedrooms?: number;
  propertySizeSqFt?: number;
  occupancy?: 'Owner-Occupied' | 'Rented Out' | 'Vacant';
  rentalYield?: string;
  ownershipDurationYears?: number;
  sellingIntent: 'Immediate' | 'Near Future' | 'Unlikely' | 'Not Selling' | 'Undecided';
  sellingReason?: string;
  futureSellingPossibility?: boolean;
  sellingTimeline?: string;
  expectedPrice?: string;
  marketEstimatedPrice?: string;
  otherPropertiesInCity?: boolean;
  callbackTimeWindow?: string;
  humanHandoffRequested?: boolean;
  dncRequested?: boolean;
  aiNotes?: string;
  qualificationScore: number; // 0 - 100
}

export interface CustomVariableItem {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'null' | 'array';
  value: string;
}

export interface CallDetailsTelemetry {
  callLatencySec: number;
  firstUtteranceSec: number;
  callDurationSec: number;
  callStartedAtFormatted: string;
  callEndedAtFormatted: string;
  fromNumber: string;
  costInr: number;
  origin: string;
  callStatusReason: string;
  classification: string;
  customVariables: CustomVariableItem[];
  keyPoints: string[];
  actionItems: string[];
  summaryNarrative: string;
  sentimentLabel: 'neutral' | 'positive' | 'skeptical' | 'hostile' | 'curious';
  sentimentReason: string;
  callbackRequested: boolean;
  callbackRequestedTime: string | null;
  callbackRequestedViaHuman: boolean;
}

export interface CallRecord {
  id: string;
  callUuid?: string;
  agentId: string;
  agentName: string;
  campaignId?: string;
  campaignName?: string;
  contactId: string;
  ownerName: string;
  phoneNumber: string;
  propertyAddress: string;
  propertyLocality: string;
  propertyCity: string;
  propertyType: PropertyType;
  callDate: string; // ISO or formatted
  durationSec: number;
  durationFormatted: string; // "3m 42s"
  outcome: CallOutcome;
  leadStatus: LeadStatus;
  sentimentScore: number; // -1.0 to 1.0
  recordingUrl?: string;
  crmSynced: boolean;
  transcript: TranscriptEntry[];
  extractedData: ExtractedPropertyData;
  telemetry?: CallDetailsTelemetry;
}

export interface Lead {
  id: string;
  ownerName: string;
  phone: string;
  email?: string;
  status: LeadStatus;
  propertyType: PropertyType;
  locality: string;
  city: string;
  expectedPrice: string;
  estimatedMarketPrice: string;
  occupancy: 'Owner-Occupied' | 'Rented Out' | 'Vacant';
  sellingTimeline: string;
  qualificationScore: number;
  lastContactedAt: string;
  assignedAgentName: string;
  assignedHumanSpecialist?: string;
  notes: string;
  totalCallsMade: number;
  lastCallId?: string;
}

export interface Campaign {
  id: string;
  name: string;
  agentId: string;
  agentName: string;
  status: 'ACTIVE' | 'SCHEDULED' | 'PAUSED' | 'COMPLETED';
  totalContacts: number;
  calledCount: number;
  answeredCount: number;
  qualifiedCount: number;
  answerRate: number;
  conversionRate: number;
  locality: string;
  city: string;
  targetPropertyType: string;
  startDate: string;
  dailyCallLimit: number;
  concurrencyLimit: number;
  callingHours: string; // e.g., "10:00 AM - 07:00 PM IST"
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyType: PropertyType;
  locality: string;
  city: string;
  projectBuilding: string;
  unitNumber?: string;
  estimatedValue: string;
  status: 'Not Called' | 'Calling' | 'Contacted' | 'Qualified' | 'DNC';
  lastCampaignName?: string;
}

export interface PropertyRecord {
  id: string;
  title: string;
  ownerName: string;
  ownerPhone: string;
  propertyType: PropertyType;
  locality: string;
  city: string;
  carpetAreaSqFt: number;
  askingPrice: string;
  marketValuation: string;
  occupancyStatus: 'Owner-Occupied' | 'Rented Out' | 'Vacant';
  currentRentMonthly?: string;
  status: 'Active' | 'Under Offer' | 'Sold' | 'Evaluation' | 'DNC';
  tags: string[];
}

export interface OwnerRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  propertiesOwnedCount: number;
  totalPortfolioValue: string;
  lastInteraction: string;
  leadStatus: LeadStatus;
  assignedBroker: string;
}

export interface Integration {
  id: string;
  name: string;
  category: 'CRM' | 'Workflow Engine' | 'Voice Synthesis' | 'ASR / Speech' | 'Telephony' | 'LLM Provider';
  provider: string;
  status: 'Active' | 'Configurable' | 'Not Connected';
  description: string;
  badgeType: 'active' | 'configurable' | 'disconnected';
  icon: string;
}

export interface ConversationMetricSummary {
  conversationsAnalyzed: number;
  intentDetectedRate: number;
  qualificationRate: number;
  humanHandoffRate: number;
  averageObjectionPerCall: number;
  topObjections: { objection: string; count: number; resolveRate: number }[];
  intentDistribution: { intent: string; percentage: number; count: number }[];
  topLocalities: { locality: string; volume: number; avgExpectedPrice: string }[];
}
