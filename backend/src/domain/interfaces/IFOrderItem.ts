import { Document, Types } from 'mongoose';

export type CurrencyUnit = 'vnd' | 'usd' | 'eur';

export interface IFOrderItemModel extends Document {
  quantity: number
  price: number
  orderId: string
  currency?: CurrencyUnit
  product: Types.ObjectId
  order: Types.ObjectId
}
