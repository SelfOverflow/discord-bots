import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../domain/Command";
import { PinoLogger as Logger } from "@bots/utils";

class DiscordCommandAdapter {
  constructor(
    private readonly command: Command,
    private readonly logger: Logger,
  ) {}

  async handle(interaction: ChatInputCommandInteraction) {
    const context = {
      command: interaction.commandName,
      userId: interaction.user.id,
      guildId: interaction.guildId,
      interactionId: interaction.id,
    };

    const start = Date.now();
    try {
      this.logger.info("Command received", context);
      const response = await this.command.execute();
      await interaction.reply(response);
      this.logger.info("Command executed successfully", {
        ...context,
        durationMs: Date.now() - start,
      });
    } catch (error) {
      this.logger.error("Command execution failed", {
        ...context,
        error: (error as Error).message,
        stack: (error as Error).stack,
      });

      if (!interaction.replied) {
        await interaction.reply({
          content: "Something went wrong!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
}

export { DiscordCommandAdapter };
