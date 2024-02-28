import { Document, Types } from 'mongoose';

export interface IFPaymentModel extends Document {
  orderId: string
  amount: number
  provider?: string
  status?: string
  orders: Types.ObjectId[]
}
