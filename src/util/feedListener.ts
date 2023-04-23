import axios from "axios";
import dgram from "dgram";
import net from "net";

import { Logger } from "./logger";

interface Options {
  pingInterval?: number;
  logger?: Logger;
  feeds: Feed[];
}

export interface Feed {
  url: string;
  type: "tcp" | "udp" | "http";

  handler: (data: string) => void;

  options?: Options;
}

/**
 * A class that listens for TCP, UDP, and GeoRSS feeds.
 */
class FeedListener {
  private logger: Logger;
  private options: Options;
  private tcpServer?: net.Socket;
  private udpServer?: dgram.Socket;
  private feeds: Feed[];

  /**
   * Creates a new FeedListener instance with the specified feeds and options.
   * @param feeds - An array of Feed objects.
   * @param options - Optional options for the listener.
   */
  constructor(options: Options) {
    this.feeds = options.feeds;
    this.options = options;
    this.logger = new Logger("FeedListener", options?.logger);
  }

  /**
   * Starts listening for all configured feeds.
   */
  async start() {
    for (const feed of this.feeds) {
      const { url, type, handler } = feed;
      switch (type) {
        case "tcp":
          this.startTcpListener(url, handler);
          break;
        case "udp":
          this.startUdpListener(url, handler);
          break;
        case "http":
          this.startHttpListener(url, handler);
          break;
        default:
          throw new Error(`Unsupported feed type: ${type}`);
      }
    }
  }

  /**
   * Stops all feed listeners.
   */
  stop() {
    if (this.tcpServer) {
      this.tcpServer.destroy();
    }

    if (this.udpServer) {
      this.udpServer.close();
    }
  }

  private startTcpListener(url: string, handler: (data: string) => void) {
    const [host, port] = url.split(":");

    const server = net.createConnection({ host, port: parseInt(port) }, () => {
      this.logger.info(`Connected to ${host}:${port}`);
    });

    server.on("data", handler);

    server.on("end", () => {
      this.logger.info(`Disconnected from ${host}:${port}`);
    });

    server.on("error", (error) => {
      this.logger.error(`Error in connection: ${error.message}`);
    });

    this.tcpServer = server;
  }

  private startUdpListener(url: string, handler: (data: string) => void) {
    const [host, port] = url.split(":");
    const server = dgram.createSocket({ type: "udp4", reuseAddr: true });

    server.bind(parseInt(port), () => {
      this.logger.info(`UDP socket bound to port ${host}`);
    });

    server.on("listening", () => {
      server.addMembership(host);
      this.logger.info(`Joined multicast group ${host}`);
    });

    server.on("message", handler);

    server.on("error", (error) => {
      this.logger.error(`Error in UDP server: ${error.message}`);
    });

    server.on("close", () => {
      this.logger.info("UDP socket closed");
    });

    this.udpServer = server;
  }

  private startHttpListener(url: string, handler: (data: string) => void) {
    const interval = this.options?.pingInterval || 60000;
    setInterval(async () => {
      const response = await axios
        .get(url)
        .then((resp) => resp.data)
        .catch((error) =>
          this.logger.error(`Error in http request: ${error.message}`)
        );

      handler(response);
    }, interval);

    this.logger.info(
      `Listening for http feed at ${url}, pinging every ${interval}ms.`
    );
  }
}

export { FeedListener };
