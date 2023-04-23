/**
 * @description Returns the headers for Server-Sent Events
 */
export const sseHeaders = () => ({
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  "Content-Encoding": "identity",
  Connection: "keep-alive",
});
