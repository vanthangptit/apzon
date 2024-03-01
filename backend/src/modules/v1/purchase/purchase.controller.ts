import {NextFunction, Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';
import { startSession } from 'mongoose';
import {Purchase} from './purchase.model';
import {appError} from '../../../utils';
import {User} from '../user/user.model';
import {Cart} from '../cart/cart.model';
import {createPurchaseItemServices} from '../purchaseItem/purchaseItem.services';

/**
 * @Create Purchase
 */
export const createPurchaseCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const session = await startSession();
  session.startTransaction();

  let purchase_id;
  let totalPrice;
  let deliveryFee = 0;
  let discount = 0;
  let price;
  const { supplierId } = req.body;

  try {
    const supplierIdFound: any = await User.findById(supplierId)
      .populate({
        path: 'carts',
        populate: {
          path: 'product',
          model: 'Product'
        }
      });
    if (!supplierIdFound) {
      return next(appError('User is invalid', 400));
    }
    if (supplierIdFound.carts.length === 0) {
      return next(appError('Your cart is empty.', 400));
    }

    // get price from user
    let prices = supplierIdFound.carts.map((cart: any) => cart.product.price * cart.quantity);
    price = prices.reduce(
      (previousValue: number, currentValue: number) => previousValue + currentValue
    );

    totalPrice = price + Number(deliveryFee);
    totalPrice = totalPrice - price * (Number(discount) / 100);

    const countPurchase = await Purchase.countDocuments({});
    purchase_id = 'PCOM' + `${countPurchase + 1}`.padStart(8, '0');

    // store to order
    const purchaseItemId = uuidv4();
    const purchaseCreated: any = await Purchase.create([{
      price,
      deliveryFee,
      discount,
      total: `${totalPrice}`,
      supplier: supplierIdFound._id,
      purchaseItemId: `${purchaseItemId}`,
      purchaseId: `${purchase_id}`,
    }], { session });

    // store to orderItem
    for (const cart of supplierIdFound.carts) {
      await createPurchaseItemServices(
        cart.quantity,
        cart.product.price,
        purchaseItemId,
        cart.product._id,
        purchaseCreated[0],
        session
      );
    }
    supplierIdFound.carts = [];
    await supplierIdFound.save({ session });
    await Cart.deleteMany({ customer: supplierId }).session(session);

    await session.commitTransaction();
    await session.endSession();
    return res.json({
      status: 200,
      message: 'Purchase created',
    });
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    return next(appError(e?.message));
  }
};
