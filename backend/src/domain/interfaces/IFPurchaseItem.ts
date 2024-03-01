import { Document, Types } from 'mongoose';
import {CurrencyUnit} from './index';

export interface IFPurchaseItemModel extends Document {
  quantity: number
  price: number
  purchaseId: string
  currency?: CurrencyUnit
  product: Types.ObjectId
  purchase: Types.ObjectId
}
