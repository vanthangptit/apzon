import express from 'express';
import { userRegisterCtrl } from './user.controller';

const userRouter = express.Router();

userRouter.post('/register', userRegisterCtrl);

export default userRouter;
