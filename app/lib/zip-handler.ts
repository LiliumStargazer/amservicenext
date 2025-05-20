import fs from "fs";
import decompress from "decompress";
import path from "path";
import archiver from "archiver";

export async function unzipFile(file: string, destinationPath: string): Promise<void> {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
        const destinationFolder = destinationPath;
        await decompress(file, destinationFolder);
    } else {
        throw new Error(`File not found: ${file}`);
    }
}

export async function createZipFile(filesToZip: string[], zippedFilePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zippedFilePath);
        const archive = archiver("zip", { zlib: { level: 9 } });

        output.on("close", () => {
            console.log(`Zip file created: ${zippedFilePath} (${archive.pointer()} total bytes)`);
            resolve();
        });

        archive.on("error", (err) => {
            reject(err);
        });

        archive.pipe(output);

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
