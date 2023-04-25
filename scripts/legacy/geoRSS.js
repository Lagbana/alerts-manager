const axios = require("axios");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

const GEORSS_FEED_URL = "https://rss1.naad-adna.pelmorex.com/"; // Replace with the appropriate GeoRSS feed URL
const POLLING_INTERVAL = 500; // 1 minute polling interval, adjust as necessary

async function fetchGeoRSSFeed() {
  try {
    const response = await axios.get(GEORSS_FEED_URL);
    const data = await parser.parseStringPromise(response.data);

    console.log(data);
  } catch (error) {
    console.error(`Error fetching GeoRSS feed: ${error.message}`);
  }
}

setInterval(fetchGeoRSSFeed, POLLING_INTERVAL);
