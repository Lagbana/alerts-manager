import {
  MongoRepository,
} from "typeorm";
import { Alert } from "../entity";
import { Logger } from "../util/logger";
import { BaseRepository } from "./base";
import { RepositoryOptions } from "../types";

/**
 * AlertRepository class for performing CRUD operations on Alert entities.
 */
export class AlertRepository extends BaseRepository<Alert> {
  protected repository: MongoRepository<Alert>;
  private logger: Logger;

  /**
   * Constructs the AlertRepository.
   */
  constructor(options: RepositoryOptions) {
    super();

    this.repository = options.dataSource.getMongoRepository(Alert);
    this.logger = new Logger("AlertRepository", options.logger);

    this.logger.debug("AlertRepository initialized");
  }

  // Add any custom methods specific to AlertRepository here
}
