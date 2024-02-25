const logger = require("./logger");
const config = require("config");

async function connect() {
  const dbUri = config.get("dbUri");

  try {
    // await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

module.exports = connect;
