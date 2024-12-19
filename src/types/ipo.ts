export interface IPO {
  companyName: string;
  price: string;
  issueSize: string;
  gmp: string;
  listingGains: string;
  subscriptionDates: string;
  status: 'upcoming' | 'active' | 'closed';
  recommendation: 'subscribe' | 'avoid' | 'neutral';
}