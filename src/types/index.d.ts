import { DataSource } from "typeorm";
import { Logger } from "../util/logger";

export interface RepositoryOptions {
  logger: Logger;
  dataSource: DataSource;
}

export interface Params {
  name: string;
  value: string;
}

export interface Area {
  areaDesc: string;
  polygon: string;
  geocode: Array<Params>;
}

export interface Info {
  language: string;
  category: string;
  event: string;
  responseType: string;
  urgency: string;
  severity: string;
  certainty: string;
  audience: string;
  eventCode: Array<Params>;
  effective: string;
  expires: string;
  senderName: string;
  headline: string;
  description: string;
  instruction: string;
  web: string;
  parameter: Array<Params>;
  area: Array<Area>;
}

export interface EventCode extends Omit<EventCode, "_id"> {}
