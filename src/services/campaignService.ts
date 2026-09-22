import { Campaign, Contact } from '../types';

export class CampaignService {
  private static instance: CampaignService;
  private campaigns: Campaign[] = [];
  private contacts: Contact[] = [];

  private constructor() {
    this.initDefaultCampaigns();
    this.initDefaultContacts();
  }

  public static getInstance(): CampaignService {
    if (!CampaignService.instance) {
      CampaignService.instance = new CampaignService();
    }
    return CampaignService.instance;
  }

  private initDefaultCampaigns() {
    this.campaigns = [
      {
        id: 'camp-1',
        name: 'Satellite & Prahlad Nagar High-Intent Resale',
        agentId: 'agent-1',
        agentName: 'Rahul — Ahmedabad Property Specialist',
        status: 'ACTIVE',
        totalContacts: 5000,
        calledCount: 3842,
        answeredCount: 2743,
        qualifiedCount: 386,
        answerRate: 71.4,
        conversionRate: 14.1,
        locality: 'Satellite & Prahlad Nagar',
        city: 'Ahmedabad',
        targetPropertyType: '2 & 3 BHK Apartments',
        startDate: '2026-09-01',
        dailyCallLimit: 400,
        concurrencyLimit: 12,
        callingHours: '10:00 AM - 06:30 PM IST',
      },
      {
        id: 'camp-2',
        name: 'Bodakdev & Thaltej Ultra-Luxury Villas',
        agentId: 'agent-2',
        agentName: 'Priya — Luxury Villas & High-Ticket Resale',
        status: 'ACTIVE',
        totalContacts: 1200,
        calledCount: 840,
        answeredCount: 570,
        qualifiedCount: 118,
        answerRate: 67.8,
        conversionRate: 20.7,
        locality: 'Bodakdev & Thaltej',
        city: 'Ahmedabad',
        targetPropertyType: 'Independent Bungalows & 4+ BHK',
        startDate: '2026-09-10',
        dailyCallLimit: 150,
        concurrencyLimit: 6,
        callingHours: '11:00 AM - 07:00 PM IST',
      },
      {
        id: 'camp-3',
        name: 'Bopal & South Bopal New-Age Investors',
        agentId: 'agent-1',
        agentName: 'Rahul — Ahmedabad Property Specialist',
        status: 'PAUSED',
        totalContacts: 3500,
        calledCount: 1420,
        answeredCount: 965,
        qualifiedCount: 104,
        answerRate: 68.0,
        conversionRate: 10.8,
        locality: 'South Bopal',
        city: 'Ahmedabad',
        targetPropertyType: '2 BHK Resale & Under-Construction',
        startDate: '2026-09-15',
        dailyCallLimit: 300,
        concurrencyLimit: 8,
        callingHours: '10:30 AM - 06:00 PM IST',
      }
    ];
  }

