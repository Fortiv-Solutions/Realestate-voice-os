import { Lead, LeadStatus, PropertyType } from '../types';

export class LeadService {
  private static instance: LeadService;
  private leads: Lead[] = [];

  private constructor() {
    this.initDefaultLeads();
  }

  public static getInstance(): LeadService {
    if (!LeadService.instance) {
      LeadService.instance = new LeadService();
    }
    return LeadService.instance;
  }

  private initDefaultLeads() {
    this.leads = [
      {
        id: 'lead-1',
        ownerName: 'Rajesh Patel',
        phone: '+91 98250 44192',
        email: 'rajesh.patel@gmail.com',
        status: 'HOT',
        propertyType: '3 BHK',
        locality: 'Satellite',
        city: 'Ahmedabad',
        expectedPrice: '₹1.35 Crore',
        estimatedMarketPrice: '₹1.28 - ₹1.40 Crore',
        occupancy: 'Owner-Occupied',
        sellingTimeline: '2 to 3 months',
        qualificationScore: 92,
        lastContactedAt: '2026-09-22T14:15:00Z',
        assignedAgentName: 'Rahul — AI Voice Specialist',
        assignedHumanSpecialist: 'Vikram Joshi (Satellite Desk)',
        notes: 'Target ₹1.35 Cr for 1,850 sq ft unit in Iscon Elegance. Morning callback requested before 2 PM.',
        totalCallsMade: 1,
        lastCallId: 'call-101',
      },
      {
        id: 'lead-2',
        ownerName: 'Neha Joshi',
        phone: '+91 97245 88123',
        email: 'neha.joshi@designstudio.in',
        status: 'HOT',
        propertyType: 'Villa',
        locality: 'Bodakdev',
        city: 'Ahmedabad',
        expectedPrice: '₹5.0 Crore',
        estimatedMarketPrice: '₹4.6 - ₹5.2 Crore',
        occupancy: 'Owner-Occupied',
        sellingTimeline: 'Immediate (Downsizing)',
        qualificationScore: 98,
        lastContactedAt: '2026-09-22T11:20:00Z',
        assignedAgentName: 'Priya — AI Voice Specialist',
        assignedHumanSpecialist: 'Ananya Sharma (Luxury Portfolio Lead)',
        notes: 'Ultra-luxury 500 sq yd plot villa in Sun Villa Enclave. Meeting scheduled Thursday 4 PM.',
        totalCallsMade: 1,
        lastCallId: 'call-103',
      },
      {
        id: 'lead-3',
        ownerName: 'Amit Shah',
        phone: '+91 98980 12839',
        email: 'amit.shah.invest@yahoo.co.in',
        status: 'WARM',
        propertyType: '2 BHK',
        locality: 'Bopal',
        city: 'Ahmedabad',
        expectedPrice: '₹78 Lakhs',
        estimatedMarketPrice: '₹72 - ₹80 Lakhs',
        occupancy: 'Rented Out',
        sellingTimeline: '3 to 6 months',
        qualificationScore: 78,
        lastContactedAt: '2026-09-22T13:40:00Z',
        assignedAgentName: 'Rahul — AI Voice Specialist',
        assignedHumanSpecialist: 'Suresh Parmar',
        notes: 'Currently earning ₹24,000/mo rental. Willing to exit at ₹78L to reinvest into commercial office.',
        totalCallsMade: 1,
        lastCallId: 'call-102',
      },
      {
        id: 'lead-4',
        ownerName: 'Mehul Desai',
        phone: '+91 99099 33211',
        email: 'mehul.desai@tcs.com',
        status: 'WARM',
        propertyType: '3 BHK',
        locality: 'SG Highway',
        city: 'Ahmedabad',
        expectedPrice: '₹95 Lakhs',
        estimatedMarketPrice: '₹88 - ₹96 Lakhs',
        occupancy: 'Rented Out',
        sellingTimeline: 'Post Diwali (Nov 2026)',
        qualificationScore: 74,
        lastContactedAt: '2026-09-22T09:30:00Z',
        assignedAgentName: 'Rahul — AI Voice Specialist',
        assignedHumanSpecialist: 'Vikram Joshi',
        notes: 'Unit in Godrej Garden City. Tenant lease ending in November.',
        totalCallsMade: 1,
        lastCallId: 'call-105',
      },
      {
        id: 'lead-5',
        ownerName: 'Pooja Trivedi',
        phone: '+91 98795 62145',
        email: 'pooja.trivedi@outlook.com',
        status: 'CALLBACK',
        propertyType: '4 BHK',
        locality: 'Prahlad Nagar',
        city: 'Ahmedabad',
        expectedPrice: '₹2.1 Crore',
        estimatedMarketPrice: '₹1.95 - ₹2.2 Crore',
        occupancy: 'Owner-Occupied',
        sellingTimeline: 'Exploring options',
        qualificationScore: 68,
        lastContactedAt: '2026-09-21T16:00:00Z',
        assignedAgentName: 'Rahul — AI Voice Specialist',
        assignedHumanSpecialist: 'Vikram Joshi',
        notes: 'In a meeting during call. Asked for callback on Saturday afternoon.',
        totalCallsMade: 2,
      },
      {
        id: 'lead-6',
        ownerName: 'Dhruv Shah',
        phone: '+91 98251 90812',
        status: 'COLD',
        propertyType: '2 BHK',
        locality: 'Gota',
        city: 'Ahmedabad',
        expectedPrice: '₹55 Lakhs',
        estimatedMarketPrice: '₹48 - ₹52 Lakhs',
        occupancy: 'Vacant',
        sellingTimeline: 'Unlikely / High Price',
        qualificationScore: 42,
        lastContactedAt: '2026-09-20T12:00:00Z',
        assignedAgentName: 'Rahul — AI Voice Specialist',
        notes: 'Owner firm on ₹55L, above current Gota sub-market comps.',
        totalCallsMade: 2,
      },
      {
        id: 'lead-7',
        ownerName: 'Karan Mehta',
        phone: '+91 98240 77319',
        status: 'DNC',
        propertyType: 'Commercial Office',
        locality: 'Prahlad Nagar',
        city: 'Ahmedabad',
        expectedPrice: 'N/A',
        estimatedMarketPrice: '₹1.10 Crore',
        occupancy: 'Owner-Occupied',
        sellingTimeline: 'Not Selling',
        qualificationScore: 0,
        lastContactedAt: '2026-09-22T10:05:00Z',
        assignedAgentName: 'Rahul — AI Voice Specialist',
        notes: 'DNC requested. Phone number blacklisted across all campaigns.',
        totalCallsMade: 1,
        lastCallId: 'call-104',
      }
    ];
  }

