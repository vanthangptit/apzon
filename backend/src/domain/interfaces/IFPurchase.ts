import { Document, Types } from 'mongoose';
import {statusInvoice} from './index';

export interface IFPurchaseModel extends Document {
  status: statusInvoice
  price: number
  deliveryFee?: string
  discount?: string
  total?: string
  purchaseId: string
  purchaseItems: Types.ObjectId[]
  supplier: Types.ObjectId
}
