import { PingCommandHandler } from "./PingCommandHandler";
import { PinoLogger } from '@bots/utils'
import { CommandInteraction } from 'discord.js'

describe("PingCommandHandler", () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };

  const mockPingInteraction = {
    id: 'mockId'
  } as unknown as CommandInteraction

  it("Should return Pong!", async () => {
    const handler = new PingCommandHandler(mockLogger as unknown as PinoLogger);
    const response = await handler.execute(mockPingInteraction);
    expect(response).toStrictEqual({ content: "Pong baby! Now updated" });
  });
});
