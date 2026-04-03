import { ChatInputCommandInteraction, Events, MessageFlags } from 'discord.js';
import { makeApp } from '../../../app'
import { PinoLogger } from '@bots/utils'
import { COMMANDS } from '../../../constants/commands';

describe('Handling the birthday checks', () => {
    const logger = new PinoLogger()
    const app = makeApp(logger);
    const mockReply = jest.fn((data) => {
        console.log(data)
    })
    const checkBirthdayEvent : ChatInputCommandInteraction = {
        id: 'test-check-birthday-command-id',
        commandName: COMMANDS.CHECK_BIRTHDAY,
        reply: mockReply,
        isModalSubmit: () => false,
        user: {
            id: 'test-user'
        }
    } as unknown as ChatInputCommandInteraction

    it('Should handle the checkBirthday event', async () => {
        app.emit(Events.InteractionCreate, checkBirthdayEvent)
        await new Promise(process.nextTick)
        expect(mockReply).toHaveBeenCalledWith({
            content: 'Happy birthday!',
            flags: MessageFlags.Ephemeral
        })
    })
})