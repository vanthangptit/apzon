import {NextFunction, Request, Response} from 'express';
import {appError} from '../../../utils';
import {Order} from '../order/order.model';

/**
 * @Get All Invoice
 */
export const getAllCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await Order.find({})
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

/**
 * @Update Status
 */
export const updateOrderStatusCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;
  const orderId = req.params.orderId;
  try {
    const order = await Order.findOne({ orderId });
    if (!order) {
      return next(appError('Order is invalid.', 400));
    }
    if (status !== 'success' && status !== 'cancel') {
      return next(appError('Status is invalid.', 400));
    }

    const orderUpdated = await Order.findOneAndUpdate({
      orderId
    }, {
      status
    }, {
      new: true
    });

    return res.json({
      status: 200,
      message: 'Invoices updated',
      data: orderUpdated,
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};

