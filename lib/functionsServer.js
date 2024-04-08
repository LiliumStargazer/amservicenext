'use server';
const decompress = require("decompress");
const fs = require('fs');
const Database = require('better-sqlite3');
const path = require('path');
const os = require('os');


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
/*
function createSystemPaths(matricola, backupName = "") {
    const CONFIG_DIRECTORY = "config";
    const prefix ="/Users/alghisi/Documents/log/";
    const remoteDirectory = path.join(prefix, matricola, CONFIG_DIRECTORY).toString();
    const remoteBackupFile = path.join(prefix,matricola, CONFIG_DIRECTORY, path.sep, backupName).toString();
    const localBackupDirectory = path.join(fs.realpathSync(os.tmpdir()), "tempAmService", matricola, getFileName(backupName)).toString();
    const localBackupZippedFile = path.join(fs.realpathSync(os.tmpdir()), "tempAmService", matricola, getFileName(backupName), backupName).toString();
    const localBackupUnzippedFile = null;

    return {
        remoteDirectory,
        remoteBackupFile,
        localBackupDirectory,
        localBackupZippedFile,
        localBackupUnzippedFile: null
    };
}
*/
function getFileName(backupName) {
    const dotIndex = backupName.indexOf(".");
    return backupName.substring(0, dotIndex);
}

function setLocalBackupUnzippedFile(localBackupDirectory, localBackupUnzippedFile) {
    if (fs.existsSync(localBackupDirectory) && fs.lstatSync(localBackupDirectory).isDirectory()) {
        const files = fs.readdirSync(localBackupDirectory);

        if (files && files.length > 0) {
            for (const file of files) {
                if (file === "AndBk.s3db") {
                    localBackupUnzippedFile = path.join(localBackupDirectory, "AndBk.s3db");
                    break;
                } else if (file === "DbBackup.s3db") {
                    localBackupUnzippedFile = path.join(localBackupDirectory, "DbBackup.s3db");
                    break;
                } else if (file === "AndBkFarma.s3db") {
                    localBackupUnzippedFile = path.join(localBackupDirectory, "AndBkFarma.s3db");
                    break;
                }
            }
        } else {
            throw new Error("La directory è vuota.");
        }
    } else {
        throw new Error("Il percorso specificato non è una directory.");
    }

    return localBackupUnzippedFile;
}

async function unzipFile(systemPaths) {
    const localFile = systemPaths.localBackupZippedFile;

    if (fs.existsSync(localFile) && fs.statSync(localFile).isFile()) {
        const destinationFolder = systemPaths.localBackupDirectory;

        await decompress(localFile, destinationFolder);
    } else {
        throw new Error(`File not found: ${localFile}`);
    }
}

async function executeQueryDbAll(sqliteDbPath, query) {
    try {
        const db = new Database(sqliteDbPath);
        const result = db.prepare(query).all();
        db.close();
        return result.reverse();
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function createDirectory(localBackupDirectory) {
    console.log(localBackupDirectory);
    fs.mkdir(localBackupDirectory, { recursive: true }, (err) => {
        if (err) {
            console.error('Errore durante la creazione della cartella:', err);
        }
    });
}


module.exports = { unzipFile, executeQueryDbAll, createDirectory , createSystemPaths, setLocalBackupUnzippedFile};