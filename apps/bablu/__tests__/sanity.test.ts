import { handler } from "../src/main";
import { APIGatewayEvent, Context } from "aws-lambda";

describe("Basic handler", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should log the event and context", () => {});
});
