import { model, Schema } from 'mongoose';
import {IFPaymentModel} from '../../../domain/interfaces';

const PaymentSchema = new Schema<IFPaymentModel>({
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  provider: {
    type: String,
  },
  status: {
    type: String,
  },
  orders:  [{
    type: Schema.Types.ObjectId,
    ref: 'Orders',
  }],
}, {
  timestamps: true
});

// Compile the Payment model
export const Payment = model<IFPaymentModel>('Payment', PaymentSchema);
