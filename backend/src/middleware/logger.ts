import { createLogger, format, transports } from "winston";

// Definir o formato dos logs
const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Configurar o logger com Winston
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(), // Logs no console
    new transports.File({ filename: "logs/app.log" }) // Logs armazenados em arquivo
  ],
  level: "info", // Nível mínimo de log (info)
});

export default logger;
