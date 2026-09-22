import { PropertyRecord, OwnerRecord, PropertyType } from '../types';

export class PropertyService {
  private static instance: PropertyService;
  private properties: PropertyRecord[] = [];
  private owners: OwnerRecord[] = [];

  private constructor() {
    this.initDefaultData();
  }

  public static getInstance(): PropertyService {
    if (!PropertyService.instance) {
      PropertyService.instance = new PropertyService();
    }
    return PropertyService.instance;
  }

  private initDefaultData() {
    this.properties = [
      {
        id: 'prop-1',
        title: 'Iscon Elegance — 3 BHK High Floor',
        ownerName: 'Rajesh Patel',
        ownerPhone: '+91 98250 44192',
        propertyType: '3 BHK',
        locality: 'Satellite',
        city: 'Ahmedabad',
        carpetAreaSqFt: 1850,
        askingPrice: '₹1.35 Cr',
        marketValuation: '₹1.30 Cr',
        occupancyStatus: 'Owner-Occupied',
        status: 'Active',
        tags: ['Gated Community', 'High Floor', 'East Facing', 'Pool View'],
      },
      {
        id: 'prop-2',
        title: 'Sun Villa Enclave — 500 Sq Yd Luxury Bungalow',
        ownerName: 'Neha Joshi',
        ownerPhone: '+91 97245 88123',
        propertyType: 'Villa',
        locality: 'Bodakdev',
        city: 'Ahmedabad',
        carpetAreaSqFt: 4500,
        askingPrice: '₹5.0 Cr',
        marketValuation: '₹4.85 Cr',
        occupancyStatus: 'Owner-Occupied',
        status: 'Active',
        tags: ['Private Garden', 'Independent Plot', 'Bungalow Zone', 'Prime Bodakdev'],
      },
      {
        id: 'prop-3',
        title: 'Gala Haven — 2 BHK Investor Unit',
        ownerName: 'Amit Shah',
        ownerPhone: '+91 98980 12839',
        propertyType: '2 BHK',
        locality: 'Bopal',
        city: 'Ahmedabad',
        carpetAreaSqFt: 1250,
        askingPrice: '₹78 L',
        marketValuation: '₹75 L',
        occupancyStatus: 'Rented Out',
        currentRentMonthly: '₹24,000',
        status: 'Active',
        tags: ['Rented to IT', 'High Rental Yield', 'Clubhouse Amenities'],
      },
      {
        id: 'prop-4',
        title: 'Titanium City Centre — Commercial Office 302',
        ownerName: 'Karan Mehta',
        ownerPhone: '+91 98240 77319',
        propertyType: 'Commercial Office',
        locality: 'Prahlad Nagar',
        city: 'Ahmedabad',
        carpetAreaSqFt: 1100,
        askingPrice: '₹1.10 Cr',
        marketValuation: '₹1.05 Cr',
        occupancyStatus: 'Owner-Occupied',
        status: 'DNC',
        tags: ['Corporate Hub', 'Main Road Facing', 'Basement Parking'],
      },
      {
        id: 'prop-5',
        title: 'Godrej Garden City — Pine Block 3 BHK',
        ownerName: 'Mehul Desai',
        ownerPhone: '+91 99099 33211',
        propertyType: '3 BHK',
        locality: 'SG Highway',
        city: 'Ahmedabad',
        carpetAreaSqFt: 1650,
        askingPrice: '₹95 L',
        marketValuation: '₹92 L',
        occupancyStatus: 'Rented Out',
        currentRentMonthly: '₹28,000',
        status: 'Evaluation',
        tags: ['Township Living', 'Rented', 'Target Nov Exit'],
      },
      {
        id: 'prop-6',
        title: 'Shivalik Shilp — 4 BHK Sky Villa Penthouse',
        ownerName: 'Priya Shah',
        ownerPhone: '+91 98255 11984',
        propertyType: '4 BHK',
        locality: 'Thaltej',
        city: 'Ahmedabad',
        carpetAreaSqFt: 3200,
        askingPrice: '₹2.8 Cr',
        marketValuation: '₹2.75 Cr',
        occupancyStatus: 'Vacant',
        status: 'Active',
        tags: ['Penthouse', 'Panoramic City View', 'Ultra Luxury'],
      }
    ];

    this.owners = [
      {
        id: 'owner-1',
        name: 'Rajesh Patel',
        phone: '+91 98250 44192',
        email: 'rajesh.patel@gmail.com',
        city: 'Ahmedabad',
        propertiesOwnedCount: 2,
        totalPortfolioValue: '₹2.45 Cr',
        lastInteraction: '2026-09-22 (Call Completed)',
        leadStatus: 'HOT',
        assignedBroker: 'Vikram Joshi',
      },
      {
        id: 'owner-2',
        name: 'Neha Joshi',
        phone: '+91 97245 88123',
        email: 'neha.joshi@designstudio.in',
        city: 'Ahmedabad',
        propertiesOwnedCount: 1,
        totalPortfolioValue: '₹5.0 Cr',
        lastInteraction: '2026-09-22 (Meeting Scheduled)',
        leadStatus: 'HOT',
        assignedBroker: 'Ananya Sharma',
      },
      {
        id: 'owner-3',
        name: 'Amit Shah',
        phone: '+91 98980 12839',
        email: 'amit.shah.invest@yahoo.co.in',
        city: 'Ahmedabad',
        propertiesOwnedCount: 3,
        totalPortfolioValue: '₹3.10 Cr',
        lastInteraction: '2026-09-22 (WhatsApp Sent)',
        leadStatus: 'WARM',
        assignedBroker: 'Suresh Parmar',
      },
      {
        id: 'owner-4',
        name: 'Mehul Desai',
        phone: '+91 99099 33211',
        email: 'mehul.desai@tcs.com',
        city: 'Ahmedabad',
        propertiesOwnedCount: 1,
        totalPortfolioValue: '₹95 L',
        lastInteraction: '2026-09-22 (Call Completed)',
        leadStatus: 'WARM',
        assignedBroker: 'Vikram Joshi',
      },
      {
        id: 'owner-5',
        name: 'Karan Mehta',
        phone: '+91 98240 77319',
        email: 'karan.mehta@titaniumgroup.com',
        city: 'Ahmedabad',
        propertiesOwnedCount: 2,
        totalPortfolioValue: '₹2.20 Cr',
        lastInteraction: '2026-09-22 (DNC Opt-out)',
        leadStatus: 'DNC',
        assignedBroker: 'None (DNC)',
      }
    ];
  }

  public getProperties(): PropertyRecord[] {
    return [...this.properties];
  }

  public getOwners(): OwnerRecord[] {
    return [...this.owners];
  }
}

export const propertyService = PropertyService.getInstance();
