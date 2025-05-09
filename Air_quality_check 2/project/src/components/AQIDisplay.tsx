import React from 'react';
import { AQIData, WeatherData } from '../types';
import { AQI_COLORS, AQI_BG_CLASSES, getHealthRecommendation } from '../constants/aqi-levels';
import { Thermometer, Droplets, Wind, Umbrella } from 'lucide-react';

interface AQIDisplayProps {
  aqiData: AQIData | null;
  weatherData: WeatherData | null;
  loading: boolean;
}

const AQIDisplay: React.FC<AQIDisplayProps> = ({ aqiData, weatherData, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!aqiData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-500 text-center">No AQI data available</p>
      </div>
    );
  }

  const { aqi, level, mainPollutant, location } = aqiData;
  const healthRecommendation = getHealthRecommendation(level);
  
  // Calculate a progress percentage for the AQI gauge (0-500 scale)
  const aqiPercentage = Math.min(100, (aqi / 500) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
      <div className={`${AQI_BG_CLASSES[level]} px-6 py-4 transition-all duration-500`}>
        <h2 className="text-white text-lg md:text-xl font-semibold flex items-center justify-between">
          <span>Current Air Quality</span>
          <span>{new Date().toLocaleDateString()}</span>
        </h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-800">{location.name}</h3>
            <p className="text-gray-600">Last updated: {new Date(aqiData.timestamp).toLocaleTimeString()}</p>
          </div>
          
          {weatherData && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center">
                <Thermometer className="h-5 w-5 mr-1 text-red-500" />
                <span>{weatherData.temperature}°C</span>
              </div>
              <div className="flex items-center">
                <Droplets className="h-5 w-5 mr-1 text-blue-500" />
                <span>{weatherData.humidity}%</span>
              </div>
              <div className="flex items-center">
                <Wind className="h-5 w-5 mr-1 text-gray-500" />
                <span>{weatherData.windSpeed} km/h {weatherData.windDirection}</span>
              </div>
              <div className="flex items-center">
                <Umbrella className="h-5 w-5 mr-1 text-indigo-500" />
                <span>{weatherData.precipitation} mm</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="relative w-40 h-40 mb-4 md:mb-0 md:mr-8">
            <div 
              className="w-full h-full rounded-full border-8 border-gray-200 flex items-center justify-center"
              style={{ 
                background: `conic-gradient(${AQI_COLORS[level]} ${aqiPercentage}%, transparent ${aqiPercentage}%)`,
                boxShadow: `0 0 15px ${AQI_COLORS[level]}40`
              }}
            >
              <div className="bg-white rounded-full w-[calc(100%-16px)] h-[calc(100%-16px)] flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-3xl font-bold" style={{ color: AQI_COLORS[level] }}>{aqi}</span>
                  <span className="text-xs text-gray-500">AQI</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:flex-1">
            <h3 className="text-2xl font-bold mb-2" style={{ color: AQI_COLORS[level] }}>
              {level}
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Main Pollutant:</span> {mainPollutant}
            </p>
            <p className="text-gray-700">{healthRecommendation.generalAdvice}</p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-800 mb-2">Health Recommendations:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="inline-block w-3 h-3 rounded-full mr-2 mt-1.5" style={{ backgroundColor: AQI_COLORS[level] }}></span>
              <span><strong>Sensitive Groups:</strong> {healthRecommendation.sensitiveGroups}</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-3 h-3 rounded-full mr-2 mt-1.5" style={{ backgroundColor: AQI_COLORS[level] }}></span>
              <span><strong>Outdoor Activities:</strong> {healthRecommendation.outdoorActivities}</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-3 h-3 rounded-full mr-2 mt-1.5" style={{ backgroundColor: AQI_COLORS[level] }}></span>
              <span><strong>Indoor Advice:</strong> {healthRecommendation.indoorAdvice}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AQIDisplay;