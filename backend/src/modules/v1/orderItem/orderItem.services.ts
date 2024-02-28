import { OrderItem } from './orderItem.model';
import {Schema} from 'mongoose';

export const createOrderItemServices = async (
  quantity: number,
  price: number,
  orderId: string,
  product: Schema.Types.ObjectId,
  orderCreated: any,
  session: any
): Promise<void> => {
  const orderItemCreated: any = await OrderItem.create([{
    quantity,
    price,
    orderId,
    product,
    order: orderCreated.id,
  }], { session });
  orderCreated.orderItems.push(orderItemCreated[0]._id);
  await orderCreated.save({ session });
};