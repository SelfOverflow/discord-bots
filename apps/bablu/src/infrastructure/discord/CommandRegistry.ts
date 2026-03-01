import { SlashCommandDefinition } from '../../domain/SlashCommandDefinition'
import { PingCommand } from '../../application/commands/ping/PingCommand'

export class CommandRegistry {
    private readonly commands: SlashCommandDefinition[] = [
        new PingCommand(),
    ]

    getAll() {
        return this.commands;
    }
}