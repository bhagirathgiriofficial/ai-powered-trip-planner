import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// console.log(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_GOOGLE_API_KEY environment variable');
}

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  maxOutputTokens: 2048,
  temperature: 0.7,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
});

const tripPlannerPrompt = PromptTemplate.fromTemplate(`Create a detailed trip itinerary with the following details:
    - From: {from}
    - To: {to}
    - Duration: {days} days
    - Travelers: {adults} adults and {kids} kids
    - Budget: {budget} in INR
    - Hotel Preference: {hotelPreference}
    - Food Preference: {foodPreference}

    You can also deny any of the requests if you think it is not possible to fulfill because of the budget or other constraints.

    Please provide a detailed day-by-day itinerary in markdown format with the following sections:

    # Trip Overview
    Start with a brief overview of the trip, including:
    - Destination highlights
    - Best time to visit
    - General travel tips
    - Budget considerations
    - Any special considerations for the group

    ## Day-by-Day Itinerary
    For each day, include:
    - Morning activities
    - Afternoon activities
    - Evening activities
    - Recommended restaurants
    - Transportation details
    - Estimated costs

    ## Accommodations
    - Recommended hotels/places to stay
    - Price ranges
    - Location benefits
    - Amenities
    - Booking tips

    ## Local Transportation
    - Airport transfers
    - Local transport options
    - Cost estimates
    - Tips for getting around

    ## Food & Dining
    - Restaurant recommendations
    - Local specialties
    - Price ranges
    - Dietary considerations
    - Reservation tips

    ## Budget Breakdown
    - Accommodation costs
    - Transportation costs
    - Food expenses
    - Activity costs
    - Additional expenses
    - Money-saving tips

    ## Travel Tips
    - Local customs
    - Safety tips
    - Weather considerations
    - Packing suggestions
    - Emergency contacts

    Use markdown formatting:
    - Use # for main title
    - Use ## for section headings
    - Use ### for subsections
    - Use bullet points (-) for lists
    - Use **bold** for emphasis
    - Use *italic* for additional information
    - Add an empty line between paragraphs
    - Use <br> for line breaks within paragraphs
    - Ensure each section has proper spacing before and after

    Format the response in a clear, organized structure with proper markdown syntax and spacing.`);

export const generateTripPlan = async (tripDetails: {
  from: string;
  to: string;
  days: number;
  adults: number;
  kids: number;
  budget: string;
  hotelPreference: string;
  foodPreference: string;
}) => {
  try {
    const chain = tripPlannerPrompt
      .pipe(model)
      .pipe(new StringOutputParser());

    const result = await chain.invoke(tripDetails);
    return result;
  } catch (error) {
    console.error('Error generating trip plan:', error);
    throw error;
  }
}; 