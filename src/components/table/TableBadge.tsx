import React from 'react';

interface BadgeProps {
  variant: 'status' | 'recommendation' | 'type';
  value: string;
}

export const TableBadge: React.FC<BadgeProps> = ({ variant, value }) => {
  const getColorClasses = () => {
    switch (variant) {
      case 'status':
        switch (value.toLowerCase()) {
          case 'open': return 'bg-green-100 text-green-800';
          case 'upcoming': return 'bg-yellow-100 text-yellow-800';
          case 'closed': return 'bg-gray-100 text-gray-800';
          default: return 'bg-gray-100 text-gray-800';
        }
      case 'recommendation':
        switch (value) {
          case 'subscribe': return 'bg-green-100 text-green-800';
          case 'avoid': return 'bg-red-100 text-red-800';
          default: return 'bg-yellow-100 text-yellow-800';
        }
      case 'type':
        switch (value.toLowerCase()) {
          case 'mainboard': return 'bg-purple-100 text-purple-800';
          case 'sme': return 'bg-blue-100 text-blue-800';
          default: return 'bg-gray-100 text-gray-800';
        }
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getColorClasses()}`}>
      {value}
    </span>
  );
};