import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | null;
export type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
};

export function useSort<T>(items: T[], initialSort?: SortConfig<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(
    initialSort || { key: '' as keyof T, direction: null }
  );

  const sortedItems = useMemo(() => {
    if (!sortConfig.direction || !sortConfig.key) {
      return items;
    }

    return [...items].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;
      
      const multiplier = sortConfig.direction === 'asc' ? 1 : -1;
      
      // Handle numeric values (including those in strings)
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return (aNum - bNum) * multiplier;
        }
        
        // Remove special characters and compare strings
        const cleanA = aValue.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const cleanB = bValue.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return cleanA.localeCompare(cleanB) * multiplier;
      }
      
      return ((aValue < bValue ? -1 : 1) * multiplier);
    });
  }, [items, sortConfig]);

  const requestSort = (key: keyof T) => {
    setSortConfig((currentConfig) => {
      if (currentConfig.key === key) {
        if (currentConfig.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        if (currentConfig.direction === 'desc') {
          return { key: '' as keyof T, direction: null };
        }
      }
      return { key, direction: 'asc' };
    });
  };

  return {
    items: sortedItems,
    sortConfig,
    requestSort,
  };
}