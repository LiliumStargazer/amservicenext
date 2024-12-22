import { readFileSync } from 'fs';
import Client from 'ssh2-sftp-client';

export async function downloadFileFromSSH(
    host: string,
    port: number,
    username: string,
    password: string,
    privateKeyPath: string,
    remotePath: string,
    localPath: string
): Promise<void> {
    const config = {
        host: host,
        port: port,
        username: username,
        password: password,
        passphrase: password,
        privateKey: readFileSync(privateKeyPath, 'utf-8'),
        readyTimeout: 60000,
    };

    const sftp = new Client();

    return new Promise<void>(async (resolve, reject) => {
        sftp.on('close', () => {
            console.error('Global close listener: close event raised');
            reject(new Error('SSH connection closed unexpectedly'));
        });

        try {
            await sftp.connect(config);
            await sftp.fastGet(remotePath, localPath);
            console.log(`File downloaded successfully from ${remotePath} to ${localPath}`);
            resolve();
        } catch (error) {
            const err = error as Error;
            if (err.message.includes('Timed out while waiting for handshake')) {
                console.error('Connection timed out: ', err.message);
            } else {
                console.error('Error during file download:', error);
            }
            reject(error);
        } finally {
            try {
                await sftp.end();
            } catch (err) {
                console.error('Error closing connection:', err);
                reject(err);
            }
        }
    });
}

//
// export async function downloadFileFromSSH2(
//     host: string,
//     port: number,
//     username: string,
//     password: string,
//     privateKeyPath: string,
//     remotePath: string,
//     localPath: string
// ): Promise<void> {
//     const conn = new Client();
//     const privateKey = readFileSync(privateKeyPath, 'utf-8');
//
//     return new Promise<void>((resolve, reject) => {
//         conn.on('ready', () => {
//             conn.sftp((err, sftp) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//
//                 const readStream = sftp.createReadStream(remotePath);
//                 const writeStream = createWriteStream(localPath);
//
//                 readStream.on('error', (error: Error) => {
//                     reject(error);
//                 });
//
//                 writeStream.on('error', (error: Error) => {
//                     reject(error);
//                 });
//
//                 writeStream.on('close', () => {
//                     console.log(`File downloaded successfully from ${remotePath} to ${localPath}`);
//                     conn.end();
//                     resolve();
//                 });
//
//                 readStream.pipe(writeStream);
//             });
//         }).on('error', (error) => {
//             reject(error);
//         }).connect({
//             host: host,
//             port: port,
//             username: username,
//             password: password,
//             privateKey: privateKey,
//             passphrase: password,
//             readyTimeout: 60000,
//         });
//     });
// }