import express from 'express';
import {getByIdCtrl, getAllCtrl, updateOrderStatusCtrl} from './invoice.controller';

const invoiceRouter = express.Router();

invoiceRouter.get('/', getAllCtrl);
invoiceRouter.get('/:orderId', getByIdCtrl);
invoiceRouter.put('/:orderId', updateOrderStatusCtrl);

export default invoiceRouter;
