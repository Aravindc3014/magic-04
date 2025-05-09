import { AQILevel, HealthRecommendation } from '../types';

// AQI level thresholds
export const AQI_THRESHOLDS = {
  GOOD: { min: 0, max: 50 },
  MODERATE: { min: 51, max: 100 },
  UNHEALTHY_FOR_SENSITIVE_GROUPS: { min: 101, max: 150 },
  UNHEALTHY: { min: 151, max: 200 },
  VERY_UNHEALTHY: { min: 201, max: 300 },
  HAZARDOUS: { min: 301, max: 500 },
};

// Color codes for each AQI level
export const AQI_COLORS = {
  [AQILevel.Good]: '#00E400', // Green
  [AQILevel.Moderate]: '#FFFF00', // Yellow
  [AQILevel.UnhealthyForSensitiveGroups]: '#FF7E00', // Orange
  [AQILevel.Unhealthy]: '#FF0000', // Red
  [AQILevel.VeryUnhealthy]: '#8F3F97', // Purple
  [AQILevel.Hazardous]: '#7E0023', // Maroon
};

// Tailwind background classes for each AQI level
export const AQI_BG_CLASSES = {
  [AQILevel.Good]: 'bg-green-500',
  [AQILevel.Moderate]: 'bg-yellow-400',
  [AQILevel.UnhealthyForSensitiveGroups]: 'bg-orange-500',
  [AQILevel.Unhealthy]: 'bg-red-500',
  [AQILevel.VeryUnhealthy]: 'bg-purple-700',
  [AQILevel.Hazardous]: 'bg-red-900',
};

// Tailwind text classes for each AQI level
export const AQI_TEXT_CLASSES = {
  [AQILevel.Good]: 'text-green-500',
  [AQILevel.Moderate]: 'text-yellow-600',
  [AQILevel.UnhealthyForSensitiveGroups]: 'text-orange-500',
  [AQILevel.Unhealthy]: 'text-red-500',
  [AQILevel.VeryUnhealthy]: 'text-purple-700',
  [AQILevel.Hazardous]: 'text-red-900',
};

// Get AQI level based on AQI value
export const getAQILevel = (aqi: number): AQILevel => {
  if (aqi <= AQI_THRESHOLDS.GOOD.max) return AQILevel.Good;
  if (aqi <= AQI_THRESHOLDS.MODERATE.max) return AQILevel.Moderate;
  if (aqi <= AQI_THRESHOLDS.UNHEALTHY_FOR_SENSITIVE_GROUPS.max) return AQILevel.UnhealthyForSensitiveGroups;
  if (aqi <= AQI_THRESHOLDS.UNHEALTHY.max) return AQILevel.Unhealthy;
  if (aqi <= AQI_THRESHOLDS.VERY_UNHEALTHY.max) return AQILevel.VeryUnhealthy;
  return AQILevel.Hazardous;
};

// Health recommendations for each AQI level
export const HEALTH_RECOMMENDATIONS: HealthRecommendation[] = [
  {
    level: AQILevel.Good,
    generalAdvice: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
    sensitiveGroups: "No precautions needed.",
    outdoorActivities: "Great time for outdoor activities.",
    indoorAdvice: "No special indoor measures required."
  },
  {
    level: AQILevel.Moderate,
    generalAdvice: "Air quality is acceptable; however, there may be some concern for a small number of people who are unusually sensitive to air pollution.",
    sensitiveGroups: "Unusually sensitive people should consider reducing prolonged or heavy exertion.",
    outdoorActivities: "Most people can safely engage in outdoor activities.",
    indoorAdvice: "No special indoor measures required."
  },
  {
    level: AQILevel.UnhealthyForSensitiveGroups,
    generalAdvice: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
    sensitiveGroups: "People with heart or lung disease, older adults, children, and teenagers should reduce prolonged or heavy exertion.",
    outdoorActivities: "Keep outdoor activities moderate and take more breaks.",
    indoorAdvice: "Consider running an air purifier if available."
  },
  {
    level: AQILevel.Unhealthy,
    generalAdvice: "Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects.",
    sensitiveGroups: "People with heart or lung disease, older adults, children, and teenagers should avoid prolonged or heavy exertion.",
    outdoorActivities: "Everyone should reduce prolonged or heavy exertion. Move activities indoors or reschedule.",
    indoorAdvice: "Keep windows closed. Use air purifiers if available."
  },
  {
    level: AQILevel.VeryUnhealthy,
    generalAdvice: "Health alert: everyone may experience more serious health effects.",
    sensitiveGroups: "People with heart or lung disease, older adults, children, and teenagers should avoid all physical activity outdoors.",
    outdoorActivities: "Everyone should avoid prolonged or heavy exertion. Consider moving all activities indoors.",
    indoorAdvice: "Stay indoors with windows closed. Use air purifiers."
  },
  {
    level: AQILevel.Hazardous,
    generalAdvice: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
    sensitiveGroups: "People with heart or lung disease, older adults, children, and teenagers should remain indoors and keep activity levels low.",
    outdoorActivities: "Everyone should avoid all outdoor physical activity.",
    indoorAdvice: "Stay indoors. Keep windows and doors tightly closed. Run air purifiers continuously."
  }
];

// Get health recommendation based on AQI level
export const getHealthRecommendation = (level: AQILevel): HealthRecommendation => {
  return HEALTH_RECOMMENDATIONS.find(rec => rec.level === level) || HEALTH_RECOMMENDATIONS[0];
};