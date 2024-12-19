import React from 'react';
import { APP_CONFIG } from '../constants/app';
import { TrendingUp, Users, Shield, Target, Award, Clock } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'IPOs Analyzed', value: '500+' },
    { label: 'Success Rate', value: '85%' },
    { label: 'Daily Updates', value: '24/7' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Accuracy',
      description: 'We prioritize providing accurate and reliable IPO data and analysis.',
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Building and maintaining trust through transparency and reliability.',
    },
    {
      icon: Clock,
      title: 'Timeliness',
      description: 'Delivering real-time updates and timely recommendations.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-700">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About {APP_CONFIG.NAME}</h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Empowering investors with data-driven IPO insights and recommendations since 2023.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Mission</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Democratizing IPO Investments
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We believe every investor deserves access to professional-grade IPO analysis and insights. Our mission is to level the playing field by providing accurate, timely, and actionable IPO information to all investors.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-blue-600">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Values</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What We Stand For
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="absolute top-6 left-6">
                <value.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-12">
                <h3 className="text-xl font-medium text-gray-900">{value.title}</h3>
                <p className="mt-2 text-base text-gray-500">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Powered by Experts
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our team consists of experienced financial analysts, market experts, and technology professionals who are passionate about helping investors succeed in the IPO market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};