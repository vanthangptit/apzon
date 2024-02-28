import express from 'express';
import {getByIdCtrl} from './invoice.controller';

const invoiceRouter = express.Router();

invoiceRouter.get('/:orderId', getByIdCtrl);

export default invoiceRouter;
