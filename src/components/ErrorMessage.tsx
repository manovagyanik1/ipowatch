import React from 'react';
import { AlertCircle, RefreshCcw, Terminal } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const isServerError = message.toLowerCase().includes('server');
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
      <div className="flex items-center mb-4">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">{message}</span>
      </div>
      {isServerError && (
        <div className="mb-4 p-4 bg-gray-800 text-gray-200 rounded-md font-mono text-sm flex items-center">
          <Terminal className="w-4 h-4 mr-2" />
          <code>npm run server</code>
        </div>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 dark:bg-red-500 rounded-md hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Retry Connection
        </button>
      )}
    </div>
  );
};