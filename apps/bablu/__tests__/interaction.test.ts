import { ChatInputCommandInteraction } from "discord.js";
import { DiscordCommandAdapter } from "../src/infrastructure/discord/DiscordCommandAdapter";
import { PinoLogger } from "@bots/utils";

describe("Interaction test", () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };

  it("Should reply with pong via interaction", async () => {
    const mockReply = jest.fn();
    const mockInteraction = {
      reply: mockReply,
      user: {
        id: 'test-user-id'
      }
    };

    const mockCommand = {
      execute: jest.fn().mockResolvedValue("Pong baby!"),
    };

    const adapter = new DiscordCommandAdapter(mockCommand, mockLogger as unknown as PinoLogger);
    await adapter.handle(
      mockInteraction as unknown as ChatInputCommandInteraction,
    );
    expect(mockReply).toHaveBeenCalledWith("Pong baby!");
  });
});
