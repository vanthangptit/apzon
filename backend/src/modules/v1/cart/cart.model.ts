import { model, Schema } from 'mongoose';
import {IFCartModel} from '../../../domain/interfaces';

const CartSchema = new Schema<IFCartModel>({
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
  },
  product:  {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: true
  },
  customer:  {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});

// Compile the Cart model
export const Cart = model<IFCartModel>('Cart', CartSchema);
