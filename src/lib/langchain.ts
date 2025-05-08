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

    Please provide a detailed day-by-day itinerary in markdown format including:
    1. Recommended accommodations
    2. Daily activities and attractions
    3. Restaurant recommendations
    4. Transportation options
    5. Estimated costs
    6. Travel tips and local customs
    7. Weather considerations
    8. Packing suggestions

    You can also deny any of the requests if you think it is not possible to fulfill because of the budget or other constraints.

    Use markdown formatting:
    - Use # for main title
    - Use ## for section headings
    - Use ### for subsections
    - Use bullet points (-) for lists
    - Use **bold** for emphasis
    - Use *italic* for additional information
    - Use proper spacing between sections
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