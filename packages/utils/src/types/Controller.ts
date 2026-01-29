import type { Bot } from "./Bot";

abstract class Controller {
  protected client: Bot<unknown>;
  constructor(client: Bot<unknown>) {
    this.client = client;
  }

  abstract start(): Promise<void>
}

export { Controller }
