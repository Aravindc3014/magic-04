import { AQIData, ForecastData, HistoricalDataPoint, WeatherData, Location, PredictionData } from '../types';
import { getAQILevel } from '../constants/aqi-levels';

// Sample locations for Indian states and Tamil Nadu districts
const SAMPLE_LOCATIONS: Location[] = [
  // Major Tamil Nadu Districts
  {
    name: "Chennai, Tamil Nadu",
    coordinates: { latitude: 13.0827, longitude: 80.2707 }
  },
  {
    name: "Coimbatore, Tamil Nadu",
    coordinates: { latitude: 11.0168, longitude: 76.9558 }
  },
  {
    name: "Madurai, Tamil Nadu",
    coordinates: { latitude: 9.9252, longitude: 78.1198 }
  },
  {
    name: "Salem, Tamil Nadu",
    coordinates: { latitude: 11.6643, longitude: 78.1460 }
  },
  {
    name: "Tiruchirappalli, Tamil Nadu",
    coordinates: { latitude: 10.7905, longitude: 78.7047 }
  },
  {
    name: "Tirunelveli, Tamil Nadu",
    coordinates: { latitude: 8.7139, longitude: 77.7567 }
  },
  {
    name: "Erode, Tamil Nadu",
    coordinates: { latitude: 11.3410, longitude: 77.7172 }
  },
  {
    name: "Vellore, Tamil Nadu",
    coordinates: { latitude: 12.9165, longitude: 79.1325 }
  },
  {
    name: "Thoothukudi, Tamil Nadu",
    coordinates: { latitude: 8.7642, longitude: 78.1348 }
  },
  {
    name: "Thanjavur, Tamil Nadu",
    coordinates: { latitude: 10.7870, longitude: 79.1378 }
  },
  {
    name: "Dindigul, Tamil Nadu",
    coordinates: { latitude: 10.3624, longitude: 77.9695 }
  },
  {
    name: "Kancheepuram, Tamil Nadu",
    coordinates: { latitude: 12.8185, longitude: 79.6947 }
  },
  {
    name: "Tiruppur, Tamil Nadu",
    coordinates: { latitude: 11.1085, longitude: 77.3411 }
  },
  {
    name: "Karur, Tamil Nadu",
    coordinates: { latitude: 10.9601, longitude: 78.0766 }
  },
  {
    name: "Namakkal, Tamil Nadu",
    coordinates: { latitude: 11.2342, longitude: 78.1673 }
  },
  // Other major Indian cities
  {
    name: "Delhi, NCR",
    coordinates: { latitude: 28.6139, longitude: 77.2090 }
  },
  {
    name: "Mumbai, Maharashtra",
    coordinates: { latitude: 19.0760, longitude: 72.8777 }
  },
  {
    name: "Bangalore, Karnataka",
    coordinates: { latitude: 12.9716, longitude: 77.5946 }
  },
  {
    name: "Kolkata, West Bengal",
    coordinates: { latitude: 22.5726, longitude: 88.3639 }
  },
  {
    name: "Hyderabad, Telangana",
    coordinates: { latitude: 17.3850, longitude: 78.4867 }
  }
];

// Get current AQI data for a location
export const getCurrentAQIData = async (locationName?: string): Promise<AQIData | null> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const location = locationName 
    ? SAMPLE_LOCATIONS.find(loc => loc.name.toLowerCase().includes(locationName.toLowerCase())) 
    : SAMPLE_LOCATIONS[0];
  
  if (!location) {
    return null;
  }
  
  // Generate AQI based on typical values for Indian cities and Tamil Nadu districts
  let baseAQI;
  if (location.name.includes("Delhi")) {
    baseAQI = Math.floor(Math.random() * 200) + 100; // Higher pollution levels
  } else if (location.name.includes("Mumbai") || location.name.includes("Kolkata")) {
    baseAQI = Math.floor(Math.random() * 150) + 50;
  } else if (location.name.includes("Chennai")) {
    baseAQI = Math.floor(Math.random() * 120) + 40; // Moderate to high pollution
  } else if (location.name.includes("Coimbatore")) {
    baseAQI = Math.floor(Math.random() * 80) + 30; // Generally better air quality
  } else {
    baseAQI = Math.floor(Math.random() * 100) + 30;
  }
  
  const aqi = baseAQI;
  const level = getAQILevel(aqi);
  
  const pollutants = ["PM2.5", "PM10", "O3", "NO2", "SO2", "CO"];
  const mainPollutant = pollutants[Math.floor(Math.random() * pollutants.length)];
  
  return {
    aqi,
    level,
    mainPollutant,
    timestamp: new Date().toISOString(),
    location
  };
};

// Get AQI forecast for next 7 days
export const getAQIForecast = async (location?: Location): Promise<ForecastData[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const forecast: ForecastData[] = [];
  const today = new Date();
  
  // Base AQI varies by region
  let baseAQI = 80;
  if (location?.name.includes("Delhi")) {
    baseAQI = 150;
  } else if (location?.name.includes("Mumbai") || location?.name.includes("Kolkata")) {
    baseAQI = 100;
  } else if (location?.name.includes("Chennai")) {
    baseAQI = 90;
  } else if (location?.name.includes("Coimbatore")) {
    baseAQI = 60;
  }
  
  for (let i = 0; i < 7; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(forecastDate.getDate() + i);
    
    const variation = Math.floor(Math.random() * 40) - 20;
    const aqi = Math.max(0, Math.min(500, baseAQI + variation));
    
    forecast.push({
      date: forecastDate.toISOString().split('T')[0],
      aqi,
      level: getAQILevel(aqi)
    });
  }
  
  return forecast;
};

