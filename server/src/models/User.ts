import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  savedProperties: Schema.Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
  propertiesCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedProperties: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to validate password
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Virtual for property count
userSchema.virtual('propertiesCount').get(function () {
  return this.savedProperties.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;

