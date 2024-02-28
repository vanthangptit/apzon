import express from 'express';
import { userRegisterCtrl, getAllUserCtrl } from './user.controller';

const userRouter = express.Router();

userRouter.get('/', getAllUserCtrl);
userRouter.post('/register', userRegisterCtrl);

export default userRouter;
