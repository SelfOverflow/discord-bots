import type { Command } from "@bots/utils";
import { Client, GatewayIntentBits } from "discord.js";
import { DiscordBot } from "../client/DiscordBotClient";
import { BotController } from "../controller/BotController";

const makeBot = (token: string) => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  const commands: Command<unknown, unknown>[] = [];
  const discordBot = new DiscordBot({ token, client, commands });
  const controller = new BotController(discordBot);
  return controller;
};

export { makeBot };
