import { ChatInputCommandInteraction } from 'discord.js'
import { Command } from '../../domain/Command'

class DiscordCommandAdapter {
    constructor(private readonly command: Command) {}

    async handle(interaction: ChatInputCommandInteraction) {
        const response = await this.command.execute()
        await interaction.reply(response)
    }
}

export { DiscordCommandAdapter }
