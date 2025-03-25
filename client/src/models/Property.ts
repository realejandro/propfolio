export interface Property {
    _id: string;
    squareFootage: number;
    bedrooms: number;
    bathrooms: number;
    price: number;
    status: 'available' | 'rented' | 'sold';
    photo?: string;
    description?: string;
    userId: string;
  }
  
  export interface PropertyInput {
    squareFootage: number;
    bedrooms: number;
    bathrooms: number;
    price: number;
    status: 'available' | 'rented' | 'sold';
    photo?: string;
    description?: string;
  }
  