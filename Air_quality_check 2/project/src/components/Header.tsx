import React, { useState } from 'react';
import { Wind, AlertTriangle, Search, User, Menu, X } from 'lucide-react';
import LocationSearch from './LocationSearch';

interface HeaderProps {
  onLocationSelect: (locationName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLocationSelect }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (locationName: string) => {
    onLocationSelect(locationName);
    setSearchVisible(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <Wind className="h-8 w-8" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">AirQuality Predict</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              className="hover:text-blue-200 transition-colors duration-200 flex items-center space-x-1"
              onClick={() => setSearchVisible(!searchVisible)}
            >
              <Search className="h-5 w-5" />
              <span>Search Location</span>
            </button>
            <a href="#alerts" className="hover:text-blue-200 transition-colors duration-200 flex items-center space-x-1">
              <AlertTriangle className="h-5 w-5" />
              <span>Alerts</span>
            </a>
            <a href="#profile" className="hover:text-blue-200 transition-colors duration-200 flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchVisible && (
          <div className="mt-4 animate-fadeIn">
            <LocationSearch onSelectLocation={handleSearchSubmit} />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 space-y-3 md:hidden animate-fadeIn">
            <button 
              className="block w-full text-left py-2 px-3 rounded hover:bg-blue-700 transition-colors duration-200"
              onClick={() => {
                setSearchVisible(!searchVisible);
                if (!searchVisible) setMobileMenuOpen(false);
              }}
            >
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Location</span>
              </div>
            </button>
            <a 
              href="#alerts"
              className="block w-full text-left py-2 px-3 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Alerts</span>
              </div>
            </a>
            <a 
              href="#profile"
              className="block w-full text-left py-2 px-3 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </div>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;