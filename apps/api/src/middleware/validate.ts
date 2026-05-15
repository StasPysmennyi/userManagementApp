import { type NextFunction, type Request, type Response } from 'express';
import { type ZodType } from 'zod';

export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res
        .status(400)
        .json({ errors: result.error.flatten(e => e.message).fieldErrors });
      return;
    }

    req.body = result.data;
    next();
  };
