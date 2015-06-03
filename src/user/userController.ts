import express = require('express');

class UserController {
  static users: express.RequestHandler = function(req: express.Request, res: express.Response) {
    res.json([{ name: "John", age: 30 }]);
  }

  static test: express.RequestHandler = function(req: express.Request, res: express.Response) {
    res.send('Just test!');
  }
}

export = UserController;