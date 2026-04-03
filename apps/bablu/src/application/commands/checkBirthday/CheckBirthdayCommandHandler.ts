import { CommandInteraction, InteractionReplyOptions, MessageFlags } from "discord.js";
import { Command } from "../../../domain/Command";
import { PinoLogger } from '@bots/utils'

class CheckBirthdayCommandHandler implements Command {
    constructor(private readonly logger: PinoLogger) { }
    
    async execute(interaction: CommandInteraction): Promise<InteractionReplyOptions> {
        this.logger.info(`Executing check birthday command`);
        return {
            content: 'Happy birthday!',
            flags: MessageFlags.Ephemeral
        }
    }
}

export { CheckBirthdayCommandHandler }