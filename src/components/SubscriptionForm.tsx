import React, { useState } from 'react';
import { Mail, Bell, CheckCircle, XCircle } from 'lucide-react';

export const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Implement actual subscription logic
    setTimeout(() => {
      if (email.includes('@')) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8 sm:p-10">
        <div className="text-center mb-8">
          <Bell className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Stay Updated
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get daily IPO recommendations and market insights delivered to your inbox
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="block w-full pl-10 pr-3 py-3 text-base placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={status === 'loading' || status === 'success'}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white 
              ${status === 'success' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200`}
          >
            {status === 'loading' && (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            )}
            {status === 'success' && (
              <span className="inline-flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Subscribed!
              </span>
            )}
            {status === 'error' && (
              <span className="inline-flex items-center">
                <XCircle className="mr-2 h-5 w-5" />
                Try Again
              </span>
            )}
            {status === 'idle' && 'Subscribe to Updates'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          By subscribing, you agree to our{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-600 flex items-center justify-center space-x-2">
          <Bell className="h-4 w-4" />
          <span>You'll receive one email per day with our top recommendations</span>
        </div>
      </div>
    </div>
  );
};