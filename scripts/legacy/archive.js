const axios = require("axios");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

const ARCHIVES_FEED = "https://alertsarchive.pelmorex.com/en.php"; // Replace with the appropriate GeoRSS feed URL
const POLLING_INTERVAL = 500; // 1 minute polling interval, adjust as necessary

async function fetchArchives() {
  try {
    const response = await axios.get(ARCHIVES_FEED);
    const data = await parser.parseStringPromise(response.data);

    console.log(data);
  } catch (error) {
    console.error(`Error fetching GeoRSS feed: ${error.message}`);
  }
}

setInterval(fetchArchives, POLLING_INTERVAL);
