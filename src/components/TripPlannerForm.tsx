'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { generateTripPlan } from '@/lib/langchain';
import Markdown from 'markdown-to-jsx';

const tripPlannerSchema = z.object({
  from: z.string().min(1, 'Departure location is required'),
  to: z.string().min(1, 'Destination is required'),
  days: z.number().min(1, 'Duration must be at least 1 day'),
  adults: z.number().min(1, 'At least 1 adult is required'),
  kids: z.number().min(0, 'Number of kids cannot be negative'),
  budget: z.string().min(1, 'Budget is required'),
  hotelPreference: z.string().min(1, 'Hotel preference is required'),
  foodPreference: z.string().min(1, 'Food preference is required'),
});

type TripPlannerFormData = z.infer<typeof tripPlannerSchema>;

export default function TripPlannerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<string>('');
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripPlannerFormData>({
    resolver: zodResolver(tripPlannerSchema),
  });

  const onSubmit = async (data: TripPlannerFormData) => {
    setIsLoading(true);
    setError('');
    try {
      const plan = await generateTripPlan(data);
      setTripPlan(plan);
    } catch (err) {
      console.error('Trip plan generation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate trip plan. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Location Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <input
                    type="text"
                    {...register('from')}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Departure location"
                  />
                  {errors.from && <p className="mt-1 text-sm text-red-600">{errors.from.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input
                    type="text"
                    {...register('to')}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Destination"
                  />
                  {errors.to && <p className="mt-1 text-sm text-red-600">{errors.to.message}</p>}
                </div>
              </div>
            </div>

            {/* Travel Details Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Travel Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                  <input
                    type="number"
                    {...register('days', { valueAsNumber: true })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    min="1"
                  />
                  {errors.days && <p className="mt-1 text-sm text-red-600">{errors.days.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                    <input
                      type="number"
                      {...register('adults', { valueAsNumber: true })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      min="1"
                    />
                    {errors.adults && <p className="mt-1 text-sm text-red-600">{errors.adults.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kids</label>
                    <input
                      type="number"
                      {...register('kids', { valueAsNumber: true })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      min="0"
                    />
                    {errors.kids && <p className="mt-1 text-sm text-red-600">{errors.kids.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <input
                    type="text"
                    {...register('budget')}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., $1000-2000"
                  />
                  {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Preference</label>
                  <input
                    type="text"
                    {...register('hotelPreference')}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., Luxury, Budget, Boutique"
                  />
                  {errors.hotelPreference && (
                    <p className="mt-1 text-sm text-red-600">{errors.hotelPreference.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Food Preferences Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Food Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Preference</label>
                  <input
                    type="text"
                    {...register('foodPreference')}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., Local cuisine, Vegetarian, Fine dining"
                  />
                  {errors.foodPreference && (
                    <p className="mt-1 text-sm text-red-600">{errors.foodPreference.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Plan...
            </span>
          ) : (
            'Generate Trip Plan'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {tripPlan && (
        <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Trip Plan</h2>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                  AI Generated
                </span>
                <button
                  onClick={() => window.print()}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Print or Save as PDF"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="prose max-w-none">
              <Markdown
                options={{
                  forceBlock: true,
                  forceWrapper: true,
                  wrapper: 'div',
                  overrides: {
                    h1: {
                      component: ({ children, ...props }) => (
                        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props}>
                          {children}
                        </h1>
                      ),
                    },
                    h2: {
                      component: ({ children, ...props }) => (
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3" {...props}>
                          {children}
                        </h2>
                      ),
                    },
                    h3: {
                      component: ({ children, ...props }) => (
                        <h3 className="text-xl font-bold text-gray-900 mt-5 mb-2" {...props}>
                          {children}
                        </h3>
                      ),
                    },
                    p: {
                      component: ({ children, ...props }) => (
                        <p className="text-gray-700 mb-6 leading-relaxed" {...props}>
                          {children}
                        </p>
                      ),
                    },
                    ul: {
                      component: ({ children, ...props }) => (
                        <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2" {...props}>
                          {children}
                        </ul>
                      ),
                    },
                    ol: {
                      component: ({ children, ...props }) => (
                        <ol className="list-decimal list-inside mb-6 text-gray-700 space-y-2" {...props}>
                          {children}
                        </ol>
                      ),
                    },
                    li: {
                      component: ({ children, ...props }) => (
                        <li className="mb-2" {...props}>
                          {children}
                        </li>
                      ),
                    },
                    strong: {
                      component: ({ children, ...props }) => (
                        <strong className="font-semibold" {...props}>
                          {children}
                        </strong>
                      ),
                    },
                    em: {
                      component: ({ children, ...props }) => (
                        <em className="italic" {...props}>
                          {children}
                        </em>
                      ),
                    },
                    br: {
                      component: () => <br className="mb-4" />,
                    },
                  },
                }}
              >
                {tripPlan}
              </Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 