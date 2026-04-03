import { SlashCommandBuilder } from "discord.js";
import { COMMANDS } from "../../../constants/commands";
import { SlashCommandDefinition } from "../../../domain/SlashCommandDefinition";

export class CheckBirthdayCommand implements SlashCommandDefinition {
    name = COMMANDS.CHECK_BIRTHDAY
    description = "Checks the database for birthdays of people"
    build(): SlashCommandBuilder {
        return new SlashCommandBuilder().setName(this.name).setDescription(this.description)
    }
}