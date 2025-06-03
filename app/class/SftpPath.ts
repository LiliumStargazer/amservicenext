import path from "path";


export class SftpPath {
    protected readonly BASE_TEMP_DIR = "tempAmService";
    protected readonly CONFIG_DIR = "config";
    protected readonly UPDATE_DIR = "update";
    protected readonly OUT_DIR = "Out";
    protected readonly BACKUP_FIXED_ZIP = "DB.zip";
    protected readonly BACKUP_WITH_FINGER_ZIP = "DbAndFinger.zip";
    protected readonly _configDir: string;
    protected readonly _outDir: string;
    protected readonly _backupFileZip: string;
    protected readonly _backupWithFingerZip: string;
    protected readonly _backupFixedZip: string;

    constructor(private serial: string, private backupName?: string) {
        this._configDir = path.join(this.serial, this.CONFIG_DIR); // /1234/config
        this._outDir = path.join(this.serial,this.CONFIG_DIR, this.OUT_DIR); // /1234/Out
        this._backupFileZip = this.backupName ? path.join(this.serial, this.CONFIG_DIR, this.backupName) : ""; // /1234/config/AndBk17.zip
        this._backupWithFingerZip = path.join(this.serial, this.CONFIG_DIR, this.OUT_DIR, this.BACKUP_WITH_FINGER_ZIP); // /1234/config/Out/DBAndFinger.zip
        this._backupFixedZip = path.join(this.serial, this.UPDATE_DIR, this.BACKUP_FIXED_ZIP); // /1234/update/DB.zip
    }
    get configDir(): string {
        return this._configDir;
    }

    get outDir(): string {
        return this._outDir;
    }

    get backupFileZip(): string {
        return this._backupFileZip;
    }

    get backupWithFingerZip(): string {
        return this._backupWithFingerZip;
    }

    get backupFixedZip(): string {
        return this._backupFixedZip;
    }
}
