const Server = require("./server");
const Database = require("./database");

class Bar {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
    this.database = new Database(config, this.logger);
    this.isRunning = false;

    this.server = new Server(config, this.database, this.logger);
  }

  async start() {
    if (this.isRunning) {
      throw new Error("Cannot start Bar because it is already running");
    }
    this.isRunning = true;

    this.logger.verbose("Starting Bar");
    await Promise.all([this.database.connect(), this.server.listen()]);
    this.logger.verbose("Bar ready and awaiting requests");

    return { url: this.config.server.url };
  }
}

module.exports = Bar;
