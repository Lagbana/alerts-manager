/**
 * @swagger
 * /api/v1/alerts/:id schema
 */
export const getAlertSchema = {
  schema: {
    description: "Get alert by id",
    summary: "This is an endpoint to fetch an alert by id",
    tags: ["Alert"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        $ref: "alert#",
      },
    },
  },
};
