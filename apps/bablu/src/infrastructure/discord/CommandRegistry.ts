import { SlashCommandDefinition } from '../../domain/SlashCommandDefinition'
import { PingCommand } from '../../application/commands/ping/PingCommand'
import { AddBirthdayCommand } from '../../application/commands/addBirthday/AddBirthdayCommand'

export class CommandRegistry {
    private readonly commands: SlashCommandDefinition[] = [
        new PingCommand(),
        new AddBirthdayCommand()
    ]

    getAll() {
        return this.commands;
    }
}