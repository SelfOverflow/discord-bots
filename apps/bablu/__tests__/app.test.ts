import { makeApp } from '../src/app'
import { ChatInputCommandInteraction, Events, MessageFlags } from 'discord.js'
import { BIRTHDAY_MODAL_ID, DAY_ID, MONTH_ID, YEAR_ID } from '../src/constants/commands'
import { REPLIES } from '../src/constants/replies'
import { PinoLogger } from '@bots/utils'

describe('Discord client events test', () => {
    const mockReply = jest.fn();
    const mockShowModal = jest.fn();
    const app = makeApp(new PinoLogger());

    const pingInteraction = {
        id: 'test-ping-command',
        commandName: 'ping',
        reply: mockReply,
        isChatInputCommand: () => true,
        isModalSubmit: () => false,
        user: {
            id: 'test-user'
        },
        guildId: 'test-guild-id'
    } as unknown as ChatInputCommandInteraction

    const addBirthdayInteraction = {
        id: 'test-birthday-command',
        commandName: 'addbirthday',
        reply: mockReply,
        isChatInputCommand: () => true,
        isModalSubmit: () => false,
        user: {
            id: 'test-user'
        },
        guildId: 'test-guild-id',
        showModal: mockShowModal
    } as unknown as ChatInputCommandInteraction

    const submitBirthdayInteraction = {
        id: 'test-submit-birthday-command',
        customId: BIRTHDAY_MODAL_ID,
        reply: mockReply,
        isChatInputCommand: () => false,
        isModalSubmit: () => true,
        user: {
            id: 'test-user'
        },
        guildId: 'test-guild-id',
        showModal: mockShowModal,
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
    } as unknown as ChatInputCommandInteraction


    it('Should respond to the /ping command', async () => {
        app.emit(Events.InteractionCreate, pingInteraction)
        await new Promise(process.nextTick)
        expect(mockReply).toHaveBeenCalledWith({
            content: 'Pong baby! Now updated'
        })
    })

    it('Should respond to the /addbirthday command', async () => {
        app.emit(Events.InteractionCreate, addBirthdayInteraction);
        await new Promise(process.nextTick);
        expect(mockShowModal).toHaveBeenCalled()
    })

    it('Should submit the user submitted birthday and return an acknowledgement', async () => {
        app.emit(Events.InteractionCreate, submitBirthdayInteraction);
        await new Promise(process.nextTick);
        expect(mockReply).toHaveBeenCalledWith({
            content: `${REPLIES.BIRTHDAY_SUBMIT_ACKNOWLEDGEMENT} December 4, 1999`,
            flags: MessageFlags.Ephemeral
        })
    })
})