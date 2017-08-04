import * as http from 'http';

import * as bodyParser from 'body-parser';
import * as express from 'express';

const _app = new WeakMap<Server, express.Application>();
const _server = new WeakMap<Server, http.Server>();

export class Server {
  constructor(handler: express.Handler) {
    const app = express();
    app.use(bodyParser.json());
    app.use(handler);
    _app.set(this, app);
  }

  get app(): express.Application {
    return _app.get(this);
  }

  get server(): http.Server {
    return _server.get(this);
  }

  async listen(port: number): Promise<void> {
    const server = this.app.listen(port);
    _server.set(this, server);
  }
}
