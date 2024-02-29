import {NextFunction, Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';
import { startSession } from 'mongoose';
import {Order} from './order.model';
import {appError} from '../../../utils';
import {User} from '../user/user.model';
import {Cart} from '../cart/cart.model';
import {createOrderItemServices} from '../orderItem/orderItem.services';

/**
 * @Create Order
 */
export const createOrderCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const session = await startSession();
  session.startTransaction();

  let order_id;
  let totalPrice;
  let deliveryFee = 0;
  let discount = 0;
  let price;
  const { customerId } = req.body;

  try {
    const customerFound: any = await User.findById(customerId)
      .populate({
        path: 'carts',
        populate: {
          path: 'product',
          model: 'Product'
        }
      });
    if (!customerFound) {
      return next(appError('User is invalid', 400));
    }
    if (customerFound.carts.length === 0) {
      return next(appError('Your cart is empty.', 400));
    }

    // get price from user
    let prices = customerFound.carts.map((cart: any) => cart.product.price * cart.quantity);
    price = prices.reduce(
      (previousValue: number, currentValue: number) => previousValue + currentValue
    );

    totalPrice = price + Number(deliveryFee);
    totalPrice = totalPrice - price * (Number(discount) / 100);

    const countOrder = await Order.countDocuments({});
    order_id = 'ECOM' + `${countOrder + 1}`.padStart(8, '0');

    // store to order
    const orderItemId = uuidv4();
    const orderCreated: any = await Order.create([{
      price,
      deliveryFee,
      discount,
      total: `${totalPrice}`,
      customer: customerFound._id,
      orderItemId: `${orderItemId}`,
      orderId: `${order_id}`,
    }], { session });

    // store to orderItem
    for (const cart of customerFound.carts) {
      await createOrderItemServices(
        cart.quantity,
        cart.product.price,
        orderItemId,
        cart.product._id,
        orderCreated[0],
        session
      );
    }
    customerFound.carts = [];
    await customerFound.save({ session });
    await Cart.deleteMany({ customer: customerId }).session(session);

    await session.commitTransaction();
    await session.endSession();
    return res.json({
      status: 200,
      message: 'Order created',
    });
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    return next(appError(e?.message));
  }
};
