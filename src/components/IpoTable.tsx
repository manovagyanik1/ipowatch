import React, { useMemo } from 'react';
import { ArrowUpRight, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { IPO } from '../types/ipo';
import { useSort } from '../hooks/useSort';
import { TableBadge } from './table/TableBadge';
import { getRecommendation } from '../utils/ipoUtils';
import { isDateInRange } from '../utils/dateUtils';
import { getIpoSortValue } from '../utils/sortUtils';

interface IpoTableProps {
  ipos: IPO[];
}

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  sortConfig: any;
  requestSort: (key: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  sortConfig,
  requestSort,
}) => {
  const getSortIcon = () => {
    if (sortConfig.key !== sortKey) return null;
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => requestSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {getSortIcon()}
      </div>
    </th>
  );
};

export const IpoTable: React.FC<IpoTableProps> = ({ ipos }) => {
  // Pre-process IPOs with computed values
  const processedIpos = useMemo(() => {
    return ipos.map(ipo => ({
      ...ipo,
      isOpen: isDateInRange(ipo.subscriptionDates),
      computedRecommendation: getRecommendation(ipo.listingGains, ipo.type),
      sortValue: getIpoSortValue(ipo)
    }));
  }, [ipos]);

  // Initialize sort with combined status and recommendation
  const { items, sortConfig, requestSort } = useSort(processedIpos, {
    key: 'sortValue',
    direction: 'desc'
  });

  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <SortableHeader label="Company" sortKey="companyName" sortConfig={sortConfig} requestSort={requestSort} />
            <SortableHeader label="Type" sortKey="type" sortConfig={sortConfig} requestSort={requestSort} />
            <SortableHeader label="Price" sortKey="price" sortConfig={sortConfig} requestSort={requestSort} />
            <SortableHeader label="Issue Size" sortKey="issueSize" sortConfig={sortConfig} requestSort={requestSort} />
            <SortableHeader label="GMP" sortKey="gmp" sortConfig={sortConfig} requestSort={requestSort} />
            <SortableHeader label="Expected Gains" sortKey="listingGains" sortConfig={sortConfig} requestSort={requestSort} />
            <SortableHeader label="Dates" sortKey="subscriptionDates" sortConfig={sortConfig} requestSort={requestSort} />
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((ipo, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{ipo.companyName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TableBadge variant="type" value={ipo.type} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ipo.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ipo.issueSize}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  <span className="text-sm text-gray-900">{ipo.gmp}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1 text-blue-500" />
                  <span className="text-sm text-gray-900">{ipo.listingGains}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ipo.subscriptionDates}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TableBadge 
                  variant="status" 
                  value={ipo.isOpen ? 'open' : ipo.status} 
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TableBadge 
                  variant="recommendation" 
                  value={ipo.computedRecommendation} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};