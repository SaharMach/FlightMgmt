import { createLogger, format, transports, Logger } from 'winston';

const logFormat = format.combine(
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaString}`;
  })
);

const logger: Logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [

    new transports.Console({
      format: format.combine(
        format.colorize(), 
        format.simple()
      )
    }),
  ],
  exceptionHandlers: [
    new transports.Console(), 
    
  ],
  rejectionHandlers: [
    new transports.Console()
  ]
});

process.on('unhandledRejection', (reason) => {
  throw reason;
});

export default logger;
