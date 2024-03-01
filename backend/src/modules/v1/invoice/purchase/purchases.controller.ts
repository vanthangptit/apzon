import {NextFunction, Request, Response} from 'express';
import {appError} from '../../../../utils';
import {Purchase} from '../../purchase/purchase.model';

/**
 * @Get All Invoice
 */
export const getAllInvoicePurchaseCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await Purchase.find({})
      .populate({
        path: 'purchaseItems',
        populate: {
          path: 'product',
          model: 'Product'
        }
      })
      .populate({
        path: 'supplier'
      })
      .sort({ createdAt: -1 });

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
export const getInvoicePurchaseByIdCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await Purchase.findById(req.params.purchaseId)
      .populate({
        path: 'purchaseItems',
        populate: {
          path: 'product',
          model: 'Product'
        }
      })
      .populate({
        path: 'supplier'
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
export const updatePurchaseStatusCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;
  const purchaseId = req.params.purchaseId;

  if (status !== 'success' && status !== 'cancel')
    return next(appError('Status is invalid.', 400));

  try {
    const purchase = await Purchase.findOne({ purchaseId });
    if (!purchase)
      return next(appError('Purchase is invalid.', 400));
    if (purchase.status !== 'pending')
      return next(appError('Can not the update. Status is not pending.', 400));

    const purchaseUpdated = await Purchase.findOneAndUpdate({
      purchaseId
    }, {
      status
    }, {
      new: true
    });

    return res.json({
      status: 200,
      message: 'Invoices updated',
      data: purchaseUpdated,
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};

