import dotenv from "dotenv";
import { makeBot } from "./app/makeBot";

dotenv.config();
// eslint-disable-next-line turbo/no-undeclared-env-vars
const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error(`Discord bot token not found!`);
} else {
  const controller = makeBot(token);
  controller.start();
}
