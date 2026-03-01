import { PingCommandHandler } from './PingCommandHandler'

describe('PingCommandHandler', () => {
    it('Should return Pong!', async () => {
        const handler = new PingCommandHandler()
        const response = await handler.execute();
        expect(response).toBe('Pong baby!')
    })
})