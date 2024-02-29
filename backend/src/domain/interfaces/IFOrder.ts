import { Document, Types } from 'mongoose';
export type statusInvoice = 'pending' | 'success' | 'cancel';

export interface IFOrderModel extends Document {
  status: statusInvoice
  price: number
  deliveryFee?: string
  discount?: string
  total?: string
  orderId: string
  orderItems: Types.ObjectId[]
  customer: Types.ObjectId
}
