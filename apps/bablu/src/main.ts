import type { Event, Context } from "@bots/utils";

const handler = (event: Event, context: Context) => {
  console.log(event);
  console.log(context);
};

export default handler;
