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

    await this.mongoose.connect(this.config.mongo.url, options);
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

  _setupMongooseModels() {
    this.logger.verbose("Registering schemas");
    this.mongoose.model("User", schemas.users);
    this.mongoose.model("Role", schemas.roles);
    this.mongoose.model("Organization", schemas.organizations);
  }
}

module.exports = Database;
