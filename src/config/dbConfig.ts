import { config } from "dotenv";
import type { DataSourceOptions } from "typeorm";
import { Alert, EventCode } from "../entity";

// Load the environment variables from the .env file
config();

const isDev = process.env.NODE_ENV === "development";
const baseConfig: DataSourceOptions = {
  type: "mongodb",
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: isDev, // Enable auto schema sync only in the development environment
  logging: isDev, // Enable query logging only in the development environment
  entities: [Alert, EventCode],
};

const databaseConfig = {
  ...baseConfig,
  url: process.env.MONGO_URI,
};

export { databaseConfig };
