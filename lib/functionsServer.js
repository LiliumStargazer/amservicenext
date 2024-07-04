'use server';
const decompress = require("decompress");
const fs = require('fs');
const Database = require('better-sqlite3');
const path = require('path');
const os = require('os');
const Sentry = require('@sentry/nextjs');


function createSystemPaths(matricola, backupName = "") {
    const CONFIG_DIRECTORY = "config";
    const remoteDirectory = path.join(matricola, CONFIG_DIRECTORY).toString();
    const remoteBackupFile = path.join(matricola, CONFIG_DIRECTORY, backupName).toString();
    const localBackupDirectory = path.join(fs.realpathSync(os.tmpdir()), "tempAmService", matricola, getFileName(backupName)).toString();
    const localBackupZippedFile = path.join(fs.realpathSync(os.tmpdir()), "tempAmService", matricola, getFileName(backupName), backupName).toString();

    return {
        remoteDirectory,
        remoteBackupFile,
        localBackupDirectory,
        localBackupZippedFile,
        localBackupUnzippedFile: null
    };

}

function getFileName(backupName) {
    const dotIndex = backupName.indexOf(".");
    return backupName.substring(0, dotIndex);
}


function findBackupFile(files, localBackupDirectory) {
    const backupFiles = ["AndBk.s3db", "DbBackup.s3db", "AndBkFarma.s3db"];
    for (const file of files) {
        if (backupFiles.includes(file)) {
            return path.join(localBackupDirectory, file);
        }
    }
    return null;
}

function setLocalBackupUnzippedFile(localBackupDirectory, localBackupUnzippedFile) {
    if (!fs.existsSync(localBackupDirectory) || !fs.lstatSync(localBackupDirectory).isDirectory()) {
        const error = new Error("Il percorso specificato non è una directory.");
        Sentry.captureException(error);
        throw error;
    }

    const files = fs.readdirSync(localBackupDirectory);
    if (!files || files.length === 0) {
        const error = new Error("La directory è vuota.");
        Sentry.captureException(error);
        throw error;
    }

    const foundBackupFile = findBackupFile(files, localBackupDirectory);
    if (!foundBackupFile) {
        const error = new Error("No backup file found.");
        Sentry.captureException(error);
        throw error;
    }

    // Assign the found backup file to localBackupUnzippedFile
    localBackupUnzippedFile = foundBackupFile;

    return localBackupUnzippedFile;
}


async function unzipFile(systemPaths) {
    const localFile = systemPaths.localBackupZippedFile;

    try {
        if (fs.existsSync(localFile) && fs.statSync(localFile).isFile()) {
            const destinationFolder = systemPaths.localBackupDirectory;

            await decompress(localFile, destinationFolder);
        } else {
            return new Error(`File not found: ${localFile}`);
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
}

async function executeQueryDbAll(sqliteDbPath, query) {
    try {
        const db = new Database(sqliteDbPath);
        const result = db.prepare(query).all();
        db.close();
        return result;
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
}

async function createDirectory(localBackupDirectory) {
    try {
        console.log(localBackupDirectory);
        fs.mkdir(localBackupDirectory, { recursive: true }, (err) => {
            if (err) {
                Sentry.captureException(err);
                console.error('Errore durante la creazione della cartella:', err);
                throw err;
            }
        });
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
}

module.exports = { unzipFile, executeQueryDbAll, createDirectory , createSystemPaths, setLocalBackupUnzippedFile};
