import { Document, Types } from 'mongoose';

export interface IFOrderModel extends Document {
  price: number
  deliveryFee?: string
  discount?: string
  total?: string
  orderId: string
  orderItems: Types.ObjectId[]
  customer: Types.ObjectId
}
