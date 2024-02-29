import express from 'express';
import {
  createOrderCtrl
} from './order.controller';

const orderRouter = express.Router();

orderRouter.post('/', createOrderCtrl);

export default orderRouter;
