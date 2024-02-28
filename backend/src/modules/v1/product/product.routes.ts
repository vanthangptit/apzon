import express from 'express';
import {createProductCtrl, getAllProductCtrl} from './product.controller';

const productRouter = express.Router();

productRouter.get('/', getAllProductCtrl);
productRouter.post('/', createProductCtrl);

export default productRouter;
