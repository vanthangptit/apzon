import express from 'express';
import {getByIdCtrl, getAllCtrl, updateOrderStatusCtrl} from './invoice.controller';

const invoiceOrderRouter = express.Router();

invoiceOrderRouter.get('/', getAllCtrl);
invoiceOrderRouter.get('/:orderId', getByIdCtrl);
invoiceOrderRouter.put('/:orderId', updateOrderStatusCtrl);

export default invoiceOrderRouter;
