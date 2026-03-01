import pino from "pino";
import { Logger } from "./Logger";

export class PinoLogger implements Logger {
  private readonly logger = pino({
    level: process.env.LOG_LEVEL ?? "info",
    base: null,
  });

  info(message: string, context?: Record<string, unknown>): void {
    this.logger.info(context ?? {}, message);
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.logger.error(context ?? {}, message);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.logger.warn(context ?? {}, message);
  }
}
