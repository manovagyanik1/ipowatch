import React from 'react';
import { TrendingUp, LineChart, AlertCircle } from 'lucide-react';
import { APP_CONFIG } from '../../constants/app';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Make Smarter</span>
                <span className="block text-blue-600">IPO Investments</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {APP_CONFIG.DESCRIPTION}. Get real-time Grey Market Premium data and expert recommendations.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#subscribe"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Get IPO Alerts
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#features"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    <LineChart className="w-5 h-5 mr-2" />
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-gradient-to-br from-blue-100 to-indigo-100 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-25">
              <TrendingUp className="w-64 h-64 text-blue-500" />
            </div>
            <div className="relative">
              <TrendingUp className="w-32 h-32 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};