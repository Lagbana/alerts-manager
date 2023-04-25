import axios from "axios";
import { Job } from "bullmq";
import { Logger, processedReferenceId } from "../../../util";
import { Parser } from "xml2js";
import { alertApplicationService } from "../../api";
import { dataSource } from "../../../database";
import { Alert } from "../../../entity";
import { Info } from "../../../types";
import { Alerts as AlertsQueue } from "..";

const logger = new Logger(
  "[ALERTS_DATA_AGGREGATION] handleAlertsDataAggregation"
);

const parser = new Parser();

function getFirstItem(data: Array<string>): string {
  // Check if data exists and is an array with at least one element
  if (data && Array.isArray(data) && data[0].length > 0) {
    return data[0];
  }
  // If item[0] doesn't exist, return an empty string
  return "";
}

function processNestedAlertReferences(
  references: string[]
): { name: string; data: string }[] | null {
  if (references.includes("") && references.length === 1) return null;
  const referenceIds = references[0].split(" ");
  const alertEndpoints = referenceIds.map(processedReferenceId);
  return alertEndpoints;
}

export const handleAlertsDataAggregation = async (job: Job) => {
  const { data: alertUrl } = job;

  try {
    const { data } = await axios.get(alertUrl);

    const alert = await parser.parseStringPromise(data);
    const alertService = alertApplicationService({ logger, dataSource });

    const { alert: alertData } = alert;
    const identifier = alertData.identifier[0];

    if (!identifier?.length) {
      logger.warn(`Early return. Alert identifier not found: ${alertUrl}`);
      return;
    }

    const previousAlert = await alertService.findOne({
      identifier: { $eq: identifier },
    });

    if (previousAlert) {
      return;
    }

    if (alertData?.references?.length > 0) {
      const alertEndpointInfo = processNestedAlertReferences(
        alertData.references
      );
      if (alertEndpointInfo && alertEndpointInfo?.length > 0)
        AlertsQueue.addBulk(alertEndpointInfo);
    }

    logger.info(`Alert data Aggregation: ${alertUrl}`);

    const infos: Array<Info> = alertData.info.map((info: any) => {
      return {
        language: getFirstItem(info.language),
        category: getFirstItem(info.category),
        event: getFirstItem(info.event),
        responseType: getFirstItem(info?.responseType),
        urgency: getFirstItem(info.urgency),
        severity: getFirstItem(info.severity),
        certainty: getFirstItem(info.certainty),
        audience: getFirstItem(info.audience),
        eventCode: info.eventCode.map((eventCode: any) => ({
          name: getFirstItem(eventCode.valueName),
          value: getFirstItem(eventCode.value),
        })),
        effective: getFirstItem(info.effective),
        expires: getFirstItem(info.expires),
        senderName: getFirstItem(info.senderName),
        headline: getFirstItem(info.headline),
        description: getFirstItem(info.description),
        instruction: getFirstItem(info.instruction),
        web: getFirstItem(info.web),
        parameter: info.parameter.map((parameter: any) => ({
          name: getFirstItem(parameter.valueName),
          value: getFirstItem(parameter.value),
        })),
        area: info.area.map((area: any) => ({
          areaDesc: getFirstItem(area.areaDesc),
          polygon: getFirstItem(area.polygon),
          geocode: area.geocode.map((geoCode: any) => ({
            name: getFirstItem(geoCode.valueName),
            value: getFirstItem(geoCode.value),
          })),
        })),
      };
    });

    const newAlert = {
      xmlns: alertData.$["xmlns"],
      identifier: getFirstItem(alertData.identifier),
      sender: getFirstItem(alertData.sender),
      sent: getFirstItem(alertData.sent),
      status: getFirstItem(alertData.status),
      msgType: getFirstItem(alertData.msgType),
      source: getFirstItem(alertData.source),
      scope: getFirstItem(alertData.scope),
      code: alertData.code,
      note: getFirstItem(alertData.note),
      references: getFirstItem(alertData.references),
      info: infos,
      signature: JSON.stringify(alertData.Signature),
    } as Alert;

    // Non blocking operation to save alert data
    alertService.create(newAlert);

    // Return the alert data from the job, used to send the alert to the client
    return { status: "success", alert: newAlert };
  } catch (error) {
    console.log(alertUrl);
    logger.error(`Error processing alerts: ${error}. Alert url: ${alertUrl}`);
    throw error;
  }
};
