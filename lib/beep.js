const Server = require("./server");
const Database = require("./database");

class Beep {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
    this.database = new Database(config, this.logger);
    this.isRunning = false;

    this.server = new Server(config, this.database, this.logger);
  }

  async start() {
    if (this.isRunning) {
      throw new Error("Cannot start Beep because it is already running");
    }
    this.isRunning = true;

    this.logger.verbose("Starting Beep");
    await Promise.all([this.database.connect(), this.server.listen()]);
    this.logger.verbose("Beep ready and awaiting requests");

    return { url: this.config.server.url };
  }
}

module.exports = Beep;
