import { SlashCommandBuilder } from "discord.js";

export interface SlashCommandDefinition {
  name: string;
  description: string;
  build(): SlashCommandBuilder;
}
