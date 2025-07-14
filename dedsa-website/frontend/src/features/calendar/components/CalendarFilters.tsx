'use client';
import { safeFilter } from '@/utils/safeFilter';

import type { CalendarFilters } from '@/core/types/pages/calendar';
import { useState } from 'react';

interface CalendarFiltersProps {
  filters: CalendarFilters;
  onFiltersChange: (filters: CalendarFilters) => void;
}

const CATEGORIES = [
  { value: 'meeting', label: 'Meetings' },
  { value: 'action', label: 'Actions' },
  { value: 'social', label: 'Social Events' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
];

const COMMITTEES = [
  { value: 'General', label: 'General' },
  { value: 'Housing Justice', label: 'Housing Justice' },
  { value: 'International Solidarity', label: 'International Solidarity' },
  { value: 'Communications', label: 'Communications' },
  { value: 'Political Education', label: 'Political Education' },
  { value: 'Mutual Aid', label: 'Mutual Aid' },
];

export default function CalendarFilters({
  filters,
  onFiltersChange,
}: CalendarFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : safeFilter(filters.categories, (c) => c !== category);

    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handleCommitteeChange = (committee: string, checked: boolean) => {
    const newCommittees = checked
      ? [...filters.committees, committee]
      : safeFilter(filters.committees, (c) => c !== committee);

    onFiltersChange({
      ...filters,
      committees: newCommittees,
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({
      ...filters,
      searchTerm,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      committees: [],
      searchTerm: '',
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.committees.length > 0 ||
    filters.searchTerm;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {}
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search events
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dsa-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="search"
              type="text"
              placeholder="Search events..."
              value={filters.searchTerm || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dsa-red focus:border-transparent"
            />
          </div>
        </div>

        {}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            hasActiveFilters
              ? 'bg-dsa-red text-white'
              : 'bg-dsa-red-t4 text-dsa-black hover:bg-gray-200'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
            />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="bg-white text-dsa-red rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
              {filters.categories.length + filters.committees.length}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-dsa-black hover:text-dsa-black transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {}
            <div>
              <h3 className="font-semibold text-dsa-black mb-3">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.value)}
                      onChange={(e) =>
                        handleCategoryChange(category.value, e.target.checked)
                      }
                      className="rounded border-gray-300 text-dsa-red focus:ring-dsa-red"
                    />
                    <span className="text-sm text-dsa-black">
                      {category.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {}
            <div>
              <h3 className="font-semibold text-dsa-black mb-3">Committees</h3>
              <div className="space-y-2">
                {COMMITTEES.map((committee) => (
                  <label
                    key={committee.value}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={filters.committees.includes(committee.value)}
                      onChange={(e) =>
                        handleCommitteeChange(committee.value, e.target.checked)
                      }
                      className="rounded border-gray-300 text-dsa-red focus:ring-dsa-red"
                    />
                    <span className="text-sm text-dsa-black">
                      {committee.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
