import { FastifyInstance } from "fastify";

export const initializeFastifySwagger = async (
  fastify: FastifyInstance
): Promise<FastifyInstance> => {
  await fastify.register(require("@fastify/swagger"), {
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "Alert API",
        description: "Alert API documentation",
        version: "0.1.0",
      },
      // * This could be our Github repo if we open source it or created a doc site
      //   externalDocs: {
      //     url: "https://swagger.io",
      //     description: "Find more info here",
      //   },
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "Alert", description: "Alert related end-points" }],
    },
    exposeRoute: true,
    hideUntagged: false,
  });

  await fastify.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: true,
    },
    staticCSP: true,
    transformStaticCSP: (header: unknown) => header,
    transformSpecification: (
      swaggerObject: unknown,
      request: unknown,
      reply: unknown
    ) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // Add models to swagger
  fastify.addSchema({
    $id: "params",
    type: "object",
    properties: {
      name: { type: "string" },
      value: { type: "string" },
    },
  });

  fastify.addSchema({
    $id: "area",
    type: "object",
    properties: {
      areaDesc: { type: "string" },
      polygon: { type: "string" },
      geocode: {
        type: "array",
        items: { $ref: "params#" },
      },
    },
  });

  fastify.addSchema({
    $id: "info",
    type: "object",
    properties: {
      language: { type: "string" },
      category: { type: "string" },
      event: { type: "string" },
      responseType: { type: "string" },
      urgency: { type: "string" },
      severity: { type: "string" },
      certainty: { type: "string" },
      audience: { type: "string" },
      eventCode: {
        type: "array",
        items: { $ref: "params#" },
      },
      effective: { type: "string" },
      expires: { type: "string" },
      senderName: { type: "string" },
      headline: { type: "string" },
      description: { type: "string" },
      instruction: { type: "string" },
      web: { type: "string" },
      parameter: {
        type: "array",
        items: { $ref: "params#" },
      },
      area: {
        type: "array",
        items: { $ref: "area#" },
      },
    },
  });

  fastify.addSchema({
    $id: "alert",
    type: "object",
    properties: {
      identifier: { type: "string", description: "Alert identifier" },
      xmls: { type: "string", description: "Alert xmls data" },
      sender: { type: "string" },
      sent: { type: "string" },
      status: { type: "string" },
      msgType: { type: "string" },
      source: { type: "string" },
      scope: { type: "string" },
      code: {
        type: "array",
        items: { type: "string" },
      },
      note: { type: "string" },
      references: { type: "string" },
      info: {
        type: "array",
        items: { $ref: "info#" },
      },
      signature: { type: "string" },
    },
  });

  return fastify;
};
