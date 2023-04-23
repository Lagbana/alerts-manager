import { Logger } from "./logger";
import { Writable } from "stream";

describe("Logger", () => {
  const testStream = new Writable({
    write(chunk, encoding, callback) {
      callback();
    },
  });

  test("should log messages", () => {
    const logger = new Logger("TestLogger");
    const spy = jest.spyOn(testStream, "write");

    logger.logger.addStream({
      level: "trace",
      type: "stream",
      stream: testStream,
    });

    logger.trace("Test trace");
    logger.debug("Test debug");
    logger.info("Test info");
    logger.warn("Test warn");
    logger.error("Test error");
    logger.fatal("Test fatal");

    expect(spy).toHaveBeenCalledTimes(6);
    spy.mockRestore();
  });
});
