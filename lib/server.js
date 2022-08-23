const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const Mongoose = require("mongoose");
const { Server: SocketServer } = require("socket.io");

const { routers } = require("../components");
const connection = require("../components/socket/connection");

const authentication = require("../components/authentication/middleware");

class Server {
  constructor(config, database, logger) {
    this.config = config;
    this.database = database;
    this.logger = logger;

    this.logger.verbose("Creating express app and HTTP server instance");
    this.app = express();
    this._httpServer = createServer(this.app);
    this.io = new SocketServer(this._httpServer);
    this.logger.verbose("Express app and HTTP server instance created");

    this._setupExpressMiddleware();
    this._setupExpressRoutes();
    this._setupErrorHandler();
    this._setupSocketMiddleware();
  }

  async listen() {
    this.logger.verbose(
      "Attempting to bind HTTP server to %s",
      this.config.server.url
    );

    this._httpServer.listen(process.env.PORT || 3000, (err) => {
      if (err) {
        return Promise.reject(err);
      }

      this.logger.verbose("HTTP server bound");
      return Promise.resolve();
    });
  }

  _setupSocketMiddleware() {
    this.io.use((socket, next) => {
      socket.logger = this.logger;
      socket.model = (...args) => this.database.model(...args);
      next();
    });
  }

  _setupExpressMiddleware() {
    this.app.use(express.json());
    this.app.use(cors({ origin: this.config.cors.whitelist }));
    this.app.request.config = this.config;
    this.app.request.logger = this.logger;
    this.app.request.pingDatabase = (...args) => this.database.ping(...args);
    this.app.request.model = (...args) => this.database.model(...args);
    this.app.request.io = this.io;
  }

  _setupExpressRoutes() {
    this.logger.verbose("Attaching resource routers to express app");

    this.app.use("/auth", routers.authentication);
    this.app.use("/users", authentication, routers.users);
    this.app.use("/turns", routers.turns);
    this.app.use("/", routers.status);

    this.io.on("connection", connection);

    this.logger.verbose("Resource routers attached");
  }

  _setupErrorHandler() {
    this.logger.verbose("Attaching error handler");

    this.app.use((err, req, res, next) => {
      if (!err.statusCode) {
        err.statusCode = Server.statusCodeByErrorName[err.name] || 500;
      }
      const isMongooseValidationError =
        err instanceof Mongoose.Error.ValidationError;
      if (isMongooseValidationError) {
        req.logger.debug("Mongoose validation error", JSON.stringify(err));
        res.status(err.statusCode).json({
          errors: Object.keys(err.errors).map((field) => ({
            field,
            message: err.errors[field].message,
            kind: err.errors[field].kind,
          })),
        });
      } else {
        req.logger.error(err.toString(), err);
        req.logger.verbose("Responding to client", err.toString());
        res.status(err.statusCode).send(err.toString());
      }
    });
    this.logger.verbose("Error handler attached");
  }
}

Server.statusCodeByErrorName = {
  ValidationError: 400,
  CastError: 400,
  UnauthorizedError: 401,
};

module.exports = Server;
