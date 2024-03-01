import { model, Schema } from 'mongoose';
import {IFPurchaseItemModel} from '../../../domain/interfaces';

const PurchaseItemSchema = new Schema<IFPurchaseItemModel>({
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
  purchaseId: {
    type: String,
    required: true,
  },
  product:  {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  purchase:  {
    type: Schema.Types.ObjectId,
    ref: 'Purchase',
    required: true,
  },
}, {
  timestamps: true
});

// Compile the PurchaseItem model
export const PurchaseItem = model<IFPurchaseItemModel>('PurchaseItem', PurchaseItemSchema);
