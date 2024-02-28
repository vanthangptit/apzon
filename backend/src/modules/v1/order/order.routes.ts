import express from 'express';
import {
  getAllOrderCtrl,
  createOrderCtrl
} from './order.controller';

const orderRouter = express.Router();

orderRouter.get('/', getAllOrderCtrl);
orderRouter.post('/', createOrderCtrl);

export default orderRouter;
