import path from "path";
import fs from "fs";
import * as os from "node:os";


export class DatabasePath {
    protected readonly BASE_TEMP_DIR = "tempAmService";
    protected readonly CONFIG_DIR = "config";
    protected readonly UPDATE_DIR = "update";
    protected readonly _remoteConfigDir: string;
    protected readonly _remoteUploadFIleName: string;
    protected readonly _remoteDb: string | undefined;
    protected readonly _localDirectory: string | undefined;
    protected readonly _localZippedDb: string | undefined;
    private readonly _localUnzippedDB: string | undefined;
    protected readonly _localUnzippedProdDb: string | undefined;
    protected readonly _localUnzippedFingerDb: string | undefined;
    protected readonly _localRecoveredDb: string | undefined;
    protected readonly _localRecoveredZippedDb: string | undefined ;

    constructor(private matricola: string, private backupName: string | undefined) {
        this._remoteConfigDir = this.remoteConfigPath;
        this._remoteUploadFIleName = this.remoteUploadPathFile;

        if (this.backupName !== undefined) {
            this._remoteDb = path.join(this.remoteConfigPath, this.backupName);
            this._localDirectory = this.localBasePath(this.backupName);
            this._localZippedDb = path.join(this._localDirectory, this.backupName);
            this._localUnzippedDB = this.unzippedDbPath;
            this._localUnzippedProdDb = this.unzippedDbProdPath;
            this._localUnzippedFingerDb = this.unzippedFingerDbPath;
            this._localRecoveredDb = this.localRecoveredDBPath;
            this._localRecoveredZippedDb = path.join(this._localDirectory, "DB.zip");
                // path.join(this._localDirectory, "DB.zip");
        }

    }

    get remoteConfigDir(): string {
        return this._remoteConfigDir;
    }
    get remoteUploadFIleName(): string {
        return this._remoteUploadFIleName;
    }

    get remoteDb(): string | undefined {
        return this._remoteDb;
    }

    get localDirectory(): string | undefined {
        return this._localDirectory;
    }

    get localZippedDb(): string | undefined {
        return this._localZippedDb;
    }

    get localUnzippedDb(): string | undefined {
        return this._localUnzippedDB;
    }

    get localUnzippedProdDb(): string | undefined {
        return this._localUnzippedProdDb;
    }
    get localUnzippedFingerDb(): string | undefined {
        return this._localUnzippedFingerDb;
    }

    get localRecoveredDb(): string | undefined {
        return this._localRecoveredDb;
    }

    private get remoteConfigPath(): string {
        return path.join(this.matricola, this.CONFIG_DIR);
    }

    get remoteUploadPathFile(): string {
        return path.join(this.matricola, this.UPDATE_DIR, "DB.zip");
    }

    get localRecoveredZippedDb(): string | undefined {
        return this._localRecoveredZippedDb;
    }

    private localBasePath(backupName: string): string {
        const localPath = path.join(
            fs.realpathSync(os.tmpdir()),
            this.BASE_TEMP_DIR,
            this.matricola,
            path.parse(backupName).name
        );

        if ( !fs.existsSync(localPath)) {
            try {
                if (!fs.existsSync(localPath)) {
                    fs.mkdirSync(localPath, { recursive: true }); // <-- Usa la versione sincrona
                }
            } catch (error) {
                throw error;
            }
        }

        return localPath;
    }

    private get unzippedDbPath(): string | undefined {
        if (!this._localDirectory || !fs.existsSync(this._localDirectory)){
            return undefined;
        }

        const files = fs.readdirSync(this._localDirectory);
        if (!files || files.length === 0) {
            return undefined;
        }

        const backupFiles = ["AndBk.s3db", "DbBackup.s3db", "AndBkFarma.s3db"];
        for (const file of files) {
            if (backupFiles.includes(file)) {
                return path.join(this._localDirectory, file);
            }
        }
        return undefined;
    }

    private get unzippedDbProdPath(): string | undefined {
        if (this._localDirectory === undefined){
            return undefined;
        }

        const files = fs.readdirSync(this._localDirectory);
        if (!files || files.length === 0) {
            return undefined;
        }

        const backupFiles = ["ProdDbTouch.s3db", "TouchBull.s3db"];
        for (const file of files) {
            if (backupFiles.includes(file)) {
                return path.join(this._localDirectory, file);
            }
        }

        return undefined;
    }

    private get unzippedFingerDbPath(): string | undefined {
        if (this._localDirectory === undefined)
            return undefined;

        const files = fs.readdirSync(this._localDirectory);
        if (!files || files.length === 0) {
            return undefined;
        }

        const backupFiles = ["fingerRead.db", "DbRFinger.db"];
        for (const file of files) {
            if (backupFiles.includes(file)) {
                return path.join(this._localDirectory, file);
            }
        }
        return undefined;
    }

    private get localRecoveredDBPath(): string | undefined {
        if (this._localDirectory === undefined)
            return undefined;

        if ( this._localUnzippedDB?.includes("AndBk") )
            return path.join(this._localDirectory, "AndDbTouch.s3db");
        else if ( this._localUnzippedDB?.includes("DbBackup") )
                return path.join(this._localDirectory, "TouchBull.s3db");
        else
            return undefined;
    }
}