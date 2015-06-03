/// <reference path="./types/node.d.ts" />
/// <reference path="./types/express.d.ts" />
/// <reference path="./types/morgan.d.ts" />
/// <reference path="./types/body-parser.d.ts" />

import express = require('express');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import cluster = require('cluster');
import os = require('os');

import UserController = require('./src/user/userController');

class Server {

  constructor(private port: number = 3000, private app = express()) {}

  configure() {
    this.app.use(bodyParser.json());
    this.app.use(morgan('combined'));

    this.app.get('/', UserController.test);
    this.app.get('/users', UserController.users);
  }

  listen() {
    this.app.listen(this.port);
  }

  listenCluster() {
    var cpus = os.cpus().length;

    if(cluster.isMaster) {
      for(var i = 0; i < cpus; i++) {
        cluster.fork();
      }
    } else {
      this.app.listen(this.port);
    }
  }
}

var server = new Server();
server.configure();
server.listen();

