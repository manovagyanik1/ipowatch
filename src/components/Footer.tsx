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
        <div className="flex flex-wrap justify-between items-start">
          {/* About Section */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-white text-lg font-semibold mb-4">{APP_CONFIG.NAME}</h3>
            <p className="text-gray-400 max-w-md">
              {APP_CONFIG.DESCRIPTION}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap w-full md:w-2/3 justify-end space-x-12">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Navigation</h3>
              <div className="flex space-x-8">
                <button onClick={() => handleNavigation('/')} className="hover:text-white transition-colors">
                  Home
                </button>
                <button onClick={() => handleNavigation('/about')} className="hover:text-white transition-colors">
                  About
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
              <div className="flex space-x-8">
                <button onClick={() => handleNavigation('/terms')} className="hover:text-white transition-colors">
                  Terms
                </button>
                <button onClick={() => handleNavigation('/privacy')} className="hover:text-white transition-colors">
                  Privacy
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
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
            </div>
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