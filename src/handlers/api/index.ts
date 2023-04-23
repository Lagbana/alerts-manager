import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { DataSource } from "typeorm";
import { AlertHandler } from "./alerts";
import { Logger } from "../../util/logger";
import { AlertRepository } from "../../repository";
import { AlertService } from "../../services/alerts";
import { seedDatabase } from "../../database";
import { initializeFastifySwagger } from "./docs";

interface RouteConfgOptions {
  logger: Logger;
  dataSource: DataSource;
  fastify: FastifyInstance;
}

const serviceCache = new Map();

const Home = async (req: FastifyRequest, res: FastifyReply) =>
  res.send({
    message: "Welcome to the Alert API ✨",
  });

export const alertApplicationService = (
  opts: Omit<RouteConfgOptions, "fastify">
): AlertService => {
  const { logger, dataSource } = opts;

  if (!serviceCache.has("alertService")) {
    const alertRepository = new AlertRepository({ logger, dataSource });
    const alertService = new AlertService({ logger, alertRepository });

    logger.debug("AlertApplicationService initialized");
    serviceCache.set("alertService", alertService);
  }

  return serviceCache.get("alertService");
};

export const initializeFastifyHandlers = async (opts: RouteConfgOptions) => {
  const { logger, fastify, dataSource } = opts;
  const version = process.env.API_VERSION || "1.0.0";

  logger.debug(`API Version: ${version}`);

  await dataSource.initialize();
  await seedDatabase({ logger, dataSource });
  await initializeFastifySwagger(fastify);

  // Register index route handler.
  fastify.get("/", Home);

  const alertService = alertApplicationService({ logger, dataSource });

  const handlers = [
    new AlertHandler({
      version,
      logger,
      alertService,
      fastify,
      dataSource,
    }),
  ];

  handlers.forEach((handler) => handler.initializeRoutes());
};
