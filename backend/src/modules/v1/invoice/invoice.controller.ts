import {NextFunction, Request, Response} from 'express';
import {appError} from '../../../utils';
import {Order} from '../order/order.model';

/**
 * @Get Invoice
 */
export const getByIdCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await Order.findById(req.params.orderId)
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          model: 'Product'
        }
      })
      .populate({
        path: 'customer'
      });

    return res.json({
      status: 200,
      message: 'Get successfully',
      data: invoice,
    });
  } catch (e: any) {
    return next(appError(e?.message));
  }
};

