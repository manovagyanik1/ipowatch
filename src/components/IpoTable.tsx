import React, { useMemo } from 'react';
import { IPO } from '../types/ipo';
import { useSort } from '../hooks/useSort';
import { getStatusSortValue, getRecommendationSortValue } from '../utils/sortUtils';
import { isDateInRange } from '../utils/dateUtils';
import { getRecommendation } from '../utils/ipoUtils';
import { SortableHeader } from './table/SortableHeader';
import { TableRow } from './table/TableRow';

interface IpoTableProps {
  ipos: IPO[];
}

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
  const { items: sortedItems, sortConfigs, requestSort } = useSort(processedIpos, [
    { key: 'statusSortValue', direction: 'desc' },
    { key: 'recommendationSortValue', direction: 'desc' }
  ]);

  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
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
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedItems.map((ipo, index) => (
            <TableRow key={index} ipo={ipo} />
          ))}
        </tbody>
      </table>
    </div>
  );
};