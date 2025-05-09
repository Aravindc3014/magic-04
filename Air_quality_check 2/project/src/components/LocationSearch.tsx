import React, { useState, useEffect } from 'react';
import { MapPin, Search, Loader } from 'lucide-react';
import { searchLocations } from '../utils/api';
import { Location } from '../types';

interface LocationSearchProps {
  onSelectLocation: (locationName: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      if (query.trim() === '') {
        setLocations([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      try {
        const results = await searchLocations(query);
        setLocations(results);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchLocations, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleLocationSelect = (locationName: string) => {
    onSelectLocation(locationName);
    setQuery(locationName);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() !== '' && setShowDropdown(true)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Loader className="h-5 w-5 text-gray-400 animate-spin" />
          </div>
        )}
      </div>

      {showDropdown && locations.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {locations.map((location, index) => (
              <li
                key={index}
                onClick={() => handleLocationSelect(location.name)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-gray-800"
              >
                <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                <span>{location.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;