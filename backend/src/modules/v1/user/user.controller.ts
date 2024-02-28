import { appError } from '../../../utils';
import { NextFunction, Request, Response } from 'express';
import { User } from './user.model';

/**
 * @GetALlProduct
 */
export const getAllUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find({});

    return res.json({
      status: 200,
      message: 'Get successfully',
      data: user,
    });
  } catch (e: any) {
    return next(appError(e?.message));
  }
};

/**
 * @Register User
 */
export const userRegisterCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, address, email, mobile } = req.body;
  const isVendor: boolean = req.body.isVendor.toString() === 'true';
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appError('Email already exists', 404));
    }
    let userCode: string;
    const countUser = await User.countDocuments({ isVendor });
    userCode = isVendor ? 'V'+`${countUser + 1}`.padStart(8, '0'): 'C'+`${countUser + 1}`.padStart(8, '0');

    const userCreated = await User.create({
      fullName,
      email,
      address,
      userCode,
      mobile,
      isVendor
    });

    return res.json({
      status: 200,
      message: 'User created successful',
      data: userCreated,
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};
