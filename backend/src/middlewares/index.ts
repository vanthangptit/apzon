import { NextFunction, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';

import conf from '../config';

const { accessDomain } = conf;

export const globalErrHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const stack = err.stack;
  let message = err.message;
  const status = err.status ? err.status : 'failed';
  const statusCode = err.statusCode ? err.statusCode : 500;

  if (statusCode === 500) {
    message = 'Internal Server Error';
  }

  return res.status(statusCode).json({
    stack,
    message,
    status,
    statusCode
  });
};

/**
 * Rate limit middleware
 */
export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'You have exceeded your 5 requests per minute limit.',
  headers: true,
});

/**
 * @middleware CORS
 */
export const middlewareCors = process.env.NODE_ENV ==='' ? cors() : cors({
  origin: function (origin, callback) {
    if (accessDomain.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Accept'],
  credentials: true,
  exposedHeaders: ['*', 'Authorization' ]
});
