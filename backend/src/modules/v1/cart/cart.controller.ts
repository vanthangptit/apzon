import { startSession } from 'mongoose';
import {NextFunction, Request, Response} from 'express';
import {appError} from '../../../utils';
import {User} from '../user/user.model';
import {Product} from '../product/product.model';
import {Cart} from './cart.model';

/**
 * @GetALlCart
 */
export const getAllCartCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await Cart.find({});

    return res.json({
      status: 200,
      message: 'Get successfully',
      data: carts,
    });
  } catch (e: any) {
    return next(appError(e?.message));
  }
};

/**
 * @Create Cart
 */
export const createCartCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const session = await startSession();
  session.startTransaction();

  const { quantity, productId, customerId } = req.body;

  if (Number(quantity) <= 0){
    return next(appError('quantity is invalid', 400));
  }

  try {
    const customerFound = await User.findById(customerId);
    if (!customerFound) {
      return next(appError('User is invalid', 400));
    }
    const productFound = await Product.findById(productId);
    if (!productFound) {
      return next(appError('Product is invalid', 400));
    }
    if (productFound.quantity === 0) {
      return next(appError('The product is currently out of stock', 400));
    }
    if (productFound.quantity < quantity) {
      return next(appError('Purchase quantity exceeds stock quantity.', 400));
    }
    if (customerFound.products.includes(productFound.id)) {
      return next(appError('Can not add to cart. You are owner.', 400));
    }

    const cartCreated: any = await Cart.create([{
      quantity, product: productId, customer: customerFound._id
    }], { session });

    if (cartCreated[0]) {
      customerFound.carts.push(cartCreated[0]._id);
      await customerFound.save({ session });
    }

    await session.commitTransaction();
    await session.endSession();
    return res.json({
      status: 200,
      message: 'Cart created',
    });
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    return next(appError(e.message));
  }
};

/**
 * @Update Cart
 */
export const updateCartCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const { quantity, productId, cartId, userId } = req.body;
  if (Number(quantity) <= 0){
    return next(appError('quantity is invalid', 400));
  }

  try {
    const cartFound: any = await Cart.findById(cartId)
      .populate('product')
      .populate('customer');
    if (!cartFound) {
      return next(appError('Cart is invalid', 400));
    }
    if (cartFound.customer._id.toString() !== userId) {
      return next(appError('Cart is invalid', 400));
    }
    if (cartFound.product._id.toString() !== productId) {
      return next(appError('Cart is invalid', 400));
    }
    if (cartFound.product.quantity === 0) {
      return next(appError('The product is currently out of stock', 400));
    }
    if (cartFound.product.quantity < quantity) {
      return next(appError('Purchase quantity exceeds stock quantity.', 400));
    }

    cartFound.quantity = quantity;
    await cartFound.save();

    return res.json({
      status: 200,
      message: 'Cart updated',
      data: cartFound
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};

/**
 * @Delete Cart
 */
export const deleteCartCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const { cartId } = req.body;

  try {
    const cardFound = await Cart.findById(cartId);
    if (!cardFound)
      return next(appError('Cart is invalid', 400));

    await Cart.findByIdAndDelete(cartId);

    return res.json({
      status: 200,
      message: 'Cart deleted',
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};
