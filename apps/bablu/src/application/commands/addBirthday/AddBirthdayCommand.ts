import { SlashCommandBuilder } from 'discord.js'
import { SlashCommandDefinition } from '../../../domain/SlashCommandDefinition'

export class AddBirthdayCommand implements SlashCommandDefinition {
    name = "addbirthday"
    description = "Allows you to set your birthday in the server"
    build(): SlashCommandBuilder {
        return new SlashCommandBuilder().setName(this.name).setDescription(this.description)
    }
}