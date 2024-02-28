import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import userRouter from './modules/v1/user/user.routes';

import { globalErrHandler, middlewareCors } from './middlewares';
import { connectDB } from './database/database';
import conf from './config';

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
