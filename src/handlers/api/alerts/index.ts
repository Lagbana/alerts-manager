import { DataSource } from "typeorm";
import { Logger } from "../../../util";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Alert } from "../../../entity";
import { AlertService } from "../../../services/alerts";
import { VERSIONS, getVersion } from "../../../util";
import { AlertsWorker } from "../../queue";
import {
  createAlertSchema,
  deleteAlertSchema,
  getAlertSchema,
  getAllAlertsSchema,
  updateAlertSchema,
} from "../docs";
import { sseHeaders } from "../util";

/**
 * Options for the AlertHandler class.
 *
 * @typedef {Object} AlertHandlerOptions
 * @property {Logger} logger - The logger instance.
 * @property {DataSource} dataSource - The data source instance.
 * @property {AlertRepository} AlertRepository - The AlertRepository instance.
 */
interface AlertHandlerOptions {
  logger: Logger;
  dataSource: DataSource;
  alertService: AlertService;
  fastify: FastifyInstance;

  version: string;
}

interface Params {
  id: string;
}

/**
 * AlertHandler class for handling alert-related operations.
 */
export class AlertHandler {
  private logger: Logger;
  private alertService: AlertService;

  private fastify: FastifyInstance;

  private version: string;

  /**
   * Constructs the AlertHandler.
   *
   * @param {AlertHandlerOptions} options - The options for the AlertHandler.
   */
  constructor(options: AlertHandlerOptions) {
    this.version = getVersion(options.version);
    this.logger = new Logger("AlertHandler", options.logger);
    this.alertService = options.alertService;
    this.fastify = options.fastify;

    this.logger.debug("AlertHandler initialized");
  }

  v1Routes() {
    const prefix = `/${this.version}/api`;
    this.fastify.post(
      `${prefix}/alerts`,
      { ...createAlertSchema },
      (req, res) => this.createAlert(req, res)
    );
    this.fastify.get(
      `${prefix}/alerts`,
      { ...getAllAlertsSchema },
      (req, res) => this.getAllAlerts(req, res)
    );
    this.fastify.get(`${prefix}/alerts/stream`, (req, res) =>
      this.streamAlerts(req, res)
    );
    this.fastify.get(
      `${prefix}/alerts/:id`,
      { ...getAlertSchema },
      (req, res) => this.getAlert(req, res)
    );
    this.fastify.put(
      `${prefix}/alerts/:id`,
      { ...updateAlertSchema },
      (req, res) => this.updateAlert(req, res)
    );
    this.fastify.delete(
      `${prefix}/alerts/:id`,
      { ...deleteAlertSchema },
      (req, res) => this.deleteAlert(req, res)
    );
  }

  public initializeRoutes() {
    switch (this.version) {
      case VERSIONS.V1:
        this.v1Routes();
        break;
      default:
        this.logger.error("No routes found for version");
    }
  }

  // Add any custom methods specific to AlertHandler here

  /**
   * Creates a new alert.
   *
   * @param {FastifyRequest} req - The request object.
   * @param {FastifyReply} res - The response object.
   *
   * @returns {Promise<void>}
   */

  private async createAlert(req: FastifyRequest, res: FastifyReply) {
    try {
      const alertData = req.body;
      const newAlert = await this.alertService.create(alertData as Alert);

      res.code(201).send(newAlert);
    } catch (error) {
      res.code(500).send({ error });
      this.logger.error(`Error creating alert: ${(error as Error).message}`);
    }
  }

  /**
   * Gets all alerts.
   *
   * @param {FastifyRequest} req - The request object.
   * @param {FastifyReply} res - The response object.
   *
   * @returns {Promise<void>}
   */
  private async getAllAlerts(req: FastifyRequest, res: FastifyReply) {
    try {
      const alerts = await this.alertService.findAll();

      res.code(200).send(alerts);
    } catch (error) {
      res.code(500).send({ error });
      this.logger.error(
        `Error getting all alerts: ${(error as Error).message}`
      );
    }
  }

  /**
   * Stream alerts.
   *
   * @param {FastifyRequest} req - The request object.
   * @param {FastifyReply} res - The response object.
   *
   * @returns {Promise<void>}
   */
  private async streamAlerts(req: FastifyRequest, res: FastifyReply) {
    try {
      let eventId = 0;

      res.raw.writeHead(200, sseHeaders());
      req.raw.on("aborted", () => this.logger.warn("stream aborted"));
      req.raw.on("close", () => this.logger.warn("stream closed"));

      AlertsWorker.on("completed", (job) => {
        const jobResult = job.returnvalue;
        if (jobResult && jobResult.status === "success") {
          const { alert } = jobResult;

          res.raw.write(`id: ${eventId}\n`);
          res.raw.write("event: message\n");

          res.raw.write(`data: ${JSON.stringify(alert)}\n\n`);
          res.raw.flushHeaders();

          eventId++;
        }
      });
    } catch (error) {
      res.code(500).send({ error });
      this.logger.error(`Error streaming alerts: ${(error as Error).message}`);
    }
  }

  /**
   * Gets a single alert by its id.
   *
   * @param {FastifyRequest} req - The request object.
   * @param {FastifyReply} res - The response object.
   *
   * @returns {Promise<void>}
   */
  private async getAlert(req: FastifyRequest, res: FastifyReply) {
    try {
      const id: string = (req.params as Params)?.id;
      const alert = await this.alertService.findOneById(id);

      if (!alert) {
        res.code(404).send({ message: "Alert not found." });
        return;
      }

      res.code(200).send(alert);
    } catch (error) {
      res.code(500).send({ error });
      this.logger.error(`Error getting alert: ${(error as Error).message}`);
    }
  }

  /**
   * Updates an existing alert by its id.
   *
   * @param {FastifyRequest} req - The request object.
   * @param {FastifyReply} res - The response object.
   *
   * @returns {Promise<void>}
   */
  private async updateAlert(req: FastifyRequest, res: FastifyReply) {
    try {
      const id = (req.params as Params)?.id;
      const alertData = req.body;

      const updatedAlert = await this.alertService.update(
        id,
        alertData as Partial<Alert>
      );

      if (!updatedAlert) {
        res.code(404).send({ message: "Alert not found." });
        return;
      }

      res.code(200).send(updatedAlert);
    } catch (error) {
      res.code(500).send({ error });
      this.logger.error(`Error updating alert: ${(error as Error).message}`);
    }
  }

  /**
   * Deletes an existing alert by its id.
   *
   * @param {FastifyRequest} req - The request object.
   * @param {FastifyReply} res - The response object.
   *
   * @returns {Promise<void>}
   */
  private async deleteAlert(req: FastifyRequest, res: FastifyReply) {
    try {
      const id = (req.params as Params)?.id;

      await this.alertService.delete(id);

      res.code(200).send({ message: "Alert deleted successfully." });
    } catch (error) {
      res.code(500).send({ error });
      this.logger.error(`Error deleting alert: ${(error as Error).message}`);
    }
  }
}
