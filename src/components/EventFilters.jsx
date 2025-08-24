import React, { useState } from 'react';
import { useEvents } from '../context/EventsContext';

const EventFilters = () => {
  const { 
    filters, 
    setFilters, 
    setSearchQuery, 
    getUniqueTypes, 
    getUniqueLocations,
    filteredEvents 
  } = useEvents();
  
  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  
  const types = getUniqueTypes();
  const locations = getUniqueLocations();

  const handleFilterChange = (filterType, value) => {
    setFilters({ [filterType]: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchQuery(value);
  };

  const clearFilters = () => {
    setFilters({ type: '', location: '', dateRange: '' });
    setSearchInput('');
    setSearchQuery('');
  };

  const hasActiveFilters = filters.type || filters.location || filters.dateRange || filters.searchQuery;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filter Events</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Events
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, description, or host..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </span>
        {hasActiveFilters && (
          <div className="flex items-center space-x-2">
            <span>Active filters:</span>
            <div className="flex space-x-2">
              {filters.type && (
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                  {filters.type}
                </span>
              )}
              {filters.location && (
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                  {filters.location}
                </span>
              )}
              {filters.dateRange && (
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                  {filters.dateRange.replace('-', ' ')}
                </span>
              )}
              {filters.searchQuery && (
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                  "{filters.searchQuery}"
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilters;
