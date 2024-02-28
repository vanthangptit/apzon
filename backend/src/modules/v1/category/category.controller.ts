import {NextFunction, Request, Response} from 'express';
import {Category} from './category.model';
import {appError} from '../../../utils';

/**
 * @Create category
 */
export const createCategoryCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const { name, ownerId, slug } = req.body;
  try {
    const category = await Category.create({
      name,
      owner: ownerId,
      slug
    });

    return res.json({
      status: 200,
      message: 'Category created successful',
      data: category,
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};