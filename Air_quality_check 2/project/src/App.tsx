import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AQIDisplay from './components/AQIDisplay';
import AQIForecast from './components/AQIForecast';
import AQIChart from './components/AQIChart';
import AQIPrediction from './components/AQIPrediction';
import Footer from './components/Footer';
import { 
  getCurrentAQIData, 
  getAQIForecast, 
  getHistoricalAQIData,
  getWeatherData,
  getPredictionData
} from './utils/api';
import { AQIData, ForecastData, HistoricalDataPoint, WeatherData, PredictionData } from './types';

function App() {
  const [currentLocation, setCurrentLocation] = useState<string>('New York, NY');
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[] | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch all data
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch current AQI data first
        const currentAQI = await getCurrentAQIData(currentLocation);
        
        if (!currentAQI) {
          setError(`Location "${currentLocation}" not found. Please try another location.`);
          setAqiData(null);
          setForecastData(null);
          setHistoricalData(null);
          setWeatherData(null);
          setPredictionData(null);
          return;
        }
        
        setAqiData(currentAQI);
        
        // Fetch the rest in parallel
        const [forecast, historical, weather, prediction] = await Promise.all([
          getAQIForecast(currentAQI.location),
          getHistoricalAQIData(30, currentAQI.location),
          getWeatherData(currentAQI.location),
          getPredictionData(currentAQI.location)
        ]);
        
        setForecastData(forecast);
        setHistoricalData(historical);
        setWeatherData(weather);
        setPredictionData(prediction);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [currentLocation]);

  const handleLocationSelect = (locationName: string) => {
    setCurrentLocation(locationName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onLocationSelect={handleLocationSelect} />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <AQIDisplay 
            aqiData={aqiData} 
            weatherData={weatherData}
            loading={loading} 
          />
        </div>
        
        <div className="mb-6">
          <AQIPrediction
            predictionData={predictionData}
            loading={loading}
          />
        </div>
        
        <div className="mb-6">
          <AQIForecast 
            forecastData={forecastData} 
            loading={loading} 
          />
        </div>
        
        <div className="mb-6">
          <AQIChart 
            historicalData={historicalData} 
            loading={loading} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;