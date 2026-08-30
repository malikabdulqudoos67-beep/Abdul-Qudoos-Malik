export type PropertyType = 'house' | 'villa' | 'apartment' | 'penthouse' | 'mansion';
export type ListingStatus = 'for_sale' | 'for_rent' | 'pending' | 'sold';
export type ViewingType = 'in_person' | 'video_call' | 'vip_chauffeur';
export type AppointmentStatus = 'pending' | 'confirmed' | 'rescheduled' | 'cancelled' | 'completed';
export type CurrencyCode = 'USD' | 'AED' | 'EUR' | 'GBP';

export interface PropertyAgent {
  name: string;
  title: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  dealsClosed: number;
}

export interface Property {
  id: string;
  title: string;
  subtitle?: string;
  type: PropertyType;
  price: number;
  listingType: 'sale' | 'rent';
  status: ListingStatus;
  location: string;
  neighborhood: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  garageSpaces?: number;
  yearBuilt?: number;
  imageUrl: string;
  gallery: string[];
  description: string;
  headline?: string;
  keyHighlights?: string[];
  amenities: string[];
  isFeatured: boolean;
  isHeroHighlight?: boolean;
  featuredOrder?: number;
  agent: PropertyAgent;
  virtualTourUrl?: string;
  coordinates?: { lat: number; lng: number };
  createdAt: string;
  views?: number;
  rating?: number;
  tags?: string[];
}

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  propertyPrice: number;
  propertyListingType: 'sale' | 'rent';
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM"
  viewingType: ViewingType;
  guests: number;
  notes?: string;
  status: AppointmentStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'agent' | 'client';
  phone?: string;
  photoURL?: string;
  favorites: string[];
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface SiteContentConfig {
  heroHeadline: string;
  heroSubheadline: string;
  heroQuote: string;
  heroQuoteAuthor: string;
  highlightedPropertyId: string;
  trustedBuyersCount: string;
  clientReviewsCount: string;
  ratingScore: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
  announcementBanner?: {
    enabled: boolean;
    text: string;
    linkText?: string;
  };
}

export interface AIImageGenRequest {
  prompt: string;
  resolution: '1K' | '2K' | '4K';
  aspectRatio: '1:1' | '16:9' | '4:3' | '9:16';
  style: string;
}

export interface FilterState {
  searchQuery: string;
  propertyType: 'all' | PropertyType;
  listingType: 'all' | 'sale' | 'rent';
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'all';
  bathrooms: number | 'all';
  amenities: string[];
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'newest' | 'sqft_desc';
}
