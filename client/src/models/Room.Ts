export interface Room {
    _id: string;
    propertyId: string;
    title: string;
    squareFootage: number;
    photo?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface RoomInput {
    propertyId: string;
    title: string;
    squareFootage: number;
    photo?: string;
    description?: string;
  }
  