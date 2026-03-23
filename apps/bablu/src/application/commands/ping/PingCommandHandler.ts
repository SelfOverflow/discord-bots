import { Command } from "../../../domain/Command";
import { PinoLogger as Logger } from "@bots/utils";
import { CommandInteraction, InteractionReplyOptions } from 'discord.js'

class PingCommandHandler implements Command {
  constructor(private readonly logger: Logger) {}

  async execute(interaction: CommandInteraction): Promise<InteractionReplyOptions> {
    this.logger.info('Executing ping command')
    const reply = `Pong baby! Now updated`
    return {
      content: reply
    };
  }
}

export { PingCommandHandler };
