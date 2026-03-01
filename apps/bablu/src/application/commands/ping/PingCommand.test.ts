import { PingCommandHandler } from "./PingCommandHandler";
import { PinoLogger } from '@bots/utils'

describe("PingCommandHandler", () => {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };

  it("Should return Pong!", async () => {
    const handler = new PingCommandHandler(mockLogger as unknown as PinoLogger);
    const response = await handler.execute();
    expect(response).toBe("Pong baby!");
  });

  it('Should call the logging function when interaction occurs', async () => {
    const handler = new PingCommandHandler(mockLogger as unknown as PinoLogger);
    await handler.execute();
    expect(mockLogger.info).toHaveBeenCalled()
  })
});
