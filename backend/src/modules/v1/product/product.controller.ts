import { startSession } from 'mongoose';
import {NextFunction, Request, Response} from 'express';
import {appError} from '../../../utils';
import {Product} from './product.model';
import {User} from '../user/user.model';
import {Category} from '../category/category.model';

/**
 * @GetALlProduct
 */
export const getAllProductCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});

    return res.json({
      status: 200,
      message: 'Get successfully',
      data: products,
    });
  } catch (e: any) {
    return next(appError(e?.message));
  }
};

/**
 * @Create Product
 */
export const createProductCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const session = await startSession();
  session.startTransaction();

  const { name, price, quantity, brand, description, ownerId, categoryId } = req.body;
  try {
    const owner = await User.findOne({
      _id: ownerId,
      isVendor: true
    });
    if (!owner) return next(appError('user is invalid.', 400));
    const category = await Category.findById(categoryId);
    if (!category) return next(appError('category is invalid.', 400));

    const product: any = await Product.create([{
      name,
      price,
      quantity,
      brand,
      description,
      owner: owner._id,
      category: category._id
    }], { session });
    owner.products.push(product[0]._id);
    await owner.save({ session });

    await session.commitTransaction();
    await session.endSession();
    return res.json({
      status: 200,
      message: 'Product created successful',
      data: product[0],
    });
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    return next(appError(e?.message));
  }
};
