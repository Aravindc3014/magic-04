import React from 'react';
import { Wind, Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Wind className="h-8 w-8 text-blue-400 mr-2" />
            <h2 className="text-xl font-bold text-white">AirQuality Predict</h2>
          </div>
          
          <div className="flex space-x-4">
            <a href="#github" className="text-gray-300 hover:text-white transition-colors duration-200">
              <Github className="h-6 w-6" />
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-3">About</h3>
            <p className="text-sm">
              AirQuality Predict provides real-time air quality monitoring and predictions to help you make informed decisions about outdoor activities and health precautions.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#learn" className="hover:text-blue-400 transition-colors duration-200">Learn about AQI</a></li>
              <li><a href="#health" className="hover:text-blue-400 transition-colors duration-200">Health Implications</a></li>
              <li><a href="#data" className="hover:text-blue-400 transition-colors duration-200">Our Data Sources</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-3">Subscribe</h3>
            <p className="text-sm mb-3">Get air quality alerts for your location</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 text-sm rounded-l-md w-full bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-r-md transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <div className="text-center mb-4">
            <h3 className="text-white font-semibold mb-2">Development Team</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-sm">
                <p className="font-medium">Jaiakash M</p>
                <p className="text-gray-400">Lead Developer</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Aravindhan R</p>
                <p className="text-gray-400">Frontend Developer</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Abishek V</p>
                <p className="text-gray-400">Backend Developer</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Aravind C</p>
                <p className="text-gray-400">UI/UX Developer</p>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm">
            <p className="flex items-center justify-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for cleaner air
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} AirQuality Predict. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;