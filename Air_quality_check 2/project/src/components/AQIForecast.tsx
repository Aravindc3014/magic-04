import React from 'react';
import { ForecastData } from '../types';
import { AQI_COLORS, AQI_TEXT_CLASSES } from '../constants/aqi-levels';
import { Calendar } from 'lucide-react';

interface AQIForecastProps {
  forecastData: ForecastData[] | null;
  loading: boolean;
}

const AQIForecast: React.FC<AQIForecastProps> = ({ forecastData, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-500 text-center">No forecast data available</p>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
      date: date.getDate(),
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-blue-600" />
        7-Day AQI Forecast
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
        {forecastData.map((day, index) => {
          const { day: weekday, date } = formatDate(day.date);
          return (
            <div 
              key={index}
              className="border rounded-lg overflow-hidden transition-transform duration-200 hover:transform hover:scale-105"
            >
              <div className="bg-gray-100 px-2 py-1 text-center border-b">
                <p className="font-medium">{weekday}</p>
                <p className="text-sm text-gray-600">{date}</p>
              </div>
              <div className="p-3 text-center">
                <div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${AQI_COLORS[day.level]}30` }}
                >
                  <span className="text-lg font-bold" style={{ color: AQI_COLORS[day.level] }}>
                    {day.aqi}
                  </span>
                </div>
                <p className={`text-sm ${AQI_TEXT_CLASSES[day.level]} font-medium truncate`}>
                  {day.level}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AQIForecast;