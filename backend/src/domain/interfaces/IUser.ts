import { Document, Types } from 'mongoose';

export interface IUserModel extends Document {
  fullName: string
  orderCode: string
  email: string
  mobile?: string
  address?: string
  orders: Types.ObjectId[]
  categories: Types.ObjectId[]
  products: Types.ObjectId[]
  carts: Types.ObjectId[]
}
