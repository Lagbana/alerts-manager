import { AlertRepository } from "../repository";
import { Alert } from "../entity";
import { Logger } from "../util/logger";
import { AlertSchema } from "../util/validators";
import { omit } from "lodash";

interface AlertServiceOptions {
  alertRepository: AlertRepository;
  logger: Logger;
}

interface AlertWithoutSignature extends Omit<Alert, "signature"> {}

export class AlertService {
  private alertRepository: AlertRepository;
  private logger: Logger;

  constructor(options: AlertServiceOptions) {
    this.logger = new Logger("AlertService", options.logger);
    this.alertRepository = options.alertRepository;

    this.logger.debug("AlertService initialized");
  }

  /**
   * Create a new Alert.
   *
   * @param {Partial<Alert>} alertData - The data for the new Alert.
   * @returns {Promise<Alert>} - The created Alert.
   */
  async create(alertData: Alert): Promise<Alert> {
    AlertSchema.parse(alertData);
    return this.alertRepository.create(alertData);
  }

  /**
   * Find an Alert by ID.
   *
   * @param {string} id - The ID of the Alert to find.
   * @returns {Promise<Alert | undefined>} - The found Alert, or undefined if not found.
   */
  async findOneById(id: string): Promise<AlertWithoutSignature | null> {
    const alert = await this.alertRepository.findOneById(id);
    return omit(alert, "signature");
  }

  /**
   * Find an Alert by any field.
   *
   * @param {Object} quert - The query to find the Alert by.
   * @returns {Promise<Omit<Alert | undefined>} - The found Alert, or undefined if not found.
   */
  async findOne(query: Object): Promise<AlertWithoutSignature | null> {
    const alert = await this.alertRepository.findOne(query);
    return omit(alert, "signature");
  }

  /**
   * Find all Alerts.
   *
   * @returns {Promise<Alert[]>} - An array of all Alerts.
   */
  async findAll(): Promise<AlertWithoutSignature[]> {
    const alerts = await this.alertRepository.findAll();
    return alerts.map((alert: Alert) => omit(alert, "signature"));
  }

  /**
   * Update an Alert by ID.
   *
   * @param {string} id - The ID of the Alert to update.
   * @param {Partial<Alert>} alertData - The updated data for the Alert.
   * @returns {Promise<Alert>} - The updated Alert.
   */
  async update(
    id: string,
    alertData: Partial<AlertWithoutSignature>
  ): Promise<Alert> {
    AlertSchema.parse(alertData);
    return this.alertRepository.update(id, alertData);
  }

  /**
   * Delete an Alert by ID.
   *
   * @param {string} id - The ID of the Alert to delete.
   * @returns {Promise<void>} - A Promise that resolves when the Alert is deleted.
   */
  async delete(id: string): Promise<void> {
    return this.alertRepository.delete(id);
  }
}
