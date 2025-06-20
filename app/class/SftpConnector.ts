import Client, {FileInfo} from 'ssh2-sftp-client';

import { SftpPath } from './SftpPath';
import { DatabasePath } from './DatabasePath';

class SftpConnector {
    private readonly sftp: Client;
    private readonly config: {
        host: string;
        port: number;
        username: string;
        password: string;
    };

    constructor() {
        this.sftp = new Client();
        this.config = {
            host: process.env.FTP_HOST as string,
            port: parseInt(process.env.FTP_PORT as string, 10),
            username: process.env.FTP_USERNAME as string,
            password: process.env.FTP_PASSWORD as string,
        };
    }

    private async createSftpSession(): Promise<void> {
        await this.sftp.connect(this.config);
    }

    async downloadBackup(databasePath: DatabasePath, sftpPath: SftpPath): Promise<void> {
        try {
            await this.createSftpSession();
            await this.sftp.fastGet(sftpPath.backupFileZip, databasePath.backupFileZip);
        } finally {
            await this.sftp.end();
        }
    }


    async getBackupList(databasePath: DatabasePath, sftpPath: SftpPath): Promise<string[][]> {
        try {
            await this.createSftpSession();
            
            const fileList: FileInfo[] = await this.sftp.list(sftpPath.configDir, undefined);
            return this.mapToBackupList(fileList);
        } catch (error) {
            console.error("Error while getting backup-list of backups:", error);
            throw error;
        } finally {
            await this.sftp.end();
        }
    }

    async getSftpBackupList(sftpPath: SftpPath): Promise<string[][]> {
        try {
            await this.createSftpSession();
            const fileList: FileInfo[] = await this.sftp.list(sftpPath.configDir, undefined);
            return this.mapToBackupList(fileList);
        } catch (error) {
            console.error("Error while getting backup-list of backups:", error);
            throw error;
        } finally {
            await this.sftp.end();
        }
    }

    async uploadBackup(localFilePath: string, remoteFilePath: string): Promise<void> {
        try {
            await this.createSftpSession();
            await this.sftp.fastPut(localFilePath, remoteFilePath);
        } catch (e) {
            console.error('Errore completo:', e);
            throw new Error(`Errore durante l'upload del backup: ${(e as Error).message}`);
        } finally {
            await this.sftp.end();
        }
    }

    async createPath(path: string): Promise<void> {
        try {
            await this.createSftpSession();
            await this.sftp.mkdir(path, true); 
        } catch (error) {
            console.error('Errore durante la creazione della directory:', error);
            throw new Error(`Errore durante la creazione della directory: ${(error as Error).message}`);
        } finally {
            await this.sftp.end();
        }
    }

    private mapToBackupList(fileList: FileInfo[]): string[][] {
        // Filtra i file esclusi e mappa i file rimanenti in un array di attributi
        return fileList
            .filter(entry => !this.isExcluded(entry)) // Escludi file non rilevanti out, in
            .map(entry => this.mapToBackupAttributes(entry)); // Mappa i file in attributi leggibili
    }

    private isExcluded(entry: FileInfo): boolean {
        // Escludi file con nomi specifici (case insensitive)
        const fileName = entry.name.toLowerCase();
        return fileName === 'out' || fileName === 'in';
    }

    private mapToBackupAttributes(entry: FileInfo): string[] {
        // Estrai attributi leggibili da un file
        const fileName = entry.name;
        const size = this.formatSize(entry.size); // Formatta la dimensione del file
        // Se modifyTime è in secondi, moltiplica per 1000. Se è già in millisecondi, usa così.
        const modifyTimeMs = entry.modifyTime > 1e12 ? entry.modifyTime : entry.modifyTime * 1000;
        const date = new Date(modifyTimeMs);
        // Ottieni la data e ora locale italiana (CET/CEST)
        const localDateTime = date.toLocaleString('it-IT', {
            timeZone: 'Europe/Rome',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', '');
        return [fileName, size, localDateTime];
    }

    private formatSize(sizeInBytes: number): string {
        // Converte la dimensione del file in un formato leggibile (bytes, KB, MB)
        const kiloByte = 1024;
        const megaByte = kiloByte * kiloByte;

        if (sizeInBytes >= megaByte) {
            return `${(sizeInBytes / megaByte).toFixed(1)} MB`;
        } else if (sizeInBytes >= kiloByte) {
            return `${(sizeInBytes / kiloByte).toFixed(1)} KB`;
        } else {
            return `${sizeInBytes} bytes`;
        }
    }

    
}

export default SftpConnector;