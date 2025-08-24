import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, addRSVP, removeRSVP, isRSVPed } = useEvents();
  
  const event = getEventById(id);
  
  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    return eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const handleRSVP = () => {
    if (isRSVPed(event.id)) {
      removeRSVP(event.id);
    } else {
      addRSVP(event.id);
      navigate(`/rsvp-confirmation/${event.id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Events
        </Link>
      </div>

      <div className="card p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <span className={`badge ${getTypeColor(event.type)}`}>
                {event.type}
              </span>
              <span className="text-gray-500">{formatDate(event.date)}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>
          </div>
          
          <button
            onClick={handleRSVP}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isRSVPed(event.id)
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {isRSVPed(event.id) ? 'RSVP\'d ✓' : 'RSVP to Event'}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {event.description}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0v-1a4 4 0 014-4h4a4 4 0 014 4v1a4 4 0 11-8 0z" />
                  </svg>
                  <span className="text-gray-700">{formatDate(event.date)}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{event.location}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-700">Hosted by {event.host}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="text-gray-700">{event.type}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleRSVP}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    isRSVPed(event.id)
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isRSVPed(event.id) ? 'Cancel RSVP' : 'RSVP Now'}
                </button>
                
                <button className="w-full btn-secondary">
                  Share Event
                </button>
                
                <button className="w-full btn-secondary">
                  Add to Calendar
                </button>
              </div>
            </div>
            
            <div className="card p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Event Host</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {event.host.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{event.host}</p>
                  <p className="text-sm text-gray-500">Event Organizer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
