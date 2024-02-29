import { model, Schema } from 'mongoose';
import {IFOrderItemModel} from '../../../domain/interfaces';

const OrderItemSchema = new Schema<IFOrderItemModel>({
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  currency: {
    type: String,
    enum: ['vnd', 'usd', 'eur']
  },
  orderId: {
    type: String,
    required: true,
  },
  product:  {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  order:  {
    type: Schema.Types.ObjectId,
    ref: 'Orders',
    required: true,
  },
}, {
  timestamps: true
});

// Compile the OrderItem model
export const OrderItem = model<IFOrderItemModel>('OrderItem', OrderItemSchema);
