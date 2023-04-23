import { Job } from "bullmq";
import { ALERTS_DATA_AGGREGATION, Logger } from "../../../util";
import { Parser } from "xml2js";
import { Alerts as AlertsQueue } from "../";

const logger = new Logger(
  "[GEO_RSS_DATA_AGGREGATION] handleGeoRssDataAggregation"
);

const parser = new Parser();

export const handleGeoRssDataAggregation = async (job: Job) => {
  try {
    const {
      data: { data },
    } = job;

    logger.debug(`Processing GeoRSS data`);

    const {
      feed: { entry: entries },
    } = await parser.parseStringPromise(data);

    const extractedAlerts = entries.map((entry: any) => {
      return { name: ALERTS_DATA_AGGREGATION, data: entry.link[0].$.href };
    });

    AlertsQueue.addBulk(extractedAlerts);

    return extractedAlerts;
  } catch (error) {
    logger.error(`Error processing GeoRSS data: ${error}`);
    throw error;
  }
};
