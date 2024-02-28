import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

function config() {
  const {
    APP_PORT: port,
    MONGO_DB: dbName,
    MONGO_USERNAME_DB: dbUsername,
    MONGO_PASSWORD_DB: dbPassword
  } = process.env;

  const conf = JSON.parse(
    fs.readFileSync(`${__dirname}/../../jsonFiles/${process.env.NODE_ENV ?? 'development'}.json`).toString()
  );

  return {
    ...conf,
    port,
    dbName,
    dbUsername,
    dbPassword
  };
}

export default config();
