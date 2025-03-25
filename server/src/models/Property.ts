import { Schema, model, type Document } from 'mongoose';

export interface PropertyDocument extends Document {
  location: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: string;
  photo?: string;
  description?: string;
  userId: Schema.Types.ObjectId;
}

const propertySchema = new Schema<PropertyDocument>({
  location: {
    type: String,
    required: true,
  },
  squareFootage: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'sold'],
    default: 'available',
  },
  photo: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Property = model<PropertyDocument>('Property', propertySchema);
export default Property;
