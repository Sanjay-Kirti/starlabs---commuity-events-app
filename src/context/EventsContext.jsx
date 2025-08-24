import React, { createContext, useContext, useReducer } from 'react';
import { eventsData } from '../data/events';

const EventsContext = createContext();

const initialState = {
  events: eventsData.events,
  filteredEvents: eventsData.events,
  rsvpedEvents: [],
  filters: {
    type: '',
    location: '',
    dateRange: '',
    searchQuery: ''
  },
  currentPage: 1,
  eventsPerPage: 12,
  loading: false,
  error: null
};

const eventsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_FILTERS':
      const newFilters = { ...state.filters, ...action.payload };
      const filtered = filterEvents(state.events, newFilters);
      return {
        ...state,
        filters: newFilters,
        filteredEvents: filtered,
        currentPage: 1
      };
    
    case 'SET_SEARCH_QUERY':
      const updatedFilters = { ...state.filters, searchQuery: action.payload };
      const searchFiltered = filterEvents(state.events, updatedFilters);
      return {
        ...state,
        filters: updatedFilters,
        filteredEvents: searchFiltered,
        currentPage: 1
      };
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'ADD_RSVP':
      return {
        ...state,
        rsvpedEvents: [...state.rsvpedEvents, action.payload]
      };
    
    case 'REMOVE_RSVP':
      return {
        ...state,
        rsvpedEvents: state.rsvpedEvents.filter(id => id !== action.payload)
      };
    
    case 'ADD_EVENT':
      const newEvent = {
        ...action.payload,
        id: Math.max(...state.events.map(e => e.id)) + 1
      };
      const updatedEvents = [...state.events, newEvent];
      return {
        ...state,
        events: updatedEvents,
        filteredEvents: filterEvents(updatedEvents, state.filters)
      };
    
    default:
      return state;
  }
};

const filterEvents = (events, filters) => {
  return events.filter(event => {
    const matchesType = !filters.type || event.type === filters.type;
    const matchesLocation = !filters.location || event.location === filters.location;
    const matchesSearch = !filters.searchQuery || 
      event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      event.host.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    let matchesDate = true;
    if (filters.dateRange) {
      const eventDate = new Date(event.date);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      
      switch (filters.dateRange) {
        case 'today':
          matchesDate = eventDate.toDateString() === today.toDateString();
          break;
        case 'tomorrow':
          matchesDate = eventDate.toDateString() === tomorrow.toDateString();
          break;
        case 'this-week':
          matchesDate = eventDate >= today && eventDate <= nextWeek;
          break;
        case 'this-month':
          matchesDate = eventDate >= today && eventDate <= nextMonth;
          break;
        default:
          matchesDate = true;
      }
    }
    
    return matchesType && matchesLocation && matchesSearch && matchesDate;
  });
};

export const EventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setCurrentPage = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const addRSVP = (eventId) => {
    dispatch({ type: 'ADD_RSVP', payload: eventId });
  };

  const removeRSVP = (eventId) => {
    dispatch({ type: 'REMOVE_RSVP', payload: eventId });
  };

  const addEvent = (event) => {
    dispatch({ type: 'ADD_EVENT', payload: event });
  };

  const getEventById = (id) => {
    return state.events.find(event => event.id === parseInt(id));
  };

  const isRSVPed = (eventId) => {
    return state.rsvpedEvents.includes(eventId);
  };

  const getUniqueLocations = () => {
    return [...new Set(state.events.map(event => event.location))].sort();
  };

  const getUniqueTypes = () => {
    return [...new Set(state.events.map(event => event.type))].sort();
  };

  const getPaginatedEvents = () => {
    const startIndex = (state.currentPage - 1) * state.eventsPerPage;
    const endIndex = startIndex + state.eventsPerPage;
    return state.filteredEvents.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(state.filteredEvents.length / state.eventsPerPage);
  };

  const value = {
    ...state,
    setFilters,
    setSearchQuery,
    setCurrentPage,
    addRSVP,
    removeRSVP,
    addEvent,
    getEventById,
    isRSVPed,
    getUniqueLocations,
    getUniqueTypes,
    getPaginatedEvents,
    getTotalPages
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
