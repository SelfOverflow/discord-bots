import { ChatInputCommandInteraction } from 'discord.js'
import { DiscordCommandAdapter } from '../src/infrastructure/discord/DiscordCommandAdapter'

describe('Interaction test', () => {
    it('Should reply with pong via interaction', async () => {
        const mockReply = jest.fn()
        const mockInteraction = {
            reply: mockReply
        }

        const mockCommand = {
            execute: jest.fn().mockResolvedValue('Pong baby!')
        }

        const adapter = new DiscordCommandAdapter(mockCommand)
        await adapter.handle(mockInteraction as unknown as ChatInputCommandInteraction)
        expect(mockReply).toHaveBeenCalledWith('Pong baby!')
    })
})