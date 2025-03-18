import { Schema, type Document } from 'mongoose';

export interface PropertyDocument extends Document {
  title: string;
  description: string;
  image: string;
  contact: string;
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const propertySchema = new Schema<PropertyDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  image: {
    type: String,
  },
  contact: {
    type:String
  }
  
});


export default propertySchema;
