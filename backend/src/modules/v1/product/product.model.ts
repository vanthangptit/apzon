import { model, Schema } from 'mongoose';
import { IFProductModel } from '../../../domain/interfaces';

const ProductSchema = new Schema<IFProductModel>({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  slug: {
    type: String,
    required: false,
  },

  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  quantity: {
    type: Number,
    required: false,
  },

  brand: {
    type: String,
    required: [true, 'brand is required'],
  },
  description: {
    type: String,
    required: false,
  },
  published: {
    type: Boolean,
    required: false,
    default: true
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false,
  },

  productImage: {
    type: String,
    required: false,
  },
  productCode: {
    type: String,
    required: true,
    unique: true
  },

  carts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    }
  ],
}, {
  timestamps: true
});

// Compile the Product model
export const Product = model<IFProductModel>('Product', ProductSchema);
