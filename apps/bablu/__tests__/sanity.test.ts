import handler from "../src/main";
import type { Event, Context } from "@bots/utils";

describe("Basic handler", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should log the event and context", () => {
    const spyLog = jest.spyOn(console, 'log');
    const event: Event = {
      name: "Ping",
      type: "Command",
    };
    const context: Context = {
      function: "handler",
    };
    handler(event, context);
    expect(spyLog).toHaveBeenNthCalledWith(1, event)
    expect(spyLog).toHaveBeenNthCalledWith(2, context)
  });
});
