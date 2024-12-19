import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { SubscriptionForm } from '../components/SubscriptionForm';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <Hero />
      <Features />
      <section id="subscribe" className="max-w-2xl mx-auto scroll-mt-20">
        <SubscriptionForm />
      </section>
    </div>
  );
};