import { Document, Types } from 'mongoose';
import { CurrencyUnit } from './index';

export interface IFOrderItemModel extends Document {
  quantity: number
  price: number
  orderId: string
  currency?: CurrencyUnit
  product: Types.ObjectId
  order: Types.ObjectId
}
