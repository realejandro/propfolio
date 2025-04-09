import { Schema, model, type Document } from 'mongoose';

export interface PropertyDocument extends Document {
  location: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  income?: number; // ✅ optional, used when rented
  status: 'available' | 'rented'; // ✅ removed 'sold'
  photos?: string[];
  description?: string;
  notes?: string; // ✅ new
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
  income: {
    type: Number,
    required: false, // ✅ Only applicable for "rented"
  },
  status: {
    type: String,
    enum: ['available', 'rented'], // ✅ removed 'sold'
    default: 'available',
  },
  photos: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
  },
  notes: {
    type: String, // ✅ new field for user notes
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Property = model<PropertyDocument>('Property', propertySchema);
export default Property;

