import Client from 'ssh2-sftp-client';

interface SystemPaths {
    remoteDirectory: string;
    remoteBackupFile: string;
    localBackupZippedFile: string;
}

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

    async createSftpSession(): Promise<void> {
        await this.sftp.connect(this.config);
    }

    async isSerialNumberOnSftp(systemPaths: SystemPaths): Promise<boolean> {
        try {

            await this.createSftpSession();
            const result = await this.sftp.exists(systemPaths.remoteDirectory.toString());
            return typeof result === 'string';
        } catch (error) {
            console.error('Error checking existence:', error);
            throw error;
        } finally {
            try {
                if (this.sftp) {
                    await this.sftp.end();
                }
            } catch (endError) {
                console.error('Error while closing SFTP connection:', endError);
            }
        }
    }

    async getListOfSftpBackups(systemPaths: SystemPaths): Promise<string[][]> {
        try {
            await this.createSftpSession();
            const fileList = await this.sftp.list(systemPaths.remoteDirectory, undefined);
            return this.mapToBackupList(fileList);
        } catch (error) {
            console.error("Error while getting backup-list of backups:", error);
            throw error;
        } finally {
            await this.sftp.end();
        }
    }

    async downloadBackup(systemPaths: SystemPaths): Promise<void> {
        try {
            await this.createSftpSession();
            console.log("downloading backup");
            console.log("remote backup", systemPaths.remoteBackupFile);
            console.log("local backup", systemPaths.localBackupZippedFile);
            await this.sftp.fastGet(systemPaths.remoteBackupFile, systemPaths.localBackupZippedFile);
        } finally {
            await this.sftp.end();
        }
    }

    private mapToBackupList(fileList: any[]): string[][] {
        return fileList
            .filter(entry => !this.isExcluded(entry))
            .map(entry => this.mapToBackupAttributes(entry));
    }

    private isExcluded(entry: any): boolean {
        const fileName = entry.name.toLowerCase();
        return fileName === 'out' || fileName === 'in';
    }

    private mapToBackupAttributes(entry: any): string[] {
        const fileName = entry.name;
        const size = this.formatSize(entry.size);
        const localDateTime = new Date(entry.modifyTime).toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
        return [fileName, size, localDateTime];
    }

    private formatSize(sizeInBytes: number): string {
        const kiloByte = 1024;
        const megaByte = kiloByte * kiloByte;
        if (sizeInBytes >= megaByte) {
            const sizeInMB = sizeInBytes / megaByte;
            return `${sizeInMB.toFixed(1)} MB`;
        } else if (sizeInBytes >= kiloByte) {
            const sizeInKB = sizeInBytes / kiloByte;
            return `${sizeInKB.toFixed(1)} KB`;
        } else {
            return `${sizeInBytes} bytes`;
        }
    }
}

export default SftpConnector;