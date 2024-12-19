import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export function useSort<T>(items: T[], initialSort?: SortConfig<T>[]) {
  const [sortConfigs, setSortConfigs] = useState<SortConfig<T>[]>(initialSort || []);

  const sortedItems = useMemo(() => {
    if (!sortConfigs.length) return items;

    return [...items].sort((a, b) => {
      for (const config of sortConfigs) {
        if (!config.direction) continue;

        const aValue = a[config.key];
        const bValue = b[config.key];

        if (aValue === bValue) continue;
        
        const multiplier = config.direction === 'asc' ? 1 : -1;
        
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
      }
      return 0;
    });
  }, [items, sortConfigs]);

  const requestSort = (key: keyof T, multiSort: boolean = false) => {
    setSortConfigs((currentConfigs) => {
      const existingConfigIndex = currentConfigs.findIndex(config => config.key === key);
      const newConfigs = multiSort ? [...currentConfigs] : [];

      if (existingConfigIndex >= 0) {
        const existingConfig = currentConfigs[existingConfigIndex];
        if (existingConfig.direction === 'asc') {
          newConfigs[existingConfigIndex] = { key, direction: 'desc' };
        } else if (existingConfig.direction === 'desc') {
          newConfigs.splice(existingConfigIndex, 1);
        }
      } else {
        newConfigs.push({ key, direction: 'asc' });
      }

      return newConfigs;
    });
  };

  return {
    items: sortedItems,
    sortConfigs,
    requestSort,
  };
}