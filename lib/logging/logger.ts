import winston from 'winston';
import config from "../../config";

const format = winston.format;

function getFileFormat() {
    return format.printf((info) =>
        `${info.timestamp} ${info.level}: ${info.message.trim()}`,
    );
}

function getConsoleFormat() {
    return format.combine(format.colorize(), getFileFormat());
}

function getConsoleTransport() {
    return new winston.transports.Console({
        format: getConsoleFormat(),
    });
}

function createLogger(transports: winston.transport[]) {
    return winston.createLogger({
        level: config.log.level,
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.json(),
        ),
        transports,
    });
}

const logger = createLogger([
    getConsoleTransport()
]);

export default logger;
