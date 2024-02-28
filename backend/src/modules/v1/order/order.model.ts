import { model, Schema } from 'mongoose';
import {IFOrderModel} from '../../../domain/interfaces';

const OrderSchema = new Schema<IFOrderModel>({
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  deliveryFee: {
    type: String,
    required: false,
  },
  discount: {
    type: String,
    required: false,
  },
  total: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: [true, 'OrderItem is required'],
    }
  ],
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  }
}, {
  timestamps: true
});

// Compile the Order model
export const Order = model<IFOrderModel>('Order', OrderSchema);
