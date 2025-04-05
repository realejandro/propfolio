import mongoose, { Schema, model, Document } from 'mongoose';

export interface IRoom extends Document {
  propertyId: mongoose.Types.ObjectId;
  title: string;
  squareFootage: number;
  photo?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    squareFootage: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Room = model<IRoom>('Room', roomSchema);

export default Room;
