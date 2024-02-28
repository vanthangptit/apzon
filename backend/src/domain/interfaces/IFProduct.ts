import { Document, Types } from 'mongoose';

export type CurrencyUnit = 'vnd' | 'usd' | 'eur';

export interface IFProductModel extends Document {
  name: string
  slug?: string
  price: number
  currencyUnit?: CurrencyUnit
  quantity: number,
  brand: string,
  description?: string,
  published?: boolean,
  owner: Types.ObjectId
  category: Types.ObjectId
  image?: string
  carts: Types.ObjectId[]
}
