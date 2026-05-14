import { type NextFunction, type Request, type Response } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
};
