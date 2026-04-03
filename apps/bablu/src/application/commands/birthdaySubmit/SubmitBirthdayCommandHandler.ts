import { Command } from "../../../domain/Command";
import { CommandInteraction, InteractionReplyOptions, MessageFlags, ModalSubmitInteraction } from "discord.js";
import { DAY_ID, MONTH_ID, YEAR_ID } from '../../../constants/commands'
import { REPLIES } from '../../../constants/replies'
import { PinoLogger } from '@bots/utils'
import { parse, format } from 'date-fns'

class SubmitBirthdayCommandHandler implements Command {
    constructor(private readonly logger: PinoLogger) { }

    async execute(interaction: CommandInteraction): Promise<InteractionReplyOptions> {
        const modalSubmitInteraction = interaction as unknown as ModalSubmitInteraction
        const day = modalSubmitInteraction.fields.getTextInputValue(DAY_ID)
        const month = modalSubmitInteraction.fields.getStringSelectValues(MONTH_ID)
        const year = modalSubmitInteraction.fields.getTextInputValue(YEAR_ID)
        this.logger.info(`Received date [day]: ${day}, [month]: ${month}, [year]: ${year}`)
        try {
            // an error will be thrown in case of invalid date
            const date = parse(`${day}/${month}/${year}`, 'dd/MM/yyyy', new Date())
            return {
                content: `${REPLIES.BIRTHDAY_SUBMIT_ACKNOWLEDGEMENT} ${format(date, 'MMMM d, yyyy')}`,
                flags: MessageFlags.Ephemeral
            }
        } catch (error) {
            this.logger.error(`Invalid date provided`)
            throw new Error(`Invalid date provided ${day}/${month}/${year}`)
        }
    }
}

export { SubmitBirthdayCommandHandler }