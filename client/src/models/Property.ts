export interface Property {
  _id: string;
  location: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: 'available' | 'rented' | 'sold';
  photos: string[]; // Changed from `photo?: string` to support multiple image URLs
  description?: string;
  userId: string;
}

export interface PropertyInput {
  location: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: 'available' | 'rented' | 'sold';
  photos: string[]; // Same change for input when submitting new property
  description?: string;
}
