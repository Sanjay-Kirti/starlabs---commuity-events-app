import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

const EventCard = ({ event }) => {
  const { addRSVP, removeRSVP, isRSVPed } = useEvents();
  
  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (eventDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (eventDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return eventDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'Fitness': 'bg-green-100 text-green-800',
      'Music': 'bg-purple-100 text-purple-800',
      'Sports': 'bg-blue-100 text-blue-800',
      'Meetup': 'bg-yellow-100 text-yellow-800',
      'Workshop': 'bg-indigo-100 text-indigo-800',
      'Social': 'bg-pink-100 text-pink-800',
      'Entertainment': 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const handleRSVP = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isRSVPed(event.id)) {
      removeRSVP(event.id);
    } else {
      addRSVP(event.id);
    }
  };

  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <span className={`badge ${getTypeColor(event.type)}`}>
          {event.type}
        </span>
        <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {event.host}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <Link
          to={`/event/${event.id}`}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
        >
          View Details
        </Link>
        
        <button
          onClick={handleRSVP}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            isRSVPed(event.id)
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {isRSVPed(event.id) ? 'RSVP\'d' : 'RSVP'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
