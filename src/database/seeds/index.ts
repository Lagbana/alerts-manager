import { DataSource } from "typeorm";
import { EventCode } from "../../entity/EventCode";
import EventCodes from "./eventCodes";
import { Logger } from "../../util/logger";

export const seedDatabase = async (opts: {
  logger: Logger;
  dataSource: DataSource;
}) => {
  const { logger, dataSource } = opts;

  logger.debug("Seeding database...");

  const eventCodeRepository = dataSource.getRepository(EventCode);

  const collectionExists = (await eventCodeRepository.count()) > 0;

  if (collectionExists) {
    logger.warn("Database already seeded");
    return;
  }

  await eventCodeRepository.save(EventCodes);

  logger.debug("Database seeded");
};
