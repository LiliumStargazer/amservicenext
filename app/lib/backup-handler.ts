import decompress from 'decompress';
import fs from 'fs';
import Database from 'better-sqlite3';
import path from 'path';
import os from 'os';
import * as Sentry from '@sentry/nextjs';
import {SystemPaths} from "@/app/types/types";

 function createSystemPaths(matricola: string, backupName: string = ""): SystemPaths {
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
        localBackupUnzippedFile: null,
    };
}

function getFileName(backupName: string): string {
    const dotIndex = backupName.indexOf(".");
    return backupName.substring(0, dotIndex);
}

function findBackupFile(files: string[], localBackupDirectory: string): string | null {
    const backupFiles = ["AndBk.s3db", "DbBackup.s3db", "AndBkFarma.s3db"];
    for (const file of files) {
        if (backupFiles.includes(file)) {
            return path.join(localBackupDirectory, file);
        }
    }
    return null;
}

function setLocalBackupUnzippedFile(localBackupDirectory: string, localBackupUnzippedFile: string | null): string {
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
    localBackupUnzippedFile = foundBackupFile;

    return localBackupUnzippedFile;
}

async function unzipFile(systemPaths: SystemPaths): Promise<void> {
    const localFile = systemPaths.localBackupZippedFile;

    try {
        if (fs.existsSync(localFile) && fs.statSync(localFile).isFile()) {
            const destinationFolder = systemPaths.localBackupDirectory;
            await decompress(localFile, destinationFolder);
        } else {
            throw new Error(`File not found: ${localFile}`);
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
}

async function executeQueryDbAll<T>(sqliteDbPath: string, query: string): Promise<T[]> {
    try {
        const db = new Database(sqliteDbPath);
        const result = db.prepare(query).all() as T[];
        db.close();
        return result;
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
}

async function createDirectory(localBackupDirectory: string): Promise<void> {
    try {
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

export { unzipFile, executeQueryDbAll, createDirectory, createSystemPaths, setLocalBackupUnzippedFile };