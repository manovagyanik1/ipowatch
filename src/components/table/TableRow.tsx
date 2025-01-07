import React from 'react';
import { ArrowUpRight, TrendingUp, Copy } from 'lucide-react';
import { IPO } from '../../types/ipo';
import { TableBadge } from './TableBadge';
import { toast } from 'react-hot-toast';

interface TableRowProps {
  ipo: IPO;
}

export const TableRow: React.FC<TableRowProps> = ({ ipo }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!', {
          position: 'bottom-center',
          duration: 2000,
          style: {
            backgroundColor: '#f0fdf4',
            color: '#15803d',
          },
        });
      })
      .catch(err => {
        toast.error('Failed to copy', {
          position: 'bottom-center',
          duration: 2000,
          style: {
            backgroundColor: '#fef2f2',
            color: '#dc2626',
          },
        });
        console.error('Failed to copy:', err);
      });
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2" onClick={() => copyToClipboard(ipo.companyName)}>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {ipo.companyName}
          </div>
          <button 
            onClick={() => copyToClipboard(ipo.companyName)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            title="Copy company name"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <TableBadge variant="type" value={ipo.type} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {ipo.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {ipo.issueSize}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
          <span className="text-sm text-gray-900 dark:text-gray-100">{ipo.gmp}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <ArrowUpRight className="w-4 h-4 mr-1 text-blue-500" />
          <span className="text-sm text-gray-900 dark:text-gray-100">{ipo.listingGains}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {ipo.subscriptionDates}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <TableBadge variant="status" value={ipo.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <TableBadge variant="recommendation" value={ipo.recommendation} />
      </td>
    </tr>
  );
};