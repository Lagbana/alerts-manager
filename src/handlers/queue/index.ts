import { Queue } from "bullmq";
import Redis from "ioredis";
import {
  ALERTS_DATA_AGGREGATION,
  GEO_RSS_DATA_AGGREGATION,
  ALERTS_HEARTBEAT_PROCESSING,
} from "../../util";
import { HeartBeatWorker, AlertsWorker, GeoRssWorker } from "./workers";
import { Logger } from "../../util";

const logger = new Logger("[QUEUE]");

logger.debug("Connecting to Redis...");

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

// Tries to process a job 5 times before marking it as failed.
const defaultJobOptions = {
  attempts: 5,
};

const options = {
  defaultJobOptions,
  connection: new Redis(redisUrl),
};

const HeartBeat = new Queue(ALERTS_HEARTBEAT_PROCESSING, options);
const GeoRss = new Queue(GEO_RSS_DATA_AGGREGATION, options);
const Alerts = new Queue(ALERTS_DATA_AGGREGATION, options);

export {
  Alerts,
  GeoRss,
  HeartBeat,
  HeartBeatWorker,
  AlertsWorker,
  GeoRssWorker,
};
