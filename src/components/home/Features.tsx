import React from 'react';
import { TrendingUp, Bell, LineChart, Clock, Shield, Mail } from 'lucide-react';

const features = [
  {
    name: 'Real-time GMP Data',
    description: 'Get the latest Grey Market Premium data updated in real-time for informed decision making.',
    icon: Clock,
  },
  {
    name: 'Expert Analysis',
    description: 'Our algorithms analyze multiple factors to provide data-driven IPO recommendations.',
    icon: LineChart,
  },
  {
    name: 'Instant Alerts',
    description: 'Receive timely notifications about promising IPO opportunities via email.',
    icon: Bell,
  },
  {
    name: 'Market Trends',
    description: 'Stay updated with the latest IPO market trends and performance metrics.',
    icon: TrendingUp,
  },
  {
    name: 'Secure Platform',
    description: 'Your data is protected with enterprise-grade security measures.',
    icon: Shield,
  },
  {
    name: 'Daily Updates',
    description: 'Get daily email digests with curated IPO recommendations and insights.',
    icon: Mail,
  },
];

export const Features: React.FC = () => {
  return (
    <div id="features" className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Smart IPO Investment Tools
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Everything you need to make informed IPO investment decisions in one place.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 dark:bg-blue-600 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};