export interface Property {
  _id: string;
  location: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  income?: number; // ✅ Only set if status is "rented"
  status: 'available' | 'rented'; // ✅ Removed "sold"
  photos: string[];
  description?: string;
  notes?: string; // ✅ NEW: Optional notes for internal tracking
  userId: string;
}

export interface PropertyInput {
  location: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  income?: number; // ✅ Optional, only for rented
  status: 'available' | 'rented'; // ✅ Removed "sold"
  photos: string[];
  description?: string;
  notes?: string; // ✅ Optional user notes
}

