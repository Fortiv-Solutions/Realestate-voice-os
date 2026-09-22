import { Agent } from '../types';

export class AgentService {
  private static instance: AgentService;
  private agents: Agent[] = [];

  private constructor() {
    this.initDefaultAgents();
  }

  public static getInstance(): AgentService {
    if (!AgentService.instance) {
      AgentService.instance = new AgentService();
    }
    return AgentService.instance;
  }

  private initDefaultAgents() {
    this.agents = [
      {
        id: 'agent-1',
        name: 'Rahul — Ahmedabad Property Specialist',
        role: 'Property Acquisition & Owner Outreach Specialist',
        companyName: 'Fortiv Real Estate',
        status: 'ACTIVE',
        channel: 'Voice',
        type: 'Outbound',
        voiceId: 'voice-ind-m1',
        voiceName: 'Aarav (Natural Indian English)',
        voiceAccent: 'Indian English',
        voiceProvider: 'Fish Audio',
        languages: ['English', 'Hindi', 'Gujarati'],
        firstMessage: 'Hi, is this {{callee_name}}?',
        systemPrompt: `You are Rahul, a friendly, consultative property specialist calling on behalf of Fortiv Real Estate in Satellite & Prahlad Nagar, Ahmedabad.
Your purpose is to have a natural, human conversation with property owner {{callee_name}}, understand their property situation, determine whether they would consider selling for the right offer, and connect interested owners with our local area specialist.

Response Guidelines:
- Keep turns concise (under 25 words).
- Speak naturally and ask ONE question at a time.
- If owner says YES / Open to options: Fast-track to BHK specs -> Target Price -> 5-minute specialist handoff.
- If owner says NO / Not right now: Check Occupancy -> Investment context -> Target Price -> Zero-obligation market update.
- If owner challenges where number was acquired: Explain RERA-licensed active database.
- If owner challenges pricing knowledge: Explain price varies by floor and layout, which is why specialist checks verified registry sales.
- Strictly adhere to instant DNC compliance if requested.`,
        temperature: 0.4,
        speechSpeed: 1.0,
        interruptionSensitivity: 'Medium',
        maxCallDurationMinutes: 8,
        qualificationCriteria: {
          mustBeOwner: true,
          requireSellingTimeline: true,
          requireExpectedPrice: true,
          minimumBudget: '₹60 Lakhs',
        },
        metrics: {
          totalCalls: 6840,
          answerRate: 71.4,
          qualifiedLeads: 582,
          avgDurationSec: 248,
          callsToday: 428,
          activityScore: 94,
        },
        createdAt: '2026-08-10T10:00:00Z',
        updatedAt: '2026-09-22T08:30:00Z',
      },
      {
        id: 'agent-2',
        name: 'Priya — Luxury Villas & High-Ticket Resale',
        role: 'Premium Residential Consultant',
        companyName: 'Fortiv Real Estate',
        status: 'ACTIVE',
        channel: 'Voice',
        type: 'Outbound',
        voiceId: 'voice-ind-f1',
        voiceName: 'Aditi (Crisp Professional)',
        voiceAccent: 'Indian English',
        voiceProvider: 'Sarvam AI',
        languages: ['English', 'Hindi'],
        firstMessage: 'Hi {{callee_name}}, good morning!',
        systemPrompt: `You are Priya, a luxury property advisor for Fortiv Real Estate covering Bodakdev, Thaltej, and SG Highway.
You engage high-net-worth villa and large apartment owners with discreet, consultative buyer proposals.`,
        temperature: 0.3,
        speechSpeed: 0.98,
        interruptionSensitivity: 'Low',
        maxCallDurationMinutes: 10,
        qualificationCriteria: {
          mustBeOwner: true,
          requireSellingTimeline: true,
          requireExpectedPrice: true,
          minimumBudget: '₹1.5 Crore',
        },
        metrics: {
          totalCalls: 3410,
          answerRate: 67.8,
          qualifiedLeads: 412,
          avgDurationSec: 310,
          callsToday: 194,
          activityScore: 89,
        },
        createdAt: '2026-08-20T11:00:00Z',
        updatedAt: '2026-09-21T14:10:00Z',
      },
      {
        id: 'agent-3',
        name: 'James — Dubai & NRI Inbound Qualification',
        role: 'International & Off-Plan Specialist',
        companyName: 'White & Co / Fortiv Global',
        status: 'ACTIVE',
        channel: 'Voice',
        type: 'Blended',
        voiceId: 'voice-uk-m1',
        voiceName: 'George (British Conversational)',
        voiceAccent: 'British English',
        voiceProvider: 'ElevenLabs',
        languages: ['English'],
        firstMessage: 'Hi, is this {{callee_name}}?',
        systemPrompt: `You are James with White & Co / Fortiv Global. You handle high-intent inquiries and overseas investors exploring JVC, Downtown, and Ahmedabad premium properties.`,
        temperature: 0.35,
        speechSpeed: 1.05,
        interruptionSensitivity: 'Medium',
        maxCallDurationMinutes: 12,
        qualificationCriteria: {
          mustBeOwner: false,
          requireSellingTimeline: true,
          requireExpectedPrice: false,
        },
        metrics: {
          totalCalls: 2232,
          answerRate: 64.2,
          qualifiedLeads: 290,
          avgDurationSec: 285,
          callsToday: 112,
          activityScore: 91,
        },
        createdAt: '2026-09-01T09:00:00Z',
        updatedAt: '2026-09-22T06:00:00Z',
      }
    ];
  }

  public getAgents(): Agent[] {
    return [...this.agents];
  }

  public getAgentById(id: string): Agent | undefined {
    return this.agents.find(a => a.id === id);
  }

  public createAgent(agentData: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'metrics'>): Agent {
    const newAgent: Agent = {
      ...agentData,
      id: `agent-${Date.now()}`,
      metrics: {
        totalCalls: 0,
        answerRate: 0,
        qualifiedLeads: 0,
        avgDurationSec: 0,
        callsToday: 0,
        activityScore: 80,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.agents.unshift(newAgent);
    return newAgent;
  }

  public updateAgent(id: string, updates: Partial<Agent>): Agent | undefined {
    const index = this.agents.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    this.agents[index] = {
      ...this.agents[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.agents[index];
  }

  public toggleAgentStatus(id: string): Agent | undefined {
    const agent = this.getAgentById(id);
    if (!agent) return undefined;
    const newStatus = agent.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    return this.updateAgent(id, { status: newStatus });
  }
}

export const agentService = AgentService.getInstance();
