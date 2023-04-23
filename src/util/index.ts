import { Buffer } from "buffer";
import { ALERTS_DATA_AGGREGATION } from "./constants";

export function bufferArrayToString(bufferArray: Uint8Array): string {
  const buffer = Buffer.from(bufferArray);
  return buffer.toString("utf8");
}

export const replaceSpecialCharacters = (inputString: string): string => {
  return inputString.replace(/[:\-]/g, "_").replace(/\+/g, "p");
};

export const formatTimestamp = (timestamp: string) => {
  return replaceSpecialCharacters(timestamp);
};

export const processedReferenceId = (referenceId: string) => {
  const [, feedId, timestamp] = referenceId.split(",");
  const [date] = timestamp.split("T");
  const feed = replaceSpecialCharacters(feedId.replace("urn:oid:", "urn_oid_"));
  const time = formatTimestamp(timestamp);
  return {
    name: ALERTS_DATA_AGGREGATION,
    data: `http://capcp1.naad-adna.pelmorex.com/${date}/${time}I${feed}.xml`,
  };
};

export * from "./feedListener";
export * from "./logger";
export * from "./version";
export * from "./constants";
export * from "./validators";
