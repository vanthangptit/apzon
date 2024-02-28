import express from 'express';
import {getAllCartCtrl, createCartCtrl, deleteCartCtrl, updateCartCtrl} from './cart.controller';

const cartRouter = express.Router();

cartRouter.get('/', getAllCartCtrl);
cartRouter.post('/', createCartCtrl);
cartRouter.put('/', updateCartCtrl);
cartRouter.delete('/', deleteCartCtrl);

export default cartRouter;
