import { Worker } from "bullmq";

import {
  ALERTS_DATA_AGGREGATION,
  GEO_RSS_DATA_AGGREGATION,
  ALERTS_HEARTBEAT_PROCESSING,
} from "../../../util";
import { handleAlertHeartbeat } from "./heartbeat";
import { handleAlertsDataAggregation } from "./alerts";
import { handleGeoRssDataAggregation } from "./geoRss";
import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

// Be always ready to concurrently process 50 jobs at a time
const workerOptions = { concurrency: 50, connection: new Redis(redisUrl) };

const HeartBeatWorker = new Worker(
  ALERTS_HEARTBEAT_PROCESSING,
  handleAlertHeartbeat,
  workerOptions
);

const AlertsWorker = new Worker(
  ALERTS_DATA_AGGREGATION,
  handleAlertsDataAggregation,
  workerOptions
);

const GeoRssWorker = new Worker(
  GEO_RSS_DATA_AGGREGATION,
  handleGeoRssDataAggregation,
  workerOptions
);

export { HeartBeatWorker, AlertsWorker, GeoRssWorker };
