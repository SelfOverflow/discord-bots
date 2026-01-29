import type { Command } from "./Command";

type BotProps<Type> = {
  token: string;
  client: Type;
  commands: Command<unknown, unknown>[];
};

abstract class Bot<Type> {
  protected token: string;
  protected client: Type;
  protected commands: Command<unknown, unknown>[];

  constructor({ token, client, commands }: BotProps<Type>) {
    this.token = token;
    this.client = client;
    this.commands = commands;
  }

  abstract login(): Promise<void>;
  abstract listen(): Promise<void>;
}

export { Bot };
export type { BotProps };