  public getLeads(): Lead[] {
    return [...this.leads];
  }

  public getLeadById(id: string): Lead | undefined {
    return this.leads.find(l => l.id === id);
  }

  public updateLeadStatus(id: string, status: LeadStatus): Lead | undefined {
    const lead = this.getLeadById(id);
    if (!lead) return undefined;
    lead.status = status;
    return lead;
  }

  public assignSpecialist(id: string, specialistName: string): Lead | undefined {
    const lead = this.getLeadById(id);
    if (!lead) return undefined;
    lead.assignedHumanSpecialist = specialistName;
    return lead;
  }

  public createOrUpdateLeadFromCall(
    ownerName: string,
    phone: string,
    propertyType: PropertyType,
    locality: string,
    expectedPrice: string,
    status: LeadStatus,
    score: number,
    notes: string,
    callId: string
  ): Lead {
    const existing = this.leads.find(l => l.phone === phone);
    if (existing) {
      existing.status = status;
      existing.qualificationScore = score;
      existing.notes = `${existing.notes}\n[Update]: ${notes}`;
      existing.lastContactedAt = new Date().toISOString();
      existing.totalCallsMade += 1;
      existing.lastCallId = callId;
      if (expectedPrice && expectedPrice !== 'N/A') existing.expectedPrice = expectedPrice;
      return existing;
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      ownerName,
      phone,
      status,
      propertyType,
      locality,
      city: 'Ahmedabad',
      expectedPrice: expectedPrice || '₹1.10 Crore',
      estimatedMarketPrice: '₹1.00 - ₹1.25 Crore',
      occupancy: 'Owner-Occupied',
      sellingTimeline: status === 'HOT' ? '1 to 3 months' : 'Exploring',
      qualificationScore: score,
      lastContactedAt: new Date().toISOString(),
      assignedAgentName: 'Rahul — AI Voice Specialist',
      assignedHumanSpecialist: 'Vikram Joshi (Satellite Desk)',
      notes,
      totalCallsMade: 1,
      lastCallId: callId,
    };
    this.leads.unshift(newLead);
    return newLead;
  }
}

export const leadService = LeadService.getInstance();
