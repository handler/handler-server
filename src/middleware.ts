import { Handler, NextFunction, Request, Response } from 'express';
import { FunctionApplication, HTTPApplication } from 'handler.js';

export function middlewareFromFunctionApplication(app: FunctionApplication): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await app.run({
        body: req.body,
        path: req.path,
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}

export function middlewareFromHTTPApplication(app: HTTPApplication): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ctx = await app.run({
        body: req.body,
        headers: req.headers,
        method: req.method,
        path: req.path,
        query: req.query,
      });
      for (const field of Object.keys(ctx.res.headers)) {
        res.header(field, ctx.res.headers[field] as any);
      }
      if (ctx.res.status) {
        res.status(ctx.res.status);
      }
      if (ctx.res.type) {
        res.type(ctx.res.type);
      }
      if (ctx.res.body) {
        res.send(ctx.res.body);
      } else if (ctx.res.status) {
        res.sendStatus(ctx.res.status);
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  };
}
