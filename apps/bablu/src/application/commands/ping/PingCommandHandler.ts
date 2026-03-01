import { Command } from "../../../domain/Command";
import { PinoLogger as Logger } from "@bots/utils";

class PingCommandHandler implements Command {
  constructor(private readonly logger: Logger) {}

  async execute(): Promise<string> {
    this.logger.info('Executing ping command')
    return "Pong baby!";
  }
}

export { PingCommandHandler };
