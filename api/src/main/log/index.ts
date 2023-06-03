import pino from "pino";

const transport = pino.transport({
  target: "pino-pretty",
  options: {
    colorize: true,
    level: "debug",
    prettyPrint: true,
    translateTime: "SYS:standard",
  },
});

export const logger = pino({ level: "info" }, transport);
