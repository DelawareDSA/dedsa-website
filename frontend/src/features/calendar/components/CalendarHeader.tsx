'use client';

import type { CalendarViewType } from '@/core/types/pages/calendar';
import { motion } from 'framer-motion';

interface CalendarHeaderProps {
  currentDate: Date;
  viewType: CalendarViewType['type'];
  onViewChange: (view: CalendarViewType['type']) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onToday: () => void;
}

const VIEW_OPTIONS: CalendarViewType[] = [
  { type: 'month', label: 'Month' },
  { type: 'week', label: 'Week' },
  { type: 'day', label: 'Day' },
  { type: 'list', label: 'List' },
];

export default function CalendarHeader({
  currentDate,
  viewType,
  onViewChange,
  onNavigate,
  onToday,
}: CalendarHeaderProps) {
  const formatTitle = () => {
    switch (viewType) {
      case 'month': {
        return currentDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
      }
      case 'week': {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
      case 'day': {
        return currentDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
      case 'list': {
        return 'Upcoming Events';
      }
      default: {
        return '';
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      {}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('prev')}
            className="p-2 hover:bg-dsa-red-t4 rounded-lg transition-colors"
            aria-label="Previous"
          >
            {}
          </button>
          <button
            onClick={() => onNavigate('next')}
            className="p-2 hover:bg-dsa-red-t4 rounded-lg transition-colors"
            aria-label="Next"
          >
            {}
          </button>
        </div>

        <motion.h2
          key={formatTitle()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          {formatTitle()}
        </motion.h2>

        <button
          onClick={onToday}
          className="px-3 py-1 text-sm bg-dsa-red text-white rounded hover:bg-red-700 transition-colors"
        >
          Today
        </button>
      </div>

      {}
      <div className="flex bg-dsa-red-t4 rounded-lg p-1">
        {VIEW_OPTIONS.map((option) => (
          <button
            key={option.type}
            onClick={() => onViewChange(option.type)}
            className={`px-3 py-2 text-sm rounded transition-all ${
              viewType === option.type
                ? 'bg-white shadow-sm text-dsa-red font-medium'
                : 'text-dsa-black hover:text-dsa-black'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
