import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { SubscriptionForm } from '../components/SubscriptionForm';
import { IpoTable } from '../components/IpoTable';
import { useIpos } from '../hooks/useIpos';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AlertCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const { ipos, loading, error, refresh } = useIpos();

  return (
    <div className="space-y-12">
      {/* Hero Section - Full Width */}
      <Hero />
      
      {/* Content Sections - Consistent Max Width */}
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* IPO Table Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest IPO Opportunities</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {loading && <LoadingSpinner />}
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700 dark:text-red-400">{error}</p>
                </div>
                <button 
                  onClick={refresh}
                  className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 underline"
                >
                  Try again
                </button>
              </div>
            )}
            
            {!loading && !error && ipos.length > 0 && <IpoTable ipos={ipos} />}
          </div>
        </section>

        {/* Features Section */}
        <Features />
        
        {/* Subscribe Section */}
        <section id="subscribe" className="scroll-mt-20">
          <SubscriptionForm />
        </section>
      </div>
    </div>
  );
};