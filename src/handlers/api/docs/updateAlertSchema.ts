/**
 * @swagger
 * /api/v1/alerts/:id schema
 */
export const updateAlertSchema = {
  schema: {
    description: "Update an alert",
    summary: "This is an endpoint to update an alert by id",
    tags: ["Alert"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      $ref: "alert#",
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
