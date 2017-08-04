import { FunctionApplication, FunctionHandler, HTTPApplication, HTTPHandler } from 'handler.js';

import { middlewareFromFunctionApplication, middlewareFromHTTPApplication } from './middleware';
import { Server } from './server';

export function fromFunctionApplication(app: FunctionApplication): Server {
  const middleware = middlewareFromFunctionApplication(app);
  return new Server(middleware);
}

export function fromFunctionHandler(handler: FunctionHandler): Server {
  const app = new FunctionApplication();
  app.all('*', handler);
  return fromFunctionApplication(app);
}

export function fromHTTPApplication(app: HTTPApplication): Server {
  const middleware = middlewareFromHTTPApplication(app);
  return new Server(middleware);
}

export function fromHTTPHandler(handler: HTTPHandler): Server {
  const app = new HTTPApplication();
  app.all('*', handler);
  return fromHTTPApplication(app);
}
