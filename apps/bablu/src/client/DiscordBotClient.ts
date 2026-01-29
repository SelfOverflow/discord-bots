import { Bot } from "@bots/utils";
import type { BotProps } from "@bots/utils";
import { Client, Events } from "discord.js";

class DiscordBot extends Bot<Client> {
  constructor({ token, client, commands }: BotProps<Client>) {
    super({ token, client, commands });
  }

  async login() {
    this.client.once(Events.ClientReady, (readyClient) => {
      console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });
    await this.client.login(this.token);
  }
  async listen() {
    console.log(`Listening!!!`);
  }
}

export { DiscordBot };
