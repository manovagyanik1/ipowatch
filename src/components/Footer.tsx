import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';
import { APP_CONFIG } from '../constants/app';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{APP_CONFIG.NAME}</h3>
            <p className="text-gray-400">
              {APP_CONFIG.DESCRIPTION}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/about')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/terms')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/privacy')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href={APP_CONFIG.SOCIAL.GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href={APP_CONFIG.SOCIAL.TWITTER} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href={`mailto:${APP_CONFIG.CONTACT_EMAIL}`} className="hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Stay updated with our latest IPO recommendations
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};