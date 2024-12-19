import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { SortConfig } from '../../hooks/useSort';

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  sortConfigs: SortConfig<any>[];
  requestSort: (key: string, multiSort: boolean) => void;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
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
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
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