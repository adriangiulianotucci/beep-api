const { Mongoose } = require("mongoose");
const { schemas } = require("../components");

class Database {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;

    this.logger.verbose("Creating mongoose instance");
    this.mongoose = new Mongoose();
    this.logger.verbose("Mongoose instance created");

    this._setupMongooseModels();
  }

  async connect() {
    this.logger.verbose("Connecting to database");

    const options = {
      maxPoolSize: 25,
    };

    // TODO: MOVE THIS LOGIC TO ANOTHER FILE?
    const mongoUrl = process.env.MONGO_URL || this.config.mongo.url;

    await this.mongoose.connect(mongoUrl, options);
    this.logger.verbose("Connected to database");
  }

  async disconnect() {
    this.logger.verbose("Disconnecting from database");
    await this.mongoose.disconnect();
    this.logger.verbose("Disconnected from database");
  }

  model(...args) {
    return this.mongoose.model(...args);
  }

  async ping() {
    if (!this.mongoose.connection.db) {
      return Promise.reject(new Error("Not connected to database"));
    }
    return this.mongoose.connection.db.admin().ping();
  }

  _setupMongooseModels() {
    this.logger.verbose("Registering schemas");
    this.mongoose.model("User", schemas.users);
    this.mongoose.model("Role", schemas.roles);
    this.mongoose.model("Location", schemas.locations);
    this.mongoose.model("Turn", schemas.turns);
  }
}

module.exports = Database;
