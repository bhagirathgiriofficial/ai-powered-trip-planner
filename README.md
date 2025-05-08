# AI Trip Planner

A Next.js application that uses Google's Gemini AI model through LangChain to generate personalized trip itineraries based on user preferences.

## Features

- User-friendly form to input trip details
- AI-powered trip planning
- Detailed itineraries including:
  - Accommodations
  - Daily activities
  - Restaurant recommendations
  - Transportation options
  - Estimated costs
  - Travel tips
  - Weather considerations
  - Packing suggestions

## Prerequisites

- Node.js 18.x or later
- A Google API key with access to Gemini AI

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-trip-planner
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Google API key:
```
GOOGLE_API_KEY=your_google_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Fill out the trip planner form with your preferences:
   - Departure location
   - Destination
   - Duration
   - Number of travelers (adults and kids)
   - Budget
   - Hotel preferences
   - Food preferences

2. Click "Generate Trip Plan" to get your personalized itinerary.

3. Review the generated plan, which includes detailed day-by-day recommendations.

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- LangChain
- Google Gemini AI
- React Hook Form
- Zod (for form validation)

## License

MIT
# ai-powered-trip-planner
