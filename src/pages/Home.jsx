import React from 'react';
import EventFilters from '../components/EventFilters';
import EventList from '../components/EventList';
import Pagination from '../components/Pagination';

const Home = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Community Events</h1>
        <p className="text-gray-600">Find and join amazing events happening in your area</p>
      </div>
      
      <EventFilters />
      <EventList />
      <Pagination />
    </div>
  );
};

export default Home;
