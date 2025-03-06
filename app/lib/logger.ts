import winston from 'winston';

const logger = winston.createLogger({
    level: 'info', // Livello di log di default
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Log in formato JSON per una migliore leggibilità
    ),
    transports: [
        new winston.transports.Console(), // Stampa log nella console
        new winston.transports.File({ filename: 'logs/server.log' }) // Salva i log in un file
    ],
});

export default logger;