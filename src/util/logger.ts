import * as bunyan from "bunyan";
import * as bunyanDebugStream from "bunyan-debug-stream";

/**
 * Logger class for managing log messages.
 * Wraps the Bunyan logger and provides methods for logging at different levels.
 */
class Logger {
  logger: bunyan;

  /**
   * Creates a new Logger instance.
   * @param {string} name - The name of the logger component.
   * @param {bunyan} [parentLogger] - The optional parent Bunyan logger to create a child logger.
   */
  constructor(name: string, parentLogger?: Logger) {
    if (parentLogger) {
      this.logger = parentLogger.logger.child({ component: name });
    } else {
      const config: bunyanDebugStream.BunyanDebugStreamOptions = {
        forceColor: true,
        showDate: true,
        basepath: __dirname,
      };

      const error: bunyan.Stream = {
        level: "error",
        stream: bunyanDebugStream.create(config),
      };

      const info: bunyan.Stream = {
        level: "debug",
        stream: bunyanDebugStream.create(config),
      };

      const warn: bunyan.Stream = {
        level: "info",
        stream: bunyanDebugStream.create(config),
      };

      const streams: bunyan.Stream[] = [error, info, warn];

      this.logger = bunyan.createLogger({
        name,
        serializers: bunyanDebugStream.serializers,
        streams,
      });
    }
  }

  /**
   * Log a trace level message.
   * @param {...Parameters<bunyan['trace']>} args - The arguments to pass to the trace method.
   */
  trace(...args: Parameters<bunyan["trace"]>): void {
    this.logger.trace(...args);
  }

  /**
   * Log a debug level message.
   * @param {...Parameters<bunyan['trace']>} args - The arguments to pass to the trace method.
   */
  debug(...args: Parameters<bunyan["debug"]>): void {
    this.logger.debug(...args);
  }

  info(...args: Parameters<bunyan["info"]>): void {
    this.logger.info(...args);
  }

  /**
   * Log a warn level message.
   * @param {...Parameters<bunyan['trace']>} args - The arguments to pass to the trace method.
   */
  warn(...args: Parameters<bunyan["warn"]>): void {
    this.logger.warn(...args);
  }

  /**
   * Log a error level message.
   * @param {...Parameters<bunyan['trace']>} args - The arguments to pass to the trace method.
   */
  error(...args: Parameters<bunyan["error"]>): void {
    this.logger.error(...args);
  }

  /**
   * Log a fatal level message.
   * @param {...Parameters<bunyan['trace']>} args - The arguments to pass to the trace method.
   */
  fatal(...args: Parameters<bunyan["fatal"]>): void {
    this.logger.fatal(...args);
  }
}

export { Logger };
