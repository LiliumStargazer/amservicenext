// cron.js
const cron = require('node-cron');
const fs = require('fs');
const Sentry = require("@sentry/nextjs");

function cleanFolder() {
    const temporaryPath = process.env.TMPDIR || '/tmp';
    const amServiceTempPath = `${temporaryPath}/tempAmService`;
    const amServiceTempPathExists = fs.existsSync(amServiceTempPath);

    if (amServiceTempPathExists) {
        fs.rmdirSync(amServiceTempPath, { recursive: true })
    }
    else {
        Sentry.captureException(new Error('The folder does not exist'));
    }
}

// every day at midnight (00:00)
cron.schedule('0 0 * * *', () => {
    cleanFolder();
});