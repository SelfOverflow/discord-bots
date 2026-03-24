import { config } from 'dotenv'
import { Client, GatewayIntentBits, Events, ModalSubmitInteraction, ChatInputCommandInteraction, CommandInteraction } from "discord.js";
import { PingCommandHandler } from "./application/commands/ping/PingCommandHandler";
import { DiscordCommandAdapter } from "./infrastructure/discord/DiscordCommandAdapter";
import { PinoLogger as Logger } from '@bots/utils'
import { AddBirthdayCommandHandler } from './application/commands/addBirthday/AddBirthdayCommandHandler';
import { SubmitBirthdayCommandHandler } from './application/commands/birthdaySubmit/SubmitBirthdayCommandHandler'
import { COMMANDS, BIRTHDAY_MODAL_ID } from './constants/commands'
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
    
    // we decide which command to use, based on the slash command name
    if ((interaction as ChatInputCommandInteraction).commandName === COMMANDS.PING) {
      handler = new PingCommandHandler(logger);
    }
    else if ((interaction as ChatInputCommandInteraction).commandName === COMMANDS.ADD_BIRTHDAY) {
      handler = new AddBirthdayCommandHandler(logger);
    }
    else if (interaction.isModalSubmit() && (interaction as ModalSubmitInteraction).customId === BIRTHDAY_MODAL_ID) {
      handler = new SubmitBirthdayCommandHandler(logger);
    } 
    
    if (handler) {
      const adapter = new DiscordCommandAdapter(handler, logger);
      await adapter.handle(interaction as CommandInteraction)
    }
    
    else {
      logger.error(`Cannot handle the received command`)
      console.log(interaction)
    }
    
  })

  if (process.env.DISCORD_TOKEN) {
    client.login(process.env.DISCORD_TOKEN)
  } else {
    console.log('Discord token not found!!')
  }
};
