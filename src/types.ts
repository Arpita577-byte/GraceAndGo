export type ProductCategory = 'hair' | 'spa' | 'nails' | 'skincare';

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: ProductCategory;
  description: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rating: number;
  specialties: string[];
  portfolioUrls: string[];
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  serviceId: string;
  stylistId: string;
  notes?: string;
  status: 'pending' | 'confirmed';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatarLetter: string;
}

export interface SalonRoom {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  image: string;
  features: string[];
}
