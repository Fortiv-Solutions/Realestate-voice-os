import { ExtractedPropertyData, TranscriptEntry, PropertyType } from '../types';

export interface AIResponseResult {
  replyText: string;
  intent: string;
  detectedSentiment: 'positive' | 'neutral' | 'skeptical' | 'hostile';
  shouldEndCall: boolean;
  dncRequested: boolean;
  extractedDataDelta: Partial<ExtractedPropertyData>;
}

export class AIService {
  private static instance: AIService;

  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Generates the dynamic AI response based on full dialogue history and latest user utterance
   */
  public generateResponse(
    userUtterance: string,
    history: TranscriptEntry[],
    currentExtracted: ExtractedPropertyData,
    agentName: string = 'Rahul',
    companyName: string = 'Fortiv Real Estate',
    targetLocality: string = 'Satellite, Ahmedabad'
  ): AIResponseResult {
    const input = userUtterance.toLowerCase().trim();
    const result: AIResponseResult = {
      replyText: '',
      intent: 'general_inquiry',
      detectedSentiment: 'neutral',
      shouldEndCall: false,
      dncRequested: false,
      extractedDataDelta: {},
    };

    // 1. Explicit DNC Check (Highest Priority)
    if (
      input.includes('do not call') ||
      input.includes('dont call') ||
      input.includes('remove my number') ||
      input.includes('stop calling') ||
      input.includes('not interested in anybody contacting') ||
      input.includes('dont contact me') ||
      input.includes('block this number') ||
      input.includes('harass')
    ) {
      result.intent = 'explicit_dnc';
      result.detectedSentiment = 'hostile';
      result.dncRequested = true;
      result.shouldEndCall = true;
      result.replyText = `Absolutely, I completely understand. I will update our system right now so you won't receive any further calls from us. Have a great day ahead.`;
      result.extractedDataDelta = {
        dncRequested: true,
        sellingIntent: 'Not Selling',
        qualificationScore: 0,
        aiNotes: 'User explicitly requested DNC. Removed from calling list immediately.',
      };
      return result;
    }

    // 2. AI Identity Challenge
    if (input.includes('are you a robot') || input.includes('are you ai') || input.includes('are you human') || input.includes('is this a machine')) {
      result.intent = 'ai_disclosure';
      result.detectedSentiment = 'skeptical';
      result.replyText = `Yes, I'm an AI property assistant calling on behalf of ${companyName} in ${targetLocality}. Would you prefer if I have our senior property specialist connect with you directly?`;
      return result;
    }

    // 3. Number Source Objection
    if (input.includes('where did you get my number') || input.includes('how did you get my number') || input.includes('who gave you my number') || input.includes('source')) {
      result.intent = 'number_source_objection';
      result.detectedSentiment = 'skeptical';
      result.replyText = `We are a RERA-licensed agency and maintain verified property records for ${targetLocality}. We often cross paths with owners, but if it doesn't ring a bell, it's likely been a while! I can keep this super brief—would you ever consider selling if we brought the right buyer?`;
      return result;
    }

    // 4. "So you don't know the pricing?" / Valuation Challenge
    if (
      input.includes('dont know the price') ||
      input.includes("don't know the price") ||
      input.includes('so you dont know') ||
      input.includes('so you do not know') ||
      input.includes('you are calling without knowing')
    ) {
      result.intent = 'pricing_knowledge_challenge';
      result.detectedSentiment = 'skeptical';
      result.replyText = `I have a general ballpark for ${targetLocality}, but prices vary significantly by tower, floor, and interior quality. I don't want to quote an inaccurate number without checking latest registry comps. That's why our area specialist offers a quick 5-minute update.`;
      return result;
    }

    // 5. "What is the price going in the market?" / "How much is it worth?"
    if (
      input.includes('what is the price') ||
      input.includes('what price') ||
      input.includes('how much is it worth') ||
      input.includes('rate in the market') ||
      input.includes('current valuation')
    ) {
      result.intent = 'market_price_inquiry';
      result.detectedSentiment = 'neutral';
      result.replyText = `In ${targetLocality}, recent 2 to 3 BHK transactions have ranged between ₹85 Lakhs to ₹1.6 Crore depending on the layout. To see exactly where your unit sits, our area specialist can pull the latest registered comps. Would that be helpful?`;
      return result;
    }

    // 6. "How does it work?" / "For what?" / "Why specialist?"
    if (
      input.includes('how does it work') ||
      input.includes('for what') ||
      input.includes('does it work') ||
      input.includes('why do they need to call') ||
      input.includes('what is the catch')
    ) {
      result.intent = 'process_explanation';
      result.detectedSentiment = 'neutral';
      result.replyText = `It's very straightforward—they'll just give you a quick 5-minute call to share recent verified sales in your building and active buyer demand. There is zero cost or obligation at all.`;
      return result;
    }

    // 7. Time Window / Callback Given (Closing Stage)
    if (
      input.includes('morning') ||
      input.includes('afternoon') ||
      input.includes('evening') ||
      input.includes('before 2') ||
      input.includes('after 4') ||
      input.includes('tomorrow') ||
      input.includes('call at') ||
      input.includes('pm') ||
      input.includes('am')
    ) {
      result.intent = 'time_window_confirmed';
      result.detectedSentiment = 'positive';
      result.shouldEndCall = true;
      result.replyText = `Perfect! I've noted that for ${userUtterance}. Our ${targetLocality} specialist will give you a brief 5-minute call around then. Thank you for your time, and have a wonderful day!`;
      result.extractedDataDelta = {
        callbackTimeWindow: userUtterance,
        humanHandoffRequested: true,
        qualificationScore: Math.max(currentExtracted.qualificationScore || 50, 85),
      };
      return result;
    }

    // 8. Extract Price Mentions (e.g. 1.3 Cr, 85 L, 95 lakhs, 1.5 crore)
    const priceMatch = userUtterance.match(/(\d+(\.\d+)?)\s*(cr|crore|l|lakh|lakhs|k)/i);
    if (priceMatch) {
      const formattedPrice = `₹${priceMatch[1]} ${priceMatch[3].toUpperCase()}`;
      result.intent = 'expected_price_provided';
      result.detectedSentiment = 'positive';
      result.extractedDataDelta.expectedPrice = formattedPrice;
      result.extractedDataDelta.qualificationScore = Math.max(currentExtracted.qualificationScore || 60, 80);
      result.replyText = `Got it—around ${formattedPrice}. That sounds like a reasonable ballpark for this location. Would you be open to a quick 5-minute market update from our specialist so you can see where current buyers are bidding?`;
      return result;
    }

    // 9. Extract BHK / Unit Type (1 BHK, 2 BHK, 3 BHK, 4 BHK, Villa, Plot)
    if (input.includes('1 bhk') || input.includes('2 bhk') || input.includes('3 bhk') || input.includes('4 bhk') || input.includes('villa') || input.includes('plot') || input.includes('commercial')) {
      let unit: PropertyType = '3 BHK';
      if (input.includes('1 bhk')) unit = '1 BHK';
      else if (input.includes('2 bhk')) unit = '2 BHK';
      else if (input.includes('3 bhk')) unit = '3 BHK';
      else if (input.includes('4 bhk')) unit = '4 BHK';
      else if (input.includes('villa')) unit = 'Villa';
      else if (input.includes('plot')) unit = 'Plot';
      else if (input.includes('commercial')) unit = 'Commercial Office';

      result.intent = 'unit_type_provided';
      result.detectedSentiment = 'positive';
      result.extractedDataDelta.propertyType = unit;
      result.replyText = `Great, a ${unit}. And if you ever decided to move or sell down the road, do you have a target price in mind that would make you seriously consider an offer?`;
      return result;
    }

    // 10. Extract Occupancy (Living there vs Rented)
    if (
      input.includes('living') ||
      input.includes('leaving') ||
      input.includes('staying') ||
      input.includes('my own house') ||
      input.includes('self') ||
      input.includes('myself') ||
      input.includes('rented') ||
      input.includes('tenant') ||
      input.includes('investment')
    ) {
      const isOwnerOccupied = input.includes('living') || input.includes('leaving') || input.includes('staying') || input.includes('self') || input.includes('myself') || input.includes('own house');
      result.intent = 'occupancy_provided';
      result.detectedSentiment = 'neutral';
      result.extractedDataDelta.occupancy = isOwnerOccupied ? 'Owner-Occupied' : 'Rented Out';

      if (isOwnerOccupied) {
        result.replyText = `Got it, you're living there yourself. Was that bought as your long-term family home, or was it originally an investment?`;
      } else {
        result.replyText = `Understood, it's rented out. How has the rental yield and tenant experience been for you so far?`;
      }
      return result;
    }

    // 11. Hot Lead / Open to Selling ("Yes", "Tell me more", "I would consider", "Bring buyer")
    if (
      input.includes('yes') ||
      input.includes('sure') ||
      input.includes('open to selling') ||
      input.includes('tell me') ||
      input.includes('options') ||
      input.includes('give me options') ||
      input.includes('maybe') ||
      input.includes('depends on price') ||
      input.includes('if price is good')
    ) {
      result.intent = 'selling_interest_positive';
      result.detectedSentiment = 'positive';
      result.extractedDataDelta.sellingIntent = 'Immediate';
      result.extractedDataDelta.qualificationScore = 75;

      if (!currentExtracted.propertyType) {
        result.replyText = `Fantastic! Just so I know what to present to our active buyers, is the property a 2 BHK, 3 BHK, or larger?`;
      } else if (!currentExtracted.expectedPrice) {
        result.replyText = `Makes sense. And is there a specific target price that would make you happy to consider an offer?`;
      } else {
        result.replyText = `Perfect. Would mornings or afternoons suit you better for a quick 5-minute call with our area specialist?`;
      }
      return result;
    }

    // 12. Cold / Hesitant ("Not right now", "No interest", "Not selling today")
    if (
      input.includes('no') ||
      input.includes('not right now') ||
      input.includes('not selling') ||
      input.includes('not at the moment') ||
      input.includes('dont want to sell') ||
      input.includes("don't want to sell")
    ) {
      result.intent = 'selling_hesitant';
      result.detectedSentiment = 'neutral';
      result.extractedDataDelta.sellingIntent = 'Near Future';

      if (!currentExtracted.occupancy) {
        result.replyText = `Totally understand! Are you living there yourself at the moment, or is the property currently rented out?`;
      } else if (!currentExtracted.expectedPrice) {
        result.replyText = `Fair enough. If you ever did decide to move on in the future, is there a target number that would seriously tempt you?`;
      } else {
        result.replyText = `Makes complete sense. Would you like a zero-obligation 5-minute market update from our specialist so you have the latest building rates on hand?`;
      }
      return result;
    }

    // Default Fallback
    result.intent = 'conversational_followup';
    result.replyText = `I appreciate that context. Our team works closely with active buyers in ${targetLocality}. Would you be open to having our area specialist give you a quick 5-minute market overview at your convenience?`;
    return result;
  }

  /**
   * Helper to compute an updated lead status based on extracted data
   */
  public evaluateLeadStatus(extracted: ExtractedPropertyData): 'HOT' | 'WARM' | 'COLD' | 'CALLBACK' | 'DNC' {
    if (extracted.dncRequested) return 'DNC';
    if (extracted.callbackTimeWindow || extracted.humanHandoffRequested) {
      if (extracted.sellingIntent === 'Immediate' || (extracted.expectedPrice && extracted.qualificationScore >= 75)) {
        return 'HOT';
      }
      return 'CALLBACK';
    }
    if (extracted.sellingIntent === 'Immediate' || extracted.qualificationScore >= 75) return 'HOT';
    if (extracted.sellingIntent === 'Near Future' || extracted.qualificationScore >= 50) return 'WARM';
    if (extracted.sellingIntent === 'Not Selling') return 'COLD';
    return 'WARM';
  }
}

export const aiService = AIService.getInstance();
