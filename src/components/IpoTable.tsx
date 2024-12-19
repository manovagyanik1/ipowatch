import React, { useMemo } from 'react';
import { ArrowUpRight, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { IPO } from '../types/ipo';
import { useSort, SortConfig } from '../hooks/useSort';
import { TableBadge } from './table/TableBadge';
import { getRecommendation } from '../utils/ipoUtils';
import { isDateInRange } from '../utils/dateUtils';
import { getStatusSortValue, getRecommendationSortValue } from '../utils/sortUtils';

interface IpoTableProps {
  ipos: IPO[];
}

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  sortConfigs: SortConfig<any>[];
  requestSort: (key: string, multiSort: boolean) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  sortConfigs,
  requestSort,
}) => {
  const currentConfig = sortConfigs.find(config => config.key === sortKey);
  const sortIndex = sortConfigs.findIndex(config => config.key === sortKey);

  const getSortIcon = () => {
    if (!currentConfig) return null;
    return currentConfig.direction === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={(e) => requestSort(sortKey, e.shiftKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex items-center">
          {getSortIcon()}
          {sortIndex > 0 && (
            <span className="ml-1 text-xs text-gray-400">{sortIndex + 1}</span>
          )}
        </div>
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
      statusSortValue: getStatusSortValue(ipo.status),
      recommendationSortValue: getRecommendationSortValue(ipo.recommendation)
    }));
  }, [ipos]);

  // Initialize sort with status and recommendation
  const { items, sortConfigs, requestSort } = useSort(processedIpos, [
    { key: 'statusSortValue', direction: 'desc' },
    { key: 'recommendationSortValue', direction: 'desc' }
  ]);

  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <SortableHeader label="Company" sortKey="companyName" sortConfigs={sortConfigs} requestSort={requestSort} />
            <SortableHeader label="Type" sortKey="type" sortConfigs={sortConfigs} requestSort={requestSort} />
            <SortableHeader label="Price" sortKey="price" sortConfigs={sortConfigs} requestSort={requestSort} />
            <SortableHeader label="Issue Size" sortKey="issueSize" sortConfigs={sortConfigs} requestSort={requestSort} />
            <SortableHeader label="GMP" sortKey="gmp" sortConfigs={sortConfigs} requestSort={requestSort} />
            <SortableHeader label="Expected Gains" sortKey="listingGains" sortConfigs={sortConfigs} requestSort={requestSort} />
            <SortableHeader label="Dates" sortKey="subscriptionDates" sortConfigs={sortConfigs} requestSort={requestSort} />
            <SortableHeader label="Status" sortKey="statusSortValue" sortConfigs={sortConfigs} requestSort={requestSort} />
            <SortableHeader label="Recommendation" sortKey="recommendationSortValue" sortConfigs={sortConfigs} requestSort={requestSort} />
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
                  value={ipo.status} 
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TableBadge 
                  variant="recommendation" 
                  value={ipo.recommendation} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};