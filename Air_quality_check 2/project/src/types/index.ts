// AQI level types
export enum AQILevel {
  Good = "Good",
  Moderate = "Moderate",
  UnhealthyForSensitiveGroups = "Unhealthy for Sensitive Groups",
  Unhealthy = "Unhealthy",
  VeryUnhealthy = "Very Unhealthy",
  Hazardous = "Hazardous"
}

// AQI data interface for current readings
export interface AQIData {
  aqi: number;
  level: AQILevel;
  mainPollutant: string;
  timestamp: string;
  location: Location;
}

// Location interface
export interface Location {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Forecast data interface
export interface ForecastData {
  date: string;
  aqi: number;
  level: AQILevel;
}

// Weather data that affects air quality
export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
}

// Health recommendations based on AQI level
export interface HealthRecommendation {
  level: AQILevel;
  generalAdvice: string;
  sensitiveGroups: string;
  outdoorActivities: string;
  indoorAdvice: string;
}

// Historical data point for charts
export interface HistoricalDataPoint {
  timestamp: string;
  aqi: number;
  level: AQILevel;
}

// Prediction data interface
export interface PredictionData {
  pm10: number;
  co: number;
  no2: number;
  so2: number;
  o3: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  predictedAQI: number;
  timestamp: string;
}