import bodyParser from 'body-parser';
import cluster from 'cluster';
import compression from 'compression';
import { Pool, types } from 'pg';
import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import cors from 'cors';
import { conf } from './config';
import { api_router } from './api/api';

const app = express();

// use to correct convert to float & bigint from postgresql
types.setTypeParser(1700, 'text', parseFloat);
types.setTypeParser(20, 'text', parseInt);

// option for use HTTPS
const https_options = {
  key: fs.readFileSync("./cert/server.key", 'UTF8'),
  cert: fs.readFileSync("./cert/server.crt", 'UTF8'),
  ca: fs.readFileSync("./cert/ca.crt", 'UTF8'),
  requestCert: true,
  rejectUnauthorized: true
};

let numCPUs = require('os').cpus().length;

// if in config set CPUs number then used it. Else if in config set CPUs number === 0, then used CPUs number of server 
if (conf.coreNum > 0) {
  numCPUs = conf.coreNum;
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker: any, code: any, signal: any) => {
    console.log('worker %d died (%s). restarting...',
      worker.process.pid, signal || code);
    cluster.fork();
  });
}
else {
  app.set('jwt_secret', conf.jwt_params.jwt_secret); // set secret variable
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
  app.use('/api/' + conf.version + '/', api_router);

  app.get('/', function (req: any, res: any) {
    res.send('<h1>Wrong route</h1>');
  });

  app.get('/api', function (req: any, res: any) {
    res.send('<h1>Wrong route</h1>');
  });

  http.createServer(app).listen(conf.api_port);
  https.createServer(https_options, app).listen(conf.api_port_ssl);

  console.log(`Worker ${process.pid} started`);
}