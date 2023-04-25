const dgram = require("dgram");

const MULTICAST_GROUP = "224.0.10.10";
const MULTICAST_PORT = 25555;

const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

socket.bind(MULTICAST_PORT, () => {
  console.log(`UDP socket bound to port ${MULTICAST_PORT}`);
});

socket.on("listening", () => {
  socket.addMembership(MULTICAST_GROUP);
  console.log(`Joined multicast group ${MULTICAST_GROUP}`);
});

function handleIncomingData(data, rinfo) {
  console.log(`Received data from ${rinfo.address}:${rinfo.port}`);
  console.log("Data:", data.toString());
  // Process the received data as needed, e.g., parse it, store it in a database, etc.
}

socket.on("message", handleIncomingData);

socket.on("error", (error) => {
  console.error(`Error in UDP socket: ${error.message}`);
});

socket.on("close", () => {
  console.log("UDP socket closed");
});
