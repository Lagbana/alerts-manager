import { z } from "zod";

const AlertSchema = z.object({
  xmlns: z.string(),
  identifier: z.string(),
  sender: z.string(),
  sent: z.string(),
  status: z.string(),
  msgType: z.string(),
  source: z.string(),
  scope: z.string(),
  code: z.array(z.string()),
  note: z.string(),
  references: z.string(),
  info: z.array(
    z.object({
      language: z.string(),
      category: z.string(),
      event: z.string(),
      responseType: z.string(),
      urgency: z.string(),
      severity: z.string(),
      certainty: z.string(),
      audience: z.string(),
      eventCode: z.array(z.object({ name: z.string(), value: z.string() })),
      effective: z.string(),
      expires: z.string(),
      senderName: z.string(),
      headline: z.string(),
      description: z.string(),
      instruction: z.string(),
      web: z.string(),
      parameter: z.array(z.object({ name: z.string(), value: z.string() })),
      area: z.array(
        z.object({
          areaDesc: z.string(),
          polygon: z.string(),
          geocode: z.array(z.object({ name: z.string(), value: z.string() })),
        })
      ),
    })
  ),
  signature: z.string(),
});

export { AlertSchema };
