import express from 'express';
import {
  getAllInvoicePurchaseCtrl,
  getInvoicePurchaseByIdCtrl,
  updatePurchaseStatusCtrl
} from './purchases.controller';

const invoicePurchasesRouter = express.Router();

invoicePurchasesRouter.get('/', getAllInvoicePurchaseCtrl);
invoicePurchasesRouter.get('/:purchaseId', getInvoicePurchaseByIdCtrl);
invoicePurchasesRouter.put('/:purchaseId', updatePurchaseStatusCtrl);

export default invoicePurchasesRouter;
