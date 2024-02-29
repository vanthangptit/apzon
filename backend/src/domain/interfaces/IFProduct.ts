import { Document, Types } from 'mongoose';

export interface IFProductModel extends Document {
  name: string
  slug?: string
  price: number
  quantity: number,
  brand: string,
  description?: string,
  published?: boolean,
  productCode: string,
  productImage?: string
  owner: Types.ObjectId
  category: Types.ObjectId
  carts: Types.ObjectId[]
}
