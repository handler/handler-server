import * as http from 'http';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Router } from 'handlr';

export class Server {
  app: express.Application;
  server: http.Server;

  constructor(protected handler: express.Handler) {
    const app = express();
    app.use(bodyParser.json());
    app.use(handler);
    this.app = app;
  }

  async run(port: number): Promise<void> {
    this.server = this.app.listen(port);
  }
}