// Get historical AQI data for charts
export const getHistoricalAQIData = async (days: number = 30, location?: Location): Promise<HistoricalDataPoint[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const historicalData: HistoricalDataPoint[] = [];
  const today = new Date();
  
  // Base AQI varies by region and season
  let baseAQI = 80;
  const month = today.getMonth();
  
  if (location?.name.includes("Tamil Nadu")) {
    // Tamil Nadu generally has better air quality during monsoon (Oct-Dec)
    baseAQI = month >= 9 && month <= 11 ? 50 : 70;
  } else if (location?.name.includes("Delhi")) {
    // Higher pollution in winter months (Oct-Feb)
    baseAQI = month >= 9 || month <= 1 ? 200 : 120;
  } else if (location?.name.includes("Mumbai")) {
    // Better air quality during monsoon (Jun-Sep)
    baseAQI = month >= 5 && month <= 8 ? 60 : 100;
  }
  
  for (let i = days; i >= 0; i--) {
    const historicalDate = new Date(today);
    historicalDate.setDate(historicalDate.getDate() - i);
    
    const trend = Math.sin(i / 10) * 30;
    const random = Math.floor(Math.random() * 50) - 25;
    const aqi = Math.max(0, Math.min(500, Math.floor(baseAQI + trend + random)));
    
    historicalData.push({
      timestamp: historicalDate.toISOString(),
      aqi,
      level: getAQILevel(aqi)
    });
  }
  
  return historicalData;
};

// Get weather data that affects air quality
export const getWeatherData = async (location?: Location): Promise<WeatherData> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Generate weather data based on typical Indian climate patterns
  let baseTemp, baseHumidity, baseWindSpeed, basePrecipitation;
  const month = new Date().getMonth();
  
  if (location?.name.includes("Tamil Nadu")) {
    // Hot and humid, influenced by northeast monsoon
    baseTemp = month >= 3 && month <= 6 ? 32 : 28;
    baseHumidity = month >= 9 && month <= 11 ? 85 : 70;
    baseWindSpeed = 8;
    basePrecipitation = month >= 9 && month <= 11 ? 10 : 2;
  } else if (location?.name.includes("Delhi")) {
    baseTemp = month >= 3 && month <= 6 ? 35 : month >= 10 ? 15 : 25;
    baseHumidity = month >= 6 && month <= 8 ? 80 : 50;
    baseWindSpeed = 10;
    basePrecipitation = month >= 6 && month <= 8 ? 8 : 1;
  } else if (location?.name.includes("Mumbai")) {
    baseTemp = 28;
    baseHumidity = 75;
    baseWindSpeed = 12;
    basePrecipitation = month >= 5 && month <= 8 ? 15 : 2;
  } else {
    baseTemp = 28;
    baseHumidity = 60;
    baseWindSpeed = 10;
    basePrecipitation = 4;
  }
  
  return {
    temperature: Math.floor(baseTemp + (Math.random() * 6) - 3),
    humidity: Math.floor(baseHumidity + (Math.random() * 20) - 10),
    windSpeed: Math.floor(baseWindSpeed + (Math.random() * 6) - 3),
    windDirection: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
    precipitation: Math.max(0, basePrecipitation + (Math.random() * 4) - 2)
  };
};

// Get prediction data
export const getPredictionData = async (location?: Location): Promise<PredictionData> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Base values vary by region and season
  let basePM10, baseCO, baseNO2, baseSO2, baseO3;
  const month = new Date().getMonth();
  
  if (location?.name.includes("Tamil Nadu")) {
    basePM10 = 45;
    baseCO = 0.8;
    baseNO2 = 25;
    baseSO2 = 15;
    baseO3 = 40;
  } else if (location?.name.includes("Delhi")) {
    basePM10 = 120;
    baseCO = 2.1;
    baseNO2 = 45;
    baseSO2 = 25;
    baseO3 = 60;
  } else {
    basePM10 = 60;
    baseCO = 1.2;
    baseNO2 = 30;
    baseSO2 = 20;
    baseO3 = 50;
  }
  
  // Add seasonal variations
  if (month >= 10 || month <= 1) { // Winter months
    basePM10 *= 1.3;
    baseCO *= 1.2;
    baseNO2 *= 1.4;
  } else if (month >= 6 && month <= 8) { // Monsoon
    basePM10 *= 0.7;
    baseCO *= 0.8;
    baseNO2 *= 0.9;
  }
  
  // Get weather data for predictions
  const weather = await getWeatherData(location);
  
  // Calculate predicted values with some random variation
  const variation = () => (Math.random() * 0.4) - 0.2; // ±20% variation
  
  const pm10 = Math.max(0, basePM10 * (1 + variation()));
  const co = Math.max(0, baseCO * (1 + variation()));
  const no2 = Math.max(0, baseNO2 * (1 + variation()));
  const so2 = Math.max(0, baseSO2 * (1 + variation()));
  const o3 = Math.max(0, baseO3 * (1 + variation()));
  
  // Calculate predicted AQI based on all parameters
  const predictedAQI = Math.floor(
    (pm10 / 100 + co / 2 + no2 / 40 + so2 / 30 + o3 / 50) * 50
  );
  
  return {
    pm10,
    co,
    no2,
    so2,
    o3,
    temperature: weather.temperature,
    humidity: weather.humidity,
    windSpeed: weather.windSpeed,
    predictedAQI,
    timestamp: new Date().toISOString()
  };
};

// Search for locations
export const searchLocations = async (query: string): Promise<Location[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query.trim()) {
    return SAMPLE_LOCATIONS;
  }
  
  return SAMPLE_LOCATIONS.filter(
    location => location.name.toLowerCase().includes(query.toLowerCase())
  );
};