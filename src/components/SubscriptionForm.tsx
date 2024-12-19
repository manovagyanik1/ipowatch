import React, { useState } from 'react';
import { Mail, Bell, CheckCircle, XCircle } from 'lucide-react';
import { subscribeToNewsletter } from '../services/api/subscribers';

export const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      await subscribeToNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8 sm:p-10">
        <div className="text-center mb-8">
          <Bell className="mx-auto h-12 w-12 text-blue-500 dark:text-blue-400" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
            Stay Updated
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
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
              className="block w-full pl-10 pr-3 py-3 text-base placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={status === 'loading' || status === 'success'}
            />
          </div>

          {status === 'error' && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white 
              ${status === 'success' 
                ? 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600' 
                : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'} 
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

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          By subscribing, you agree to our{' '}
          <a href="/terms" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center space-x-2">
          <Bell className="h-4 w-4" />
          <span>You'll receive one email per day with our recommendation for the live IPOs</span>
        </div>
      </div>
    </div>
  );
};