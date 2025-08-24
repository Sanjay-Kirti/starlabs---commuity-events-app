import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            EventHub
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 border-b-2 border-primary-600 pb-1' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Explore Events
            </Link>
            <Link
              to="/create"
              className={`font-medium transition-colors ${
                isActive('/create') 
                  ? 'text-primary-600 border-b-2 border-primary-600 pb-1' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Create Event
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, Guest</span>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-medium text-sm">G</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
