/**
 * @swagger
 * /api/v1/alerts schema
 */
export const getAllAlertsSchema = {
  schema: {
    description: "Get all alerts",
    summary: "This is an endpoint that fetches all alerts",
    tags: ["Alert"],
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: { $ref: "alert#" },
      },
    },
  },
};
