import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { globalErrHandler, middlewareCors } from './middlewares';
import { connectDB } from './database/database';
import conf from './config';

import userRouter from './modules/v1/user/user.routes';
import categoryRouter from './modules/v1/category/category.routes';
import productRouter from './modules/v1/product/product.routes';
import cartRouter from './modules/v1/cart/cart.routes';

const app: Application = express();
const { port } = conf;
const PORT = port || 9700;

const init = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //Allow access HTTP
  app.use(middlewareCors);

  //middleware for cookies
  app.use(cookieParser());

  // Routes
  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to my website')
  });

  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/categories', categoryRouter);
  app.use('/api/v1/products', productRouter);
  app.use('/api/v1/carts', cartRouter);

  // Error handlers middleware
  app.use(globalErrHandler);

  // 404 error
  app.use('*', (req: Request, res: Response) => {
    return res.status(404).json({
      message: `${req.originalUrl} - Route not found`,
    });
  });

  await connectDB();

  app.listen(PORT, function () {
    console.log('Server listen port at ' + PORT);
  });
};

init();
