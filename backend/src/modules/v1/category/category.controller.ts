import {NextFunction, Request, Response} from 'express';
import {Category} from './category.model';
import {appError} from '../../../utils';
import {User} from '../user/user.model';
import {startSession} from "mongoose";

/**
 * @Create category
 */
export const createCategoryCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const session = await startSession();
  session.startTransaction();

  const { name, ownerId, slug } = req.body;
  try {
    const owner = await User.findOne({
      _id: ownerId,
      isVendor: true
    });
    if (!owner) return next(appError('User is invalid.', 400));

    const category = await Category.create({
      name,
      owner: ownerId,
      slug
    });
    owner.categories.push(category._id);
    await owner.save({ session });

    await session.commitTransaction();
    await session.endSession();
    return res.json({
      status: 200,
      message: 'Category created successful',
      data: category,
    });
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    return next(appError(e.message));
  }
};