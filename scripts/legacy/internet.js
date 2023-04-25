const net = require("net");

const STREAMING_HOST = "streaming1.naad-adna.pelmorex.com";
const STREAMING_PORT = 8080;

function handleIncomingData(data) {
  console.log("Received data:", data.toString());
  // Process the received data as needed, e.g., parse it, store it in a database, etc.
}

const client = net.createConnection(
  { host: STREAMING_HOST, port: STREAMING_PORT },
  () => {
    console.log(`Connected to ${STREAMING_HOST}:${STREAMING_PORT}`);
  }
);

client.on("data", handleIncomingData);

client.on("end", () => {
  console.log(`Disconnected from ${STREAMING_HOST}:${STREAMING_PORT}`);
});

client.on("error", (error) => {
  console.error(`Error in connection: ${error.message}`);
});
