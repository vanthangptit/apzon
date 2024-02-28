import { model, Schema } from 'mongoose';
import {IFCategoryModel} from '../../../domain/interfaces';

const CategorySchema = new Schema<IFCategoryModel>({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  slug: {
    type: String,
    required: [true, 'slug is required'],
  },
  published: {
    type: Boolean,
    required: false,
    default: true,
  },
  parentId: {
    type: String,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }
  ]
}, {
  timestamps: true
});

// Compile the Category model
export const Category = model<IFCategoryModel>('Category', CategorySchema);
