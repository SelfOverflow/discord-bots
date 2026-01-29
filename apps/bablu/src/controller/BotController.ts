import { Bot, Controller } from "@bots/utils";

class BotController extends Controller {
  constructor(client: Bot<unknown>) {
    super(client);
  }

  async start() {
    await this.client.login();
    await this.client.listen();
  }
}

export { BotController };
