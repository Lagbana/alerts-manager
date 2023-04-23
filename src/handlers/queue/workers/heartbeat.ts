import { Job } from "bullmq";
import { Alert } from "../../../entity";
import { Parser } from "xml2js";
import {
  Logger,
  bufferArrayToString,
  processedReferenceId,
} from "../../../util";
import { Alerts as AlertsQueue } from "../";

const parser = new Parser();

interface AlertJob extends Omit<Alert, "sent"> {
  $: {
    xmlns: string;
    "xmlns:xsi": string;
    "xsi:schemaLocation": string;
  };
  sent: string[];
}

const logger = new Logger("[ALERTS_HEARTBEAT_PROCESSING] handleAlertHeartbeat");

export const handleAlertHeartbeat = async (job: Job) => {
  try {
    const {
      data: { data },
    } = job;

    logger.debug(`Processing alerts heartbeat`);

    const { alert } = await parser.parseStringPromise(
      bufferArrayToString(data)
    );

    const { references } = alert as AlertJob;

    const referenceIds = references[0].split(" ");
    const alertEndpoints = referenceIds.map(processedReferenceId);

    AlertsQueue.addBulk(alertEndpoints);

    return alertEndpoints;
  } catch (error) {
    logger.error(`Error processing alerts: ${error}`);
    throw error;
  }
};
