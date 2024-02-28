import { Document, Types } from 'mongoose';

export interface IUserModel extends Document {
  fullName: string
  userCode: string
  isVendor: boolean
  email: string
  mobile?: string
  address?: string
  orders: Types.ObjectId[]
  categories: Types.ObjectId[]
  products: Types.ObjectId[]
  carts: Types.ObjectId[]
}
