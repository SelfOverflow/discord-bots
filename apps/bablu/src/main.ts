import type { Event, Context } from "@bots/utils";

const handler = (event: Event, context: Context) => {
  const x = 2;
  console.log(event);
  console.log(context);
};

export default handler;
