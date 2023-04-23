/**
 * @swagger
 * /api/v1/alerts schema
 */
export const createAlertSchema = {
  schema: {
    description: "Create an alert",
    summary: "This is an endpoint to create an alert",
    tags: ["Alert"],
    body: {
      type: "object",
      $ref: "alert#",
    },
    response: {
      201: {
        description: "Successful response",
        type: "object",
        $ref: "alert#",
      },
    },
  },
};
