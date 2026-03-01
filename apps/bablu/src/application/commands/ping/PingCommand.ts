import { SlashCommandBuilder } from "discord.js";
import { SlashCommandDefinition } from "../../../domain/SlashCommandDefinition";

export class PingCommand implements SlashCommandDefinition {
  name = "ping";
  description = "Replies with Pong!";
  build(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  }
}
