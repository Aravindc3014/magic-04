import React from 'react';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  Gauge,
  CloudFog,
  Factory,
  Car,
  Sun
} from 'lucide-react';

interface PredictionData {
  pm10: number;
  co: number;
  no2: number;
  so2: number;
  o3: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  predictedAQI: number;
}

interface AQIPredictionProps {
  predictionData: PredictionData | null;
  loading: boolean;
}

const AQIPrediction: React.FC<AQIPredictionProps> = ({ predictionData, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!predictionData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-500 text-center">No prediction data available</p>
      </div>
    );
  }

  const parameters = [
    {
      name: 'PM10',
      value: predictionData.pm10,
      unit: 'µg/m³',
      icon: CloudFog,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      name: 'CO',
      value: predictionData.co,
      unit: 'mg/m³',
      icon: Factory,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'NO₂',
      value: predictionData.no2,
      unit: 'ppb',
      icon: Car,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      name: 'SO₂',
      value: predictionData.so2,
      unit: 'ppb',
      icon: Factory,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'O₃',
      value: predictionData.o3,
      unit: 'ppb',
      icon: Sun,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Temperature',
      value: predictionData.temperature,
      unit: '°C',
      icon: Thermometer,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Humidity',
      value: predictionData.humidity,
      unit: '%',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Wind Speed',
      value: predictionData.windSpeed,
      unit: 'km/h',
      icon: Wind,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <Gauge className="h-6 w-6 mr-2 text-blue-600" />
        Predicted Air Quality Parameters
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {parameters.map((param, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
          >
            <div className={`rounded-full w-10 h-10 ${param.bgColor} flex items-center justify-center mb-3`}>
              <param.icon className={`h-6 w-6 ${param.color}`} />
            </div>
            <h3 className="text-sm font-medium text-gray-600">{param.name}</h3>
            <p className="text-xl font-bold text-gray-800">
              {param.value.toFixed(1)}
              <span className="text-sm font-normal text-gray-500 ml-1">
                {param.unit}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Predicted AQI</h3>
          <div className="text-3xl font-bold text-blue-600">
            {predictionData.predictedAQI.toFixed(0)}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          This prediction is based on current environmental conditions and historical data patterns.
        </p>
      </div>
    </div>
  );
};

export default AQIPrediction;