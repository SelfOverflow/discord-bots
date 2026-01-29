interface Command<CommandType, EventType> {
  data: CommandType;
  execute(param: EventType): Promise<void>;
}

export type { Command }
