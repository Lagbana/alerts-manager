import { FeedListener } from "./feedListener";
import { Logger } from "./logger";

jest.mock("./logger", () => {
  return jest.fn().mockImplementation(() => {
    return {
      info: jest.fn(),
      error: jest.fn(),
    };
  });
});

describe("FeedListener", () => {
  let feedListener: FeedListener;
  let handler: jest.Mock;
  let logger: Logger;

  beforeEach(() => {
    handler = jest.fn();
    logger = new Logger("FeedListener");

    feedListener = new FeedListener({
      feeds: [
        {
          url: "localhost:3000",
          type: "tcp",
          handler,
        },
        {
          url: "localhost:3000",
          type: "udp",
          handler,
        },
        {
          url: "http://localhost:3000",
          type: "http",
          handler,
        },
      ],
    });
  });

  describe("start", () => {
    it.skip("starts listening for all configured feeds", () => {
      feedListener.start();

      expect(logger.info).toHaveBeenCalledWith(
        "Listening for TCP feed on localhost:3000"
      );
      expect(logger.info).toHaveBeenCalledWith(
        "Listening for UDP feed on localhost:3000"
      );
      expect(logger.info).toHaveBeenCalledWith(
        "Listening for http feed at http://localhost:3000, pinging every 60000ms."
      );
    });
  });

  describe("stop", () => {
    it.skip("stops all feed listeners", () => {
      feedListener.start();
      feedListener.stop();

      expect(logger.info).toHaveBeenCalledWith("UDP socket closed");
    });
  });
});
