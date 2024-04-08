const Client  = require('ssh2-sftp-client');

class SftpConnector {
    constructor() {
        this.sftp = new Client();
        this.config = {
            host: process.env.FTP_HOST,
            port: process.env.FTP_PORT,
            username: process.env.FTP_USERNAME,
            password: process.env.FTP_PASSWORD,
        };
    }

    async createSftpSession() {
        return this.sftp.connect(this.config);
    }

    async isSerialNumberOnSftp(systemPaths) {
        try {
            await this.createSftpSession();
            const result = await this.sftp.exists(systemPaths.remoteDirectory.toString());
            return typeof result === 'string';
        } catch (error) {
            console.error('Error checking existence:', error);
            return false;
        } finally {
            try {
                if (this.sftp) {
                    this.sftp.end();
                }
            } catch (endError) {
                console.error('Error while closing SFTP connection:', endError);
            }
        }
    }
    async getListOfSftpBackups(systemPaths) {
        try {
            await this.createSftpSession();
            const fileList = await this.sftp.list(systemPaths.remoteDirectory);
            return this.mapToBackupList(fileList);
        } catch (error) {
            console.error("Error while getting list of backups:", error);
            throw error;
        } finally {
            this.sftp.end();
        }
    }

    async downloadBackup(systemPaths) {
        try {
            await this.createSftpSession();
            console.log("downloading backup");
            console.log("remote backup",systemPaths.remoteBackupFile);
            console.log("local backup", systemPaths.localBackupZippedFile);
            await this.sftp.fastGet(systemPaths.remoteBackupFile, systemPaths.localBackupZippedFile);
        } finally {
            this.sftp.end();
        }
    }

    mapToBackupList(fileList) {
        return fileList
            .filter(entry => !this.isExcluded(entry))
            .map(entry => this.mapToBackupAttributes(entry));
    }

    isExcluded(entry) {
        const fileName = entry.name.toLowerCase();
        return fileName === 'out' || fileName === 'in';
    }

    mapToBackupAttributes(entry) {
        const fileName = entry.name;
        const size = this.formatSize(entry.size);
        const localDateTime= new Date(entry.modifyTime).toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
        return [fileName, size, localDateTime];
    }

    formatSize(sizeInBytes) {
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

module.exports = SftpConnector;
