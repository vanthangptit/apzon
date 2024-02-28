import { appError } from '../../../utils';
import { NextFunction, Request, Response } from 'express';
import { User } from './user.model';

/**
 * @Register User
 */
export const userRegisterCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, address, email, mobile } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appError('Email already exists', 404));
    }

    const user = await User.create({
      fullName,
      email,
      address,
      mobile
    });

    return res.json({
      status: 200,
      message: 'User created successful',
      data: user,
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};
