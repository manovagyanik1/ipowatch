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
      <Hero />
      
      {/* IPO Table Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest IPO Opportunities</h2>
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
            <button 
              onClick={refresh}
              className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
            >
              Try again
            </button>
          </div>
        )}
        
        {!loading && !error && ipos.length > 0 && <IpoTable ipos={ipos} />}
      </section>

      <Features />
      
      <section id="subscribe" className="max-w-2xl mx-auto scroll-mt-20">
        <SubscriptionForm />
      </section>
    </div>
  );
};