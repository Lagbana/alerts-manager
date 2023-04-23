import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { Logger, FeedListener, Feed } from "./util";
import { GeoRss, HeartBeat } from "./handlers/queue";
import { initializeFastifyHandlers } from "./handlers/api";
import { dataSource } from "./database";
import { serverConfig } from "./config";

const feeds: Feed[] = [
  {
    url: "224.0.10.10:25555",
    type: "udp",
    handler: (data: string) =>
      HeartBeat.add("UDP HeartBeat", { data, type: "udp" }),
  },
  {
    url: "streaming1.naad-adna.pelmorex.com:8080",
    type: "tcp",
    handler: (data: string) =>
      HeartBeat.add("TCP HeartBeat", { data, type: "tcp" }),
  },
  {
    url: "streaming2.naad-adna.pelmorex.com:8080",
    type: "tcp",
    handler: (data: string) =>
      HeartBeat.add("TCP HeartBeat", { data, type: "tcp" }),
  },
  {
    url: "http://rss1.naad-adna.pelmorex.com",
    type: "http",
    handler: (data: string) => {
      GeoRss.add("GeoRss Feed Interval", { data, type: "georss" });
    },
  },
  {
    url: "http://rss2.naad-adna.pelmorex.com",
    type: "http",
    handler: (data: string) => {
      GeoRss.add("GeoRss Feed Interval", { data, type: "georss" });
    },
  },
];

const logger = new Logger("Server");

const server: FastifyInstance = fastify({ logger: serverConfig.logger });
const listners = new FeedListener({ feeds, logger, pingInterval: 60000 });

const start = async () => {
  try {
    server.register(cors, serverConfig.cors);

    await initializeFastifyHandlers({ logger, fastify: server, dataSource });
    await server.listen({ port: Number(process.env.PORT) || 3000 });

    // Start listening for tcp, udp & geoRss feeds after the server has started
    listners.start();
  } catch (err) {
    logger.error(`Server failed to start ${(err as Error)?.toString()}`);
    process.exit(1);
  }
};

start();
