import { CommandInteraction, InteractionReplyOptions, ModalBuilder } from "discord.js";
import { Command } from "../../../domain/Command";
import { PinoLogger } from '@bots/utils'

class AddBirthdayCommandHandler implements Command {
    constructor(private readonly logger: PinoLogger) {}
    
    async execute(interaction: CommandInteraction): Promise<void> {
        this.logger.info(`Executing addBirthday command`)
        const modal = new ModalBuilder().setCustomId('birthday-modal').setTitle('Set your birthday 🎂')
        await interaction.showModal(modal)
    }
}

export { AddBirthdayCommandHandler }