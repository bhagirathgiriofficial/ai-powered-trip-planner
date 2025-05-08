import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative min-h-[600px] bg-gradient-to-b from-blue-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Plan Your Perfect Trip with{' '}
              <span className="text-blue-600">AI Magic</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get personalized travel itineraries powered by advanced AI. From hidden gems to local favorites, we'll craft your dream vacation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#planner"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Planning
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="relative h-[500px]">
            <div className="absolute top-0 right-0 w-72 h-72">
              <Image
                src="/travel-1.jpg"
                alt="Travel destination"
                fill
                className="rounded-2xl object-cover shadow-xl"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 w-72 h-72">
              <Image
                src="/travel-2.jpg"
                alt="Travel experience"
                fill
                className="rounded-2xl object-cover shadow-xl"
                priority
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72">
              <Image
                src="/travel-3.jpg"
                alt="Travel adventure"
                fill
                className="rounded-2xl object-cover shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 