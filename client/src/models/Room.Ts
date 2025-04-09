export interface Room {
    _id: string;
    propertyId: string;
    title: string;
    squareFootage: number;
    photos: string[]; // Changed from `photo?: string` to support multiple image URLs
    description?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface RoomInput {
    propertyId: string;
    title: string;
    squareFootage: number;
    photos: string[]; // Same change for input when submitting new property
    description?: string;
  }
  