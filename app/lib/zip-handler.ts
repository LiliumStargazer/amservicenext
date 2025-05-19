import fs from "fs";
import decompress from "decompress";
import path from "path";
import archiver from "archiver";
import {DatabasePath} from "@/app/class/DatabasePath";

export async function unzipFile(databasePath: DatabasePath): Promise<void> {

    if (!databasePath.localZippedDb) {
        return Promise.reject(new Error("File not found"));
    }

    const localFile = databasePath.localZippedDb;

    if (fs.existsSync(localFile) && fs.statSync(localFile).isFile()) {
        const destinationFolder = databasePath.localDirectory;
        await decompress(localFile, destinationFolder);
    } else {
        throw new Error(`File not found: ${localFile}`);
    }

}

export async function createZipFile(databasePath: DatabasePath): Promise<void> {
    if (!databasePath.localDirectory) {
        return Promise.reject(new Error("Directory not found"));
    }

    if (!databasePath.localRecoveredDb || !databasePath.localUnzippedProdDb) {
        return Promise.reject(new Error("Recover DB path or prod path is not defined"));
    }

    if ( !fs.existsSync(databasePath.localRecoveredDb) || !fs.existsSync(databasePath.localUnzippedProdDb) ) {
        return Promise.reject(new Error("File not found"));
    }

    const zipFilePath = databasePath.localRecoveredZippedDb;

    if (!zipFilePath) {
        return Promise.reject(new Error("Zip file path is not defined"));
    }

    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver("zip", { zlib: { level: 9 } });

        output.on("close", () => {
            console.log(`Zip file created: ${zipFilePath} (${archive.pointer()} total bytes)`);
            resolve();
        });

        archive.on("error", (err) => {
            reject(err);
        });

        archive.pipe(output);

        const filesToZip = [databasePath.localRecoveredDb, databasePath.localUnzippedProdDb];

        for (const file of filesToZip) {
            if (file && fs.existsSync(file) && fs.statSync(file).isFile()) {
                archive.file(file, { name: path.basename(file) });
            } else {
                console.warn(`File not found or invalid: ${file}`);
            }
        }

        archive.finalize();
    });
}