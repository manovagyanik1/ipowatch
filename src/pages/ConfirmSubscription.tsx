import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { API_CONFIG } from '../config/constants';

export const ConfirmSubscription: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmSubscription = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid confirmation link');
        return;
      }

      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/confirm/${token}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error);
        
        setStatus('success');
        setMessage(data.message);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Failed to confirm subscription');
      }
    };

    confirmSubscription();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {status === 'loading' && (
          <div className="animate-spin h-12 w-12 mx-auto border-4 border-blue-500 rounded-full border-t-transparent" />
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Subscription Confirmed!
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {message}
            </p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Confirmation Failed
            </h2>
            <p className="mt-2 text-red-600 dark:text-red-400">
              {message}
            </p>
          </>
        )}
      </div>
    </div>
  );
}; 