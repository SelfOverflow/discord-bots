import { InteractionReplyOptions, CommandInteraction } from 'discord.js'

export interface Command {
    execute(interaction: CommandInteraction): Promise<InteractionReplyOptions>;
}