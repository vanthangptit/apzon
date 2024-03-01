import express from 'express';
import invoiceOrderRouter from './order/invoice.routes';
import invoicePurchasesRouter from './purchase/purchases.routes';

const invoiceRouter = express.Router();

invoiceRouter.use('/orders', invoiceOrderRouter);
invoiceRouter.use('/purchases', invoicePurchasesRouter);

export default invoiceRouter;
