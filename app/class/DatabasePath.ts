import path from "path";
import fs from "fs";
import * as os from "node:os";


export class DatabasePath {
    protected readonly BASE_TEMP_DIR = "tempAmService";
    protected readonly CONFIG_DIR = "config";
    protected readonly UPDATE_DIR = "update";
    protected readonly BACKUP_ZIP = "DB.zip";
    protected readonly BACKUP_WITH_FINGER_ZIP = "DbAndFinger.zip";
    protected readonly BACKUP_NAMES = ["AndBk.s3db", "DbBackup.s3db", "AndBkFarma.s3db"];
    protected readonly BACKUP_RECOVERED_NAMES = ["AndDbTouch.s3db", "TouchBull.s3db"];
    protected readonly BACKUP_PROD_NAMES = ["ProdDbTouch.s3db", "DbProduct.s3db"];
    protected readonly BACKUP_FINGER_NAMES = ["fingerRead.db", "DbRFinger.db"];
    protected readonly DEFAULT_FINGER_DB_NAME = "DbRFinger.db";
    protected readonly DEFALULT_DB_NAME = "DbBackup.s3db";
    protected readonly _backupDir: string;
    protected readonly _backupFileZip: string;
    private _databaseUnzipped: string;
    protected readonly _databaseProductUnzipped: string;
    protected _databaseFingerUnzipped: string;
    protected readonly _databaseRecovered: string;
    protected readonly _databaseProductRecovered: string;
    protected readonly _databaseRecoveredZipped: string;
    protected readonly _databaseWithFingerZipped: string;
    protected readonly _defaultFingerDbPath: string;
    protected readonly _defaultDbPath: string;

    constructor(private serial: string, private backupName: string) {
        this._backupDir = this.create_backupDir(this.serial, this.backupName); ///tmp/tempAmService/1234/AndBk17    
        this._backupFileZip = path.join(this._backupDir, this.backupName); ///tmp/tempAmService/1234/AndBk17/AndBk17.zip
        this._databaseUnzipped = this.unzippedDbPath(this._backupDir); //tmp/tempAmService/1234/AndBk17/AndBk17.s3db
        this._databaseProductUnzipped = this.unzippedDbProdPath(this._backupDir); //tmp/tempAmService/1234/AndBk17/ProdDbTouch.s3db
        this._databaseFingerUnzipped = this.unzippedFingerDbPath(this._backupDir); //tmp/tempAmService/1234/AndBk17/fingerRead.db
        this._databaseRecovered = this.localRecoveredDBPath(this._backupDir, this._databaseUnzipped); //tmp/tempAmService/1234/AndBk17/AndDbTouch.s3db
        this._databaseProductRecovered = this.unzippedDbProdPath(this._backupDir); //tmp/tempAmService/1234/AndBk17/ProdDbTouch.s3db
        this._databaseRecoveredZipped = path.join(this._backupDir, this.BACKUP_ZIP); // tmp/tempAmService/1234/AndBk17/DB.zip
        this._databaseWithFingerZipped = path.join(this._backupDir, this.BACKUP_WITH_FINGER_ZIP); // tmp/tempAmService/1234/AndBk17/DBAndFinger.zip
        this._defaultFingerDbPath = path.join(this._backupDir, this.DEFAULT_FINGER_DB_NAME); // tmp/tempAmService/1234/AndBk17/DbRFinger.db
        this._defaultDbPath = path.join(this._backupDir, this.DEFALULT_DB_NAME); // tmp/tempAmService/1234/AndBk17/DbBackup.s3db
    }

    get backupDir(): string {
        return this._backupDir;
    }

    get backupFileZip(): string {
        return this._backupFileZip;
    }

    get databaseUnzipped(): string {
        return this._databaseUnzipped;
    }

    get databaseProductUnzipped(): string {
        return this._databaseProductUnzipped;
    }

    get databaseFingerUnzipped(): string {
        return this._databaseFingerUnzipped;
    }

    get databaseRecovered(): string {
        return this._databaseRecovered;
    }

    get databaseProductRecovered(): string {
        return this._databaseProductRecovered;
    }

    get databaseRecoveredZipped(): string {
        return this._databaseRecoveredZipped;
    }

    get databaseWithFingerZipped(): string {
        return this._databaseWithFingerZipped;
    }

    get defaultFingerDbPath(): string {
        return this._defaultFingerDbPath;
    }

    get defaultDbPath(): string {
        return this._defaultDbPath;
    }

    setDefaultFingerDbPath(fingerDbPath: string): void {
        this._databaseFingerUnzipped = fingerDbPath;
    }

    setDefaultDbPath( dbPath: string): void {
        this._databaseUnzipped = dbPath;
    }

    private create_backupDir(serial: string, backupName: string): string {
        const localPath = path.join(
            fs.realpathSync(os.tmpdir()),
            this.BASE_TEMP_DIR,
            serial,
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

    private unzippedDbPath(backupDir: string):string  {
        const files = fs.readdirSync(backupDir);
        let pathfile = "";
        for (const file of files) {
            if (this.BACKUP_NAMES.includes(file)) {
                pathfile = path.join(backupDir, file);
            }
        }
        return pathfile;
    }

    private unzippedDbProdPath(backupDir: string): string  {
        const files = fs.readdirSync(backupDir);
        let pathfile = "";
        for (const file of files) {
            if (this.BACKUP_PROD_NAMES.includes(file)) {
                pathfile =  path.join(backupDir, file);
            }
        }
        return pathfile;
    }

    private unzippedFingerDbPath(backupDir: string): string {
        const files = fs.readdirSync(backupDir);
        let pathfile = "";
        for (const file of files) {
            if (this.BACKUP_FINGER_NAMES.includes(file)) {
                pathfile = path.join(backupDir, file);
            }
        }
        return pathfile;
    }

    private localRecoveredDBPath(backupDir: string, databaseUnzippedPath: string): string {
        if ( databaseUnzippedPath.includes("AndBk") )
            return path.join(backupDir, "AndDbTouch.s3db");        
        if ( databaseUnzippedPath.includes("DbBackup") )
            return path.join(backupDir, "TouchBull.s3db");
        return "";
    }
}