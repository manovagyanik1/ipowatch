import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { IPO } from '../../types/ipo';
import { TableBadge } from './TableBadge';

interface TableRowProps {
  ipo: IPO;
}

export const TableRow: React.FC<TableRowProps> = ({ ipo }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{ipo.companyName}</div>
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