import * as express from 'express';

import { FunctionContext, FunctionHandler, FunctionResponse, FunctionRouter,
         HTTPContext, HTTPHandler, HTTPResponse, HTTPRouter } from 'handlr';

function _sendHTTPResponse(res: express.Response, handlerRes: HTTPResponse) {
  res
    .contentType(handlerRes.contentType)
    .status(handlerRes.statusCode)
    .send(handlerRes.body);
}

export function middlewareFromFunctionRouter(router: FunctionRouter): express.Handler {
  return async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const ctx = new FunctionContext({
        body: req.body,
      });
      for (const middleware of router.middlewares) {
        const handlerRes = await (middleware as FunctionHandler)(ctx);
        res.json(handlerRes);
      }
      const match = router.matchRoute(req.path);
      if (!match) {
        return next();
      }
      const handlerRes = await match.handler(ctx);
      res.json(handlerRes);
    } catch (err) {
      next(err);
    }
  };
}

export function middlewareFromHTTPRouter(router: HTTPRouter): express.Handler {
  return async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const ctx = new HTTPContext({
        req: {
          body: req.body,
          headers: req.headers,
          method: req.method,
          query: req.query,
        },
      });
      for (const middleware of router.middlewares) {
        const handlerRes = await (middleware as HTTPHandler)(ctx);
        return _sendHTTPResponse(res, handlerRes);
      }
      const match = router.matchRoute(req.method, req.path);
      if (!match) {
        return next();
      }
      ctx.req.params = match.params;
      const handlerRes = await match.handler(ctx);
      return _sendHTTPResponse(res, handlerRes);
    } catch (err) {
      next(err);
    }
  };
}
