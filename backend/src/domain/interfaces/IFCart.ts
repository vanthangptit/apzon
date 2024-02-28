import { Document, Types } from 'mongoose';

export interface IFCartModel extends Document {
  quantity: number
  customer: Types.ObjectId
  product: Types.ObjectId
}
