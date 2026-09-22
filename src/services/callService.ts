import { CallRecord, CallOutcome, LeadStatus } from '../types';

export class CallService {
  private static instance: CallService;
  private calls: CallRecord[] = [];

  private constructor() {
    this.initDefaultCalls();
  }

  public static getInstance(): CallService {
    if (!CallService.instance) {
      CallService.instance = new CallService();
    }
    return CallService.instance;
  }

  private initDefaultCalls() {
    this.calls = [
      {
        id: 'call-101',
        agentId: 'agent-1',
        agentName: 'Rahul — Ahmedabad Property Specialist',
        campaignId: 'camp-1',
        campaignName: 'Satellite & Prahlad Nagar High-Intent Resale',
        contactId: 'contact-1',
        ownerName: 'Rajesh Patel',
        phoneNumber: '+91 98250 44192',
        propertyAddress: 'Block B-702, Iscon Elegance',
        propertyLocality: 'Satellite',
        propertyCity: 'Ahmedabad',
        propertyType: '3 BHK',
        callDate: '2026-09-22T14:15:00Z',
        durationSec: 272,
        durationFormatted: '4m 32s',
        outcome: 'Answered - Qualified',
        leadStatus: 'HOT',
        sentimentScore: 0.82,
        crmSynced: true,
        transcript: [
          { id: 't1', speaker: 'AI', speakerName: 'Rahul', text: 'Hi, is this Rajesh Patel?', timestamp: '00:02', timeSec: 2, sentiment: 'neutral' },
          { id: 't2', speaker: 'OWNER', speakerName: 'Rajesh Patel', text: 'Yes, speaking. Who is this?', timestamp: '00:06', timeSec: 6, sentiment: 'neutral' },
          { id: 't3', speaker: 'AI', speakerName: 'Rahul', text: 'Hi Rajesh bhai, I’m Rahul with Fortiv Real Estate. We’re working with active pre-qualified buyers in Satellite—would you consider selling your 3 BHK in Iscon Elegance if we brought the right offer?', timestamp: '00:15', timeSec: 15, sentiment: 'positive' },
          { id: 't4', speaker: 'OWNER', speakerName: 'Rajesh Patel', text: 'Well, not immediately, but if the pricing is right, maybe in the next 2 to 3 months.', timestamp: '00:27', timeSec: 27, sentiment: 'positive', intentDetected: 'selling_interest_positive' },
          { id: 't5', speaker: 'AI', speakerName: 'Rahul', text: 'Makes total sense. Are you currently living there yourself, or is it rented out?', timestamp: '00:36', timeSec: 36, sentiment: 'neutral' },
          { id: 't6', speaker: 'OWNER', speakerName: 'Rajesh Patel', text: 'I am living there with my family.', timestamp: '00:43', timeSec: 43, sentiment: 'neutral', intentDetected: 'occupancy_provided' },
          { id: 't7', speaker: 'AI', speakerName: 'Rahul', text: 'Got it, owner-occupied. If you did decide to move on, is there a target price that would make you seriously consider an offer?', timestamp: '00:54', timeSec: 54, sentiment: 'neutral' },
          { id: 't8', speaker: 'OWNER', speakerName: 'Rajesh Patel', text: 'Looking at recent registry rates in Satellite, anything around 1.35 Crore would make sense.', timestamp: '01:08', timeSec: 68, sentiment: 'positive', intentDetected: 'expected_price_provided' },
          { id: 't9', speaker: 'AI', speakerName: 'Rahul', text: 'Around 1.35 Crore, understood. Would you be open to a quick 5-minute market update from our Satellite specialist with verified building comps? Zero obligation at all.', timestamp: '01:22', timeSec: 82, sentiment: 'positive' },
          { id: 't10', speaker: 'OWNER', speakerName: 'Rajesh Patel', text: 'Sure, that works. Call me tomorrow morning before 2 PM.', timestamp: '01:34', timeSec: 94, sentiment: 'positive', intentDetected: 'time_window_confirmed' },
          { id: 't11', speaker: 'AI', speakerName: 'Rahul', text: 'Perfect, I have noted tomorrow morning before 2 PM. Our specialist will call you around then. Have a wonderful day, Rajesh bhai!', timestamp: '01:45', timeSec: 105, sentiment: 'positive' },
        ],
        extractedData: {
          ownerName: 'Rajesh Patel',
          propertyLocation: 'Satellite, Ahmedabad',
          propertyType: '3 BHK',
          bedrooms: 3,
          propertySizeSqFt: 1850,
          occupancy: 'Owner-Occupied',
          ownershipDurationYears: 5,
          sellingIntent: 'Near Future',
          sellingTimeline: '2 to 3 months',
          expectedPrice: '₹1.35 Crore',
          marketEstimatedPrice: '₹1.28 - ₹1.40 Crore',
          otherPropertiesInCity: false,
          callbackTimeWindow: 'Tomorrow morning before 2 PM',
          humanHandoffRequested: true,
          dncRequested: false,
          qualificationScore: 92,
          aiNotes: 'Highly qualified owner. Responsive and realistic about ₹1.35 Cr target. Handoff to Satellite desk for morning callback.',
        },
      },
      {
        id: 'call-102',
        agentId: 'agent-1',
        agentName: 'Rahul — Ahmedabad Property Specialist',
        campaignId: 'camp-1',
        campaignName: 'Satellite & Prahlad Nagar High-Intent Resale',
        contactId: 'contact-2',
        ownerName: 'Amit Shah',
        phoneNumber: '+91 98980 12839',
        propertyAddress: 'A-401, Gala Haven',
        propertyLocality: 'Bopal',
        propertyCity: 'Ahmedabad',
        propertyType: '2 BHK',
        callDate: '2026-09-22T13:40:00Z',
        durationSec: 198,
        durationFormatted: '3m 18s',
        outcome: 'Answered - Follow Up',
        leadStatus: 'WARM',
        sentimentScore: 0.65,
        crmSynced: true,
        transcript: [
          { id: 't1', speaker: 'AI', speakerName: 'Rahul', text: 'Hi, is this Amit Shah?', timestamp: '00:02', timeSec: 2, sentiment: 'neutral' },
          { id: 't2', speaker: 'OWNER', speakerName: 'Amit Shah', text: 'Yes, tell me.', timestamp: '00:05', timeSec: 5, sentiment: 'neutral' },
          { id: 't3', speaker: 'AI', speakerName: 'Rahul', text: 'Hi Amit bhai, I’m Rahul with Fortiv Real Estate. We have active buyers searching for 2 BHKs in Bopal. Would you ever consider an offer on your property there?', timestamp: '00:16', timeSec: 16, sentiment: 'neutral' },
          { id: 't4', speaker: 'OWNER', speakerName: 'Amit Shah', text: 'Currently it is on rent generating ₹24,000 monthly. I might consider selling if I get a good price to reinvest in commercial.', timestamp: '00:31', timeSec: 31, sentiment: 'positive', intentDetected: 'occupancy_provided' },
          { id: 't5', speaker: 'AI', speakerName: 'Rahul', text: 'Got it, currently rented at ₹24k. What target selling price would make you happy to consider an exit?', timestamp: '00:44', timeSec: 44, sentiment: 'neutral' },
          { id: 't6', speaker: 'OWNER', speakerName: 'Amit Shah', text: 'Around ₹75 to ₹80 Lakhs clean deal.', timestamp: '00:52', timeSec: 52, sentiment: 'positive', intentDetected: 'expected_price_provided' },
          { id: 't7', speaker: 'AI', speakerName: 'Rahul', text: 'Understood. Would you be open to a 5-minute call with our Bopal specialist to review recent registry rates and buyer demand?', timestamp: '01:05', timeSec: 65, sentiment: 'positive' },
          { id: 't8', speaker: 'OWNER', speakerName: 'Amit Shah', text: 'Send me details on WhatsApp first, then call after 5 PM.', timestamp: '01:14', timeSec: 74, sentiment: 'neutral', intentDetected: 'time_window_confirmed' },
        ],
        extractedData: {
          ownerName: 'Amit Shah',
          propertyLocation: 'Bopal, Ahmedabad',
          propertyType: '2 BHK',
          bedrooms: 2,
          propertySizeSqFt: 1250,
          occupancy: 'Rented Out',
          rentalYield: '₹24,000/mo',
          sellingIntent: 'Near Future',
          sellingReason: 'Reinvesting into commercial real estate',
          expectedPrice: '₹78 Lakhs',
          marketEstimatedPrice: '₹72 - ₹80 Lakhs',
          callbackTimeWindow: 'After 5 PM (Send WhatsApp first)',
          humanHandoffRequested: true,
          qualificationScore: 78,
          aiNotes: 'Investor mindset. Rented unit in Gala Haven. Looking to rotate capital to commercial.',
        },
      },
      {
        id: 'call-103',
        agentId: 'agent-2',
        agentName: 'Priya — Luxury Villas & High-Ticket Resale',
        campaignId: 'camp-2',
        campaignName: 'Bodakdev & Thaltej Ultra-Luxury Villas',
        contactId: 'contact-3',
        ownerName: 'Neha Joshi',
        phoneNumber: '+91 97245 88123',
        propertyAddress: 'Villa 14, Sun Villa Enclave',
        propertyLocality: 'Bodakdev',
        propertyCity: 'Ahmedabad',
        propertyType: 'Villa',
        callDate: '2026-09-22T11:20:00Z',
        durationSec: 345,
        durationFormatted: '5m 45s',
        outcome: 'Answered - Qualified',
        leadStatus: 'HOT',
        sentimentScore: 0.91,
        crmSynced: true,
        transcript: [
          { id: 't1', speaker: 'AI', speakerName: 'Priya', text: 'Hi Neha ji, good morning! Is this Neha Joshi?', timestamp: '00:03', timeSec: 3, sentiment: 'positive' },
          { id: 't2', speaker: 'OWNER', speakerName: 'Neha Joshi', text: 'Yes, good morning. Who is calling?', timestamp: '00:08', timeSec: 8, sentiment: 'neutral' },
          { id: 't3', speaker: 'AI', speakerName: 'Priya', text: 'I’m Priya with Fortiv Real Estate. We are currently representing an industrialist family looking for an independent bungalow/villa in Bodakdev. Would you be open to an exploratory discussion regarding your villa in Sun Villa?', timestamp: '00:25', timeSec: 25, sentiment: 'positive' },
          { id: 't4', speaker: 'OWNER', speakerName: 'Neha Joshi', text: 'We were actually discussing downsizing since kids moved abroad. What kind of valuation are you seeing for 500 sq yard plots here?', timestamp: '00:41', timeSec: 41, sentiment: 'positive', intentDetected: 'market_price_inquiry' },
          { id: 't5', speaker: 'AI', speakerName: 'Priya', text: 'In Bodakdev, standalone 500 sq yd villas with modern construction have been commanding ₹4.5 to ₹5.5 Crore. To share an accurate report, our luxury head can visit or call you briefly.', timestamp: '01:02', timeSec: 62, sentiment: 'positive' },
          { id: 't6', speaker: 'OWNER', speakerName: 'Neha Joshi', text: 'That sounds right. We are targeting around ₹5 Crore. Let us have a meeting this Thursday at 4 PM.', timestamp: '01:18', timeSec: 78, sentiment: 'positive', intentDetected: 'expected_price_provided' },
        ],
        extractedData: {
          ownerName: 'Neha Joshi',
          propertyLocation: 'Bodakdev, Ahmedabad',
          propertyType: 'Villa',
          propertySizeSqFt: 4500,
          occupancy: 'Owner-Occupied',
          sellingIntent: 'Immediate',
          sellingReason: 'Downsizing as family moved abroad',
          expectedPrice: '₹5.0 Crore',
          marketEstimatedPrice: '₹4.6 - ₹5.2 Crore',
          callbackTimeWindow: 'Thursday 4 PM in-person meeting',
          humanHandoffRequested: true,
          qualificationScore: 98,
          aiNotes: 'Ultra high-ticket luxury seller. Immediate downsizing intent. Target price ₹5.0 Cr perfectly matches VIP buyer requirements.',
        },
      },
      {
        id: 'call-104',
        agentId: 'agent-1',
        agentName: 'Rahul — Ahmedabad Property Specialist',
        campaignId: 'camp-1',
        campaignName: 'Satellite & Prahlad Nagar High-Intent Resale',
        contactId: 'contact-4',
        ownerName: 'Karan Mehta',
        phoneNumber: '+91 98240 77319',
        propertyAddress: 'Flat 302, Titanium City Centre',
        propertyLocality: 'Prahlad Nagar',
        propertyCity: 'Ahmedabad',
        propertyType: 'Commercial Office',
        callDate: '2026-09-22T10:05:00Z',
        durationSec: 64,
        durationFormatted: '1m 04s',
        outcome: 'Answered - DNC',
        leadStatus: 'DNC',
        sentimentScore: -0.85,
        crmSynced: true,
        transcript: [
          { id: 't1', speaker: 'AI', speakerName: 'Rahul', text: 'Hi, is this Karan Mehta?', timestamp: '00:02', timeSec: 2, sentiment: 'neutral' },
          { id: 't2', speaker: 'OWNER', speakerName: 'Karan Mehta', text: 'Yes, tell me.', timestamp: '00:05', timeSec: 5, sentiment: 'neutral' },
          { id: 't3', speaker: 'AI', speakerName: 'Rahul', text: 'Hi Karan bhai, Rahul from Fortiv. We have active buyers seeking commercial spaces in Prahlad Nagar—would you consider selling?', timestamp: '00:14', timeSec: 14, sentiment: 'neutral' },
          { id: 't4', speaker: 'OWNER', speakerName: 'Karan Mehta', text: 'No, I am not interested. Please do not call me again and remove my number.', timestamp: '00:22', timeSec: 22, sentiment: 'hostile', intentDetected: 'explicit_dnc' },
          { id: 't5', speaker: 'AI', speakerName: 'Rahul', text: 'Absolutely, I completely understand. I will update our system right away so you receive no further calls. Have a good day.', timestamp: '00:30', timeSec: 30, sentiment: 'neutral' },
        ],
        extractedData: {
          ownerName: 'Karan Mehta',
          propertyLocation: 'Prahlad Nagar, Ahmedabad',
          propertyType: 'Commercial Office',
          sellingIntent: 'Not Selling',
          dncRequested: true,
          qualificationScore: 0,
          aiNotes: 'Immediate DNC compliance executed smoothly. Zero further calls permitted.',
        },
      },
      {
        id: 'call-105',
        agentId: 'agent-1',
        agentName: 'Rahul — Ahmedabad Property Specialist',
        campaignId: 'camp-1',
        campaignName: 'Satellite & Prahlad Nagar High-Intent Resale',
        contactId: 'contact-5',
        ownerName: 'Mehul Desai',
        phoneNumber: '+91 99099 33211',
        propertyAddress: 'C-904, Godrej Garden City',
        propertyLocality: 'SG Highway',
        propertyCity: 'Ahmedabad',
        propertyType: '3 BHK',
        callDate: '2026-09-22T09:30:00Z',
        durationSec: 210,
        durationFormatted: '3m 30s',
        outcome: 'Answered - Follow Up',
        leadStatus: 'WARM',
        sentimentScore: 0.58,
        crmSynced: true,
        transcript: [
          { id: 't1', speaker: 'AI', speakerName: 'Rahul', text: 'Hi, is this Mehul Desai?', timestamp: '00:02', timeSec: 2, sentiment: 'neutral' },
          { id: 't2', speaker: 'OWNER', speakerName: 'Mehul Desai', text: 'Speaking. How did you get my number?', timestamp: '00:07', timeSec: 7, sentiment: 'skeptical', intentDetected: 'number_source_objection' },
          { id: 't3', speaker: 'AI', speakerName: 'Rahul', text: 'We are a RERA-licensed agency and maintain verified property records for SG Highway. I can keep this super brief—would you ever consider selling your 3 BHK if we brought the right buyer?', timestamp: '00:21', timeSec: 21, sentiment: 'neutral' },
          { id: 't4', speaker: 'OWNER', speakerName: 'Mehul Desai', text: 'Not today. But maybe after Diwali when market picks up.', timestamp: '00:32', timeSec: 32, sentiment: 'neutral', intentDetected: 'selling_hesitant' },
          { id: 't5', speaker: 'AI', speakerName: 'Rahul', text: 'Totally understand! Are you living there yourself at the moment, or is it rented?', timestamp: '00:42', timeSec: 42, sentiment: 'neutral' },
          { id: 't6', speaker: 'OWNER', speakerName: 'Mehul Desai', text: 'Rented out to an IT executive.', timestamp: '00:48', timeSec: 48, sentiment: 'neutral', intentDetected: 'occupancy_provided' },
          { id: 't7', speaker: 'AI', speakerName: 'Rahul', text: 'Got it. Is there a target price you have in mind for post-Diwali?', timestamp: '00:57', timeSec: 57, sentiment: 'neutral' },
          { id: 't8', speaker: 'OWNER', speakerName: 'Mehul Desai', text: 'Expecting ₹95 Lakhs minimum.', timestamp: '01:04', timeSec: 64, sentiment: 'positive', intentDetected: 'expected_price_provided' },
        ],
        extractedData: {
          ownerName: 'Mehul Desai',
          propertyLocation: 'SG Highway, Ahmedabad',
          propertyType: '3 BHK',
          occupancy: 'Rented Out',
          sellingIntent: 'Near Future',
          sellingTimeline: 'Post Diwali (Nov 2026)',
          expectedPrice: '₹95 Lakhs',
          marketEstimatedPrice: '₹88 - ₹96 Lakhs',
          qualificationScore: 74,
          aiNotes: 'Post-Diwali seller. Rented out to corporate tenant. Target ₹95 Lakhs.',
        },
      }
    ];
  }

  public getCalls(): CallRecord[] {
    return [...this.calls];
  }

  public getCallById(id: string): CallRecord | undefined {
    return this.calls.find(c => c.id === id);
  }

  public addCompletedCall(call: Omit<CallRecord, 'id'>): CallRecord {
    const newCall: CallRecord = {
      ...call,
      id: `call-${Date.now()}`,
    };
    this.calls.unshift(newCall);
    return newCall;
  }
}

export const callService = CallService.getInstance();
