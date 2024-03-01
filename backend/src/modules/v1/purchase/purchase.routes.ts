import express from 'express';
import {
  createPurchaseCtrl
} from './purchase.controller';

const purchaseRouter = express.Router();

purchaseRouter.post('/', createPurchaseCtrl);

export default purchaseRouter;