  private initDefaultContacts() {
    this.contacts = [
      {
        id: 'contact-1',
        name: 'Rajesh Patel',
        phone: '+91 98250 44192',
        email: 'rajesh.patel@gmail.com',
        propertyType: '3 BHK',
        locality: 'Satellite',
        city: 'Ahmedabad',
        projectBuilding: 'Iscon Elegance',
        unitNumber: 'B-702',
        estimatedValue: '₹1.35 Cr',
        status: 'Qualified',
        lastCampaignName: 'Satellite & Prahlad Nagar High-Intent Resale',
      },
      {
        id: 'contact-2',
        name: 'Amit Shah',
        phone: '+91 98980 12839',
        email: 'amit.shah.invest@yahoo.co.in',
        propertyType: '2 BHK',
        locality: 'Bopal',
        city: 'Ahmedabad',
        projectBuilding: 'Gala Haven',
        unitNumber: 'A-401',
        estimatedValue: '₹78 L',
        status: 'Contacted',
        lastCampaignName: 'Bopal & South Bopal New-Age Investors',
      },
      {
        id: 'contact-3',
        name: 'Neha Joshi',
        phone: '+91 97245 88123',
        email: 'neha.joshi@designstudio.in',
        propertyType: 'Villa',
        locality: 'Bodakdev',
        city: 'Ahmedabad',
        projectBuilding: 'Sun Villa Enclave',
        unitNumber: 'Villa 14',
        estimatedValue: '₹5.0 Cr',
        status: 'Qualified',
        lastCampaignName: 'Bodakdev & Thaltej Ultra-Luxury Villas',
      },
      {
        id: 'contact-4',
        name: 'Karan Mehta',
        phone: '+91 98240 77319',
        email: 'karan.mehta@titaniumgroup.com',
        propertyType: 'Commercial Office',
        locality: 'Prahlad Nagar',
        city: 'Ahmedabad',
        projectBuilding: 'Titanium City Centre',
        unitNumber: '302',
        estimatedValue: '₹1.10 Cr',
        status: 'DNC',
        lastCampaignName: 'Satellite & Prahlad Nagar High-Intent Resale',
      },
      {
        id: 'contact-5',
        name: 'Mehul Desai',
        phone: '+91 99099 33211',
        email: 'mehul.desai@tcs.com',
        propertyType: '3 BHK',
        locality: 'SG Highway',
        city: 'Ahmedabad',
        projectBuilding: 'Godrej Garden City',
        unitNumber: 'C-904',
        estimatedValue: '₹95 L',
        status: 'Contacted',
        lastCampaignName: 'Satellite & Prahlad Nagar High-Intent Resale',
      },
      {
        id: 'contact-6',
        name: 'Priya Shah',
        phone: '+91 98255 11984',
        email: 'priya.shah@gmail.com',
        propertyType: '4 BHK',
        locality: 'Thaltej',
        city: 'Ahmedabad',
        projectBuilding: 'Shivalik Shilp',
        unitNumber: 'Penthouse 1201',
        estimatedValue: '₹2.8 Cr',
        status: 'Not Called',
        lastCampaignName: 'Bodakdev & Thaltej Ultra-Luxury Villas',
      },
      {
        id: 'contact-7',
        name: 'Rohan Patel',
        phone: '+91 98982 77610',
        email: 'rohan.patel@cadila.com',
        propertyType: '3 BHK',
        locality: 'Prahlad Nagar',
        city: 'Ahmedabad',
        projectBuilding: 'Dev Aurum',
        unitNumber: 'D-503',
        estimatedValue: '₹1.45 Cr',
        status: 'Calling',
        lastCampaignName: 'Satellite & Prahlad Nagar High-Intent Resale',
      },
      {
        id: 'contact-8',
        name: 'Dhruv Shah',
        phone: '+91 98251 90812',
        email: 'dhruv.shah@adityabirla.com',
        propertyType: '2 BHK',
        locality: 'Gota',
        city: 'Ahmedabad',
        projectBuilding: 'Shayona City',
        unitNumber: 'F-201',
        estimatedValue: '₹55 L',
        status: 'Contacted',
      }
    ];
  }

  public getCampaigns(): Campaign[] {
    return [...this.campaigns];
  }

  public getCampaignById(id: string): Campaign | undefined {
    return this.campaigns.find(c => c.id === id);
  }

  public toggleCampaignStatus(id: string): Campaign | undefined {
    const camp = this.getCampaignById(id);
    if (!camp) return undefined;
    camp.status = camp.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    return camp;
  }

  public createCampaign(data: Omit<Campaign, 'id' | 'calledCount' | 'answeredCount' | 'qualifiedCount' | 'answerRate' | 'conversionRate'>): Campaign {
    const newCamp: Campaign = {
      ...data,
      id: `camp-${Date.now()}`,
      calledCount: 0,
      answeredCount: 0,
      qualifiedCount: 0,
      answerRate: 0,
      conversionRate: 0,
    };
    this.campaigns.unshift(newCamp);
    return newCamp;
  }

  public getContacts(): Contact[] {
    return [...this.contacts];
  }
}

export const campaignService = CampaignService.getInstance();
