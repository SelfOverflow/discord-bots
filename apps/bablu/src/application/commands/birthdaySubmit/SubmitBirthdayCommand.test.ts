import { makeApp } from '../../../app'
import { MessageFlags, Events, ModalSubmitInteraction } from 'discord.js'
import { DAY_ID, MONTH_ID, YEAR_ID, BIRTHDAY_MODAL_ID } from '../../../constants/commands'
import { REPLIES } from '../../../constants/replies'
import { PinoLogger } from '@bots/utils'

describe('Command to handle birthday submission', () => {
    const app = makeApp(new PinoLogger())
    const mockReply = jest.fn();

    const validBirthdayInteractionSubmit = {
        reply: mockReply,
        isChatInputCommand: () => false,
        isModalSubmit: () => true,
        customId: BIRTHDAY_MODAL_ID,
        user: {
            id: 'test-user'
        },
        guildId: 'test-guild-id',
        fields: {
            getTextInputValue: (value: string) => {
                if (value === DAY_ID) return '4'
                else if (value === YEAR_ID) return '1999'
                else return ''
            },

            getStringSelectValues: (value: string) => {
                if (value === MONTH_ID) return '12'
                else return ''
            }
        }
    } as unknown as ModalSubmitInteraction

    const invalidMonthSubmit = {
        reply: mockReply,
        isChatInputCommand: () => false,
        isModalSubmit: () => true,
        customId: BIRTHDAY_MODAL_ID,
        user: {
            id: 'test-user'
        },
        guildId: 'test-guild-id',
        fields: {
            getTextInputValue: (value: string) => {
                if (value === DAY_ID) return '4'
                else if (value === YEAR_ID) return '1999'
                else return ''
            },

            getStringSelectValues: (value: string) => {
                if (value === MONTH_ID) return '13'
                else return ''
            }
        }
    } as unknown as ModalSubmitInteraction

    const invalidDayAndMonthSubmit = {
        reply: mockReply,
        isChatInputCommand: () => false,
        isModalSubmit: () => true,
        customId: BIRTHDAY_MODAL_ID,
        user: {
            id: 'test-user'
        },
        guildId: 'test-guild-id',
        fields: {
            getTextInputValue: (value: string) => {
                if (value === DAY_ID) return '32'
                else if (value === YEAR_ID) return '1999'
                else return ''
            },

            getStringSelectValues: (value: string) => {
                if (value === MONTH_ID) return '2'
                else return ''
            }
        }
    } as unknown as ModalSubmitInteraction

    it('Should reply with a success message when a valid date is provided', async () => {
        app.emit(Events.InteractionCreate, validBirthdayInteractionSubmit);
        await new Promise(process.nextTick);
        expect(mockReply).toHaveBeenCalledWith({
            content: `${REPLIES.BIRTHDAY_SUBMIT_ACKNOWLEDGEMENT} December 4, 1999`,
            flags: MessageFlags.Ephemeral
        })
    })

    it('Should throw an error when wrong month is provided', async () => {
        app.emit(Events.InteractionCreate, invalidMonthSubmit);
        await new Promise(process.nextTick);
        expect(mockReply).toHaveBeenCalledWith({
            content: `Invalid date provided 4/13/1999`,
            flags: MessageFlags.Ephemeral
        })
    })

    it('Should throw an error when wrong month and day are provided', async () => {
        app.emit(Events.InteractionCreate, invalidDayAndMonthSubmit);
        await new Promise(process.nextTick);
        expect(mockReply).toHaveBeenCalledWith({
            content: `Invalid date provided 32/2/1999`,
            flags: MessageFlags.Ephemeral
        })
    })
})