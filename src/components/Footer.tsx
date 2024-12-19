import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';
import { APP_CONFIG } from '../constants/app';

export const Footer: React.FC = () => {
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
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
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