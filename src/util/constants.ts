// Queue names used to identify workers to their associated queue within the  BullMQ library.
export const ALERTS_HEARTBEAT_PROCESSING = "Alerts Heartbeat Processing";
export const GEO_RSS_DATA_AGGREGATION = "GeoRSS Data Aggregation";
export const ALERTS_DATA_AGGREGATION = "Alerts Data Aggregation";

// CAP standard defined urgency codes
export const CAP_URGENCY_CODES = {
  Immediate: "Responsive action SHOULD be taken immediately",
  Expected: "Responsive action SHOULD be taken soon (within next hour)",
  Future: "Responsive action SHOULD be taken in the near future",
  Past: "Responsive action is no longer required",
  Unknown: "Urgency not known",
};

// CAP standard defined severity codes
export const CAP_SEVERITY_CODES = {
  Extreme: "Extraordinary threat to life",
  Severe: "Significant threat to life",
  Moderate: "Possible threat to life",
  Minor: "Minimal to no known threat to life",
  Unknown: "Severity unknown",
};

// CAP standard defined certainty codes
export const CAP_CERTAINTY_CODES = {
  Observed: "Determined to have occurred or to be ongoing",
  Likely: "Likely (p > ~50%)",
  Possible: "Possible but not likely (p <= ~50%)",
  Unlikely: "Not expected to occur (p ~ 0)",
  Unknown: "Certainty unknown",
};
