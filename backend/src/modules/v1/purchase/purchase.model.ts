import { model, Schema } from 'mongoose';
import {IFPurchaseModel} from '../../../domain/interfaces';

const PurchaseSchema = new Schema<IFPurchaseModel>({
  status: {
    type: String,
    enum: ['pending', 'success', 'cancel'],
    default: 'pending'
  },
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
  purchaseId: {
    type: String,
    required: true,
    unique: true
  },
  purchaseItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'PurchaseItem',
      required: [true, 'PurchaseItem is required'],
    }
  ],
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'supplier is required'],
  }
}, {
  timestamps: true
});

// Compile the Purchase model
export const Purchase = model<IFPurchaseModel>('Purchase', PurchaseSchema);
