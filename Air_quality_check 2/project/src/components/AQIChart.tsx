import React, { useEffect, useRef } from 'react';
import { HistoricalDataPoint } from '../types';
import { AQI_COLORS } from '../constants/aqi-levels';
import { BarChart, TrendingUp } from 'lucide-react';

interface AQIChartProps {
  historicalData: HistoricalDataPoint[] | null;
  loading: boolean;
}

const AQIChart: React.FC<AQIChartProps> = ({ historicalData, loading }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!historicalData || historicalData.length === 0 || loading || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear previous chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Data properties
    const dataPoints = historicalData.slice(-14); // Show last 14 days
    const maxAQI = Math.max(...dataPoints.map(point => point.aqi), 200); // Ensure a minimum scale
    const pointSpacing = chartWidth / (dataPoints.length - 1);

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#CBD5E1'; // Light gray
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    
    // Y-axis
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // Draw grid lines
    ctx.beginPath();
    ctx.strokeStyle = '#EFF6FF'; // Very light blue
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines (5 lines)
    for (let i = 1; i <= 5; i++) {
      const y = canvas.height - padding - (i * chartHeight / 5);
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
    }
    ctx.stroke();

    // Draw data line
    ctx.beginPath();
    ctx.strokeStyle = '#3B82F6'; // Blue
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    
    dataPoints.forEach((point, index) => {
      const x = padding + index * pointSpacing;
      const y = canvas.height - padding - (point.aqi / maxAQI) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw data points and AQI level-colored dots
    dataPoints.forEach((point, index) => {
      const x = padding + index * pointSpacing;
      const y = canvas.height - padding - (point.aqi / maxAQI) * chartHeight;
      
      // AQI-colored inner circle
      ctx.beginPath();
      ctx.fillStyle = AQI_COLORS[point.level];
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // White outer circle
      ctx.beginPath();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw x-axis labels (dates) for every 3rd point to avoid overcrowding
    ctx.fillStyle = '#64748B'; // Slate gray
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    dataPoints.forEach((point, index) => {
      if (index % 3 === 0 || index === dataPoints.length - 1) {
        const x = padding + index * pointSpacing;
        const y = canvas.height - padding + 15;
        const date = new Date(point.timestamp);
        const dateLabel = `${date.getDate()}/${date.getMonth() + 1}`;
        ctx.fillText(dateLabel, x, y);
      }
    });

    // Draw y-axis labels
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i <= 5; i++) {
      const y = canvas.height - padding - (i * chartHeight / 5);
      const label = Math.round(i * maxAQI / 5).toString();
      ctx.fillText(label, padding - 10, y);
    }
  }, [historicalData, loading]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-60 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!historicalData || historicalData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-500 text-center">No historical data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Historical AQI Trend
        </h2>
        <div className="flex items-center space-x-2">
          <BarChart className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">Last 2 Weeks</span>
        </div>
      </div>
      
      <div className="relative h-64 md:h-80">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          width={800}
          height={400}
        ></canvas>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
        {Object.entries(AQI_COLORS).slice(0, 3).map(([level, color]) => (
          <div key={level} className="flex items-center justify-center">
            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: color }}></span>
            <span className="text-gray-700">{level}</span>
          </div>
        ))}
        {Object.entries(AQI_COLORS).slice(3).map(([level, color]) => (
          <div key={level} className="flex items-center justify-center">
            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: color }}></span>
            <span className="text-gray-700">{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AQIChart;