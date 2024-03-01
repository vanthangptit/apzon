import { PurchaseItem } from './purchaseItem.model';
import {Schema} from 'mongoose';
import conf from './../../../config';

const { currency } = conf;

export const createPurchaseItemServices = async (
  quantity: number,
  price: number,
  purchaseId: string,
  product: Schema.Types.ObjectId,
  purchaseCreated: any,
  session: any
): Promise<void> => {
  const purchaseItemCreated: any = await PurchaseItem.create([{
    quantity,
    price,
    purchaseId,
    product,
    currency,
    purchase: purchaseCreated.id,
  }], { session });
  purchaseCreated.purchaseItems.push(purchaseItemCreated[0]._id);
  await purchaseCreated.save({ session });
};