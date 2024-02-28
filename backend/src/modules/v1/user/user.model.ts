import { model, Schema } from 'mongoose';
import { IUserModel } from '../../../domain/interfaces';

const UserSchema = new Schema<IUserModel>({
  fullName: {
    type: String,
    required: [true, 'name is required'],
  },
  userCode: {
    type: String,
    required: true,
    unique: true,
  },
  isVendor: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  mobile: {
    type: String,
    required: false,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sale',
    }
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    }
  ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }
  ],
  carts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    }
  ]
}, {
  timestamps: true
});

// Compile the user model
export const User = model<IUserModel>('User', UserSchema);
