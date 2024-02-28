import { Document, Types } from 'mongoose';

export interface IFOrderItemModel extends Document {
  quantity: number
  price: number
  orderId: string
  product: Types.ObjectId
  order: Types.ObjectId
}
