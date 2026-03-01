import { Command } from '../../../domain/Command'

class PingCommandHandler implements Command {
    async execute(): Promise<string> {
        return 'Pong baby!'
    }
}

export { PingCommandHandler }