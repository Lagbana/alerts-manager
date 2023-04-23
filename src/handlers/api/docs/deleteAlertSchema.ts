/**
 * @swagger
 * /api/v1/alerts/:id schema
 */
export const deleteAlertSchema = {
  schema: {
    description: "Delete an alert",
    summary: "This is an endpoint to delete an alert by id",
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
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};
