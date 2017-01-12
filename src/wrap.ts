import { FunctionHandler, FunctionRouter, HTTPHandler, HTTPRouter } from 'handlr';

import { middlewareFromFunctionRouter, middlewareFromHTTPRouter } from './middleware';
import { Server } from './Server';

export function fromFunctionHandler(handler: FunctionHandler): Server {
  const router = new FunctionRouter();
  router.all('*', handler);
  return fromFunctionRouter(router);
}

export function fromFunctionRouter(router: FunctionRouter): Server {
  const middleware = middlewareFromFunctionRouter(router);
  return new Server(middleware);
}

export function fromHTTPHandler(handler: HTTPHandler): Server {
  const router = new HTTPRouter();
  router.all('*', handler);
  return fromHTTPRouter(router);
}

export function fromHTTPRouter(router: HTTPRouter): Server {
  const middleware = middlewareFromHTTPRouter(router);
  return new Server(middleware);
}
