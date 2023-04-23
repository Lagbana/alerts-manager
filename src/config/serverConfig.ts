import { config } from "dotenv";
import { ServerConfig } from "./types";

// Load the environment variables from the .env file
config();

// Define the local and production configurations

const localConfig: ServerConfig = {
  cors: {
    origin: "http://localhost:8080",
  },
  logger: true,
};

const productionConfig: ServerConfig = {
  cors: {
    origin: ["https://squidbench.ca", "https://www.squidbench.ca"],
  },
  logger: false,
};

// Select the appropriate configuration based on the NODE_ENV environment variable
const serverConfig: ServerConfig =
  process.env.NODE_ENV === "production" ? productionConfig : localConfig;

export { serverConfig };
