import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validationReq = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log('data is checking ! savdhan husiar', name);

    // validaing data

    try {
      await schema.parseAsync({
        body: req.body,
      });

      return next();
    } catch (err) {
      next(err);
    }
  };
};

export default validationReq;
