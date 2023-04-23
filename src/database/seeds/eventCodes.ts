import { EventCode } from "../../types";

const EventCodes: EventCode = [
  {
    code: "airQuality",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    certainty: "Observed",
    comments: "",
    description:
      "Air Quality: An elevated particulate count in the atmosphere which negatively affects visibility or the health of individuals in the affected area or downwind of the area.",
  },
  {
    code: "civilEmerg",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments:
      "Definition is required but intention is to cover events such as large riots",
    description:
      "Civil Emergency: Human activities resulting in the disrupting of services or requiring varying levels of support",
  },
  {
    code: "terrorism",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Terrorism: An act or omission that can include the use of violence or threats of violence by individuals or groups against civilians or infrastructure",
  },
  {
    code: "animalDang",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Animal Danger: A dangerous or threatening animal (wild or domesticated).",
  },
  {
    code: "wildFire",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments:
      "Definition required and maybe customized depending on regional significance",
    description:
      "Wild Fire: A fire involving natural combustibles (including grass",
  },
  {
    code: "industryFire",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Industrial Fire: A large fire that impacts an industrial building or complex and poses a threat to human health.",
  },
  {
    code: "urbanFire",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments:
      "Definition required and maybe customized depending on regional significance",
    description:
      "Urban Fire: A large fire that impacts multiple residential and/or commercial properties.",
  },
  {
    code: "forestFire",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description:
      "Forest Fire: A wildfire or prescribed fire that is burning in forested areas",
  },
  {
    code: "stormSurge",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Storm Surge: An abnormal rise in sea level accompanying a hurricane or other intense storm that threatens coastal areas.",
  },
  {
    code: "flashFlood",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description:
      "Flash Flood: The sudden onset of water causing immediate flooding often occurs from river ice jams and excessive unexpected rainfall. They present a unique danger to life and safety since they can often catch children",
  },
  {
    code: "damOverflow",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description:
      "Dam Overflow: An overflowing or failure of a dam or reservoir that will affect areas downstream.  An alert is issued only in the case of imminent flooding with an extremely short warning time.",
  },
  {
    code: "earthquake",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description:
      "Earthquake: A sudden release of energy in the Earth's crust that creates seismic waves which can cause substantial damage",
  },
  {
    code: "magnetStorm",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "Not a thunderstorm.  Can be solar",
    description:
      "Geomagnetic Storm: A worldwide disturbance of the earth's magnetic field that can",
  },
  {
    code: "landslide",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description:
      "Landslide: A general term for a wide variety of processes and landforms involving the down slope movement under the force of gravity of masses of soil and rock material that can threaten communities and infrastructure located in its path.",
  },
  {
    code: "meteor",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Meteorite: A natural object of extraterrestrial origin (meteoroid) that survives passage through the atmosphere and hits the ground with the potential for catastrophic damage.",
  },
  {
    code: "tsunami",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description:
      "Tsunami: A gravitational sea wave produced by any large- scale",
  },
  {
    code: "lahar",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description:
      "Lahar: A flowing mixture of water-saturated rock debris that forms on the slopes of a volcano",
  },
  {
    code: "pyroclasFlow",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description:
      "Pyroclastic Flow: High density flow of solid volcanic fragments suspended in gas which flows downslope from a volcanic vent that can threaten communities located near volcanoes.",
  },
  {
    code: "pyroclaSurge",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description: "Pyroclastic Surge: Turbulent",
  },
  {
    code: "volcanicAsh",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description:
      "Volcanic Ash: Dust or particles emitted by a volcano during an eruption. They may remain suspended in the atmosphere for long periods and can disrupt flights",
  },
  {
    code: "chemical",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description: "Chemical: A chemical substance that",
  },
  {
    code: "biological",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Biological: A potentially dangerous poisonous substance that is a specific product of the metabolic activities of a living organism and is usually very unstable and can easily be transferred between organisms.",
  },
  {
    code: "radiological",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Radiological: A potentially dangerous substance that in sufficient concentration can damage the environment or human health.",
  },
  {
    code: "explosive",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description: "Explosive: A potentially dangerous substance",
  },
  {
    code: "fallObject",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Falling Object: Natural or human made materials descending by force of gravity that poses a threat to persons or property.",
  },
  {
    code: "drinkingWate",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "Impact to supply",
    description:
      "Drinking Water Contamination: When water quality may be negatively impacted and may require a boil water advisory",
  },
  {
    code: "amber",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Amber Alert: Issued by police services when a child has been abducted and it is believed that his/her life is in grave danger. An Amber Alert provides the public with immediate and up-to-date information about a child abduction and solicits the public's help in the safe and swift return of the child.",
  },
  {
    code: "hurricane",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "Shutdown of service and call to action",
    description: "Hurricane: A violent storm which brings intense winds",
  },
  {
    code: "thunderstorm",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "",
    description:
      "Thunderstorm: A local storm accompanied by thunder and lightning that poses a threat to persons.",
  },
  {
    code: "tornado",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Likely or Observed",
    comments: "",
    description: "Tornado: A violent storm with very strong circular winds",
  },
  {
    code: "testMessage",
    urgency: "Immediate",
    severity: "Minor",
    Certainty: "Observed",
    comments: "",
    description:
      "Test Message: A test message may be issued for either public awareness or technical testing purposes. The USC values indicated here are for the public awareness alerts.",
  },
  {
    code: "911Service",
    urgency: "Immediate",
    severity: "Severe or Extreme",
    Certainty: "Observed",
    comments: "Shutdown of service and call to action",
    description:
      "911 Service: Disruption or outage of telecommunication services between the public and emergency responders.",
  },
];

export default EventCodes;
