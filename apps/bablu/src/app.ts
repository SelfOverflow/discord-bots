import { config } from 'dotenv'
import { Client, GatewayIntentBits, Events } from "discord.js";
import { PingCommandHandler } from "./application/commands/ping/PingCommandHandler";
import { DiscordCommandAdapter } from "./infrastructure/discord/DiscordCommandAdapter";
import { PinoLogger as Logger } from '@bots/utils'
import { AddBirthdayCommandHandler } from './application/commands/addBirthday/AddBirthdayCommandHandler';
config()

const logger = new Logger();

export const handler = () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
  })

  client.on(Events.InteractionCreate, async (interaction) => {
    let handler = null;
    if (!interaction.isChatInputCommand()) return;
    // we decide which command to use, based on the slash command name
    if (interaction.commandName === 'ping') {
      handler = new PingCommandHandler(logger);
    }
    else if (interaction.commandName === 'addBirthday') {
      handler = new AddBirthdayCommandHandler(logger);
    }

    if (handler) {
      const adapter = new DiscordCommandAdapter(handler, logger);
      await adapter.handle(interaction)
    }
  })

  if (process.env.DISCORD_TOKEN) {
    client.login(process.env.DISCORD_TOKEN)
  } else {
    console.log('Discord token not found!!')
  }
};
