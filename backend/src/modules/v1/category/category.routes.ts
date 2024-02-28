import express from 'express';
import {createCategoryCtrl} from './category.controller';

const categoryRouter = express.Router();

categoryRouter.post('/', createCategoryCtrl);

export default categoryRouter;
