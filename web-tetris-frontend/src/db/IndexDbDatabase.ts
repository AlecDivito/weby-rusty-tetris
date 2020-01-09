import { IDBTable } from "./IDBTable";
import { IQueryable, FilterFun } from "./QueryService";
import StorageManager from "./StorageManager";

export default class IndexDbDatabase<T extends IDBTable> implements IQueryable<T> {

    private database?: IDBDatabase;

    public async connect(): Promise<boolean> {
        const db = await this.connection();
        if (!db) {
            console.warn("Couldn't connect to index database");
            return false;
        }
        const metaData = StorageManager.GetInstance().getMetaData();
        for (const meta of metaData) {
            if (!this.database!.objectStoreNames.contains(meta.table)) {
                // The database currently doesn't have our table in the database
                // increment the version and reopen the database
                const result = await this.refreshDatabase(meta.table);
                console.assert(result);
            }
        }
        return true;
    }

    public save(obj: T): Promise<boolean> {
        console.assert(this.database, "Database must be connected!");
        console.assert(this.database!.objectStoreNames.contains(obj.tableName),
            `Database should have table ${obj.tableName}`);
        const save: any = {};
        const metaData = StorageManager.GetInstance().getTableMetaData(obj.tableName);
        Object.keys(obj)
            .filter((key) => metaData!.fields.includes(key))
            .forEach((key) => save[key] = (obj as any)[key]);

        console.log(save);
        const request = this.database!
            .transaction(obj.tableName, "readwrite")
            .objectStore(obj.tableName)
            .put(save);

        return new Promise( (resolve, reject) => {
            request.onerror = (event) => {
                console.warn(event);
                reject(false);
            };
            request.onsuccess = (event) => {
                resolve(true);
            };
        });
    }

    public getAll(type: T, filter?: FilterFun<T>): Promise<T[]> {
        console.assert(this.database, "Database must be connected!");
        console.assert(this.database!.objectStoreNames.contains(type.tableName),
            `Database should have table ${type.tableName}`);

        const request = this.database!
            .transaction([type.tableName], "readonly")
            .objectStore(type.tableName)
            .openCursor();

        return new Promise( (resolve, reject) => {
            const data: T[] = [];

            request.onerror = (event) => {
                console.warn(event, `Error occurred while selecting from database ${type.tableName}`);
                reject(data);
            };

            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest).result;
                if (cursor) {
                    if (!filter || (filter && filter(cursor.value))) {
                        data.push(cursor.value);
                    }
                    cursor.continue();
                }
                if (!cursor) {
                    resolve(data);
                }
            };
        });
    }

    public getById(type: T, id: string): Promise<T | undefined> {
        console.assert(this.database, "Database must be connected!");
        console.assert(this.database!.objectStoreNames.contains(type.tableName),
            `Database should have table ${type.tableName}`);
        const request = this.database!
            .transaction([type.tableName], "readonly")
            .objectStore(type.tableName)
            .get(id);
        return new Promise((resolve, reject) => {
            request.onerror = (event) => {
                console.warn(`Could not find element ${id} from table ${type.tableName}`);
                reject(undefined);
            };

            request.onsuccess = (event) => {
                resolve(request.result);
            };
        });
    }

    private async connection(tableName?: string, version?: number): Promise<boolean> {
        const request = window.indexedDB.open(window.location.hostname, version);
        return new Promise((resolve, reject) => {
            request.onerror = (event: any) => {
                console.error("Database error: " + event.target?.errorCode);
                reject(false);
            };

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                // save the database
                const database: IDBDatabase = (event.target as any).result;
                // create an object store for this database
                let tableMetaData = [StorageManager.GetInstance().getTableMetaData(tableName!)!];
                if (!tableMetaData[0]) {
                    // probably creating the database
                    tableMetaData = StorageManager.GetInstance().getMetaData();
                }
                console.assert(tableMetaData[0], `Table metadata doesn't exist ${tableMetaData[0]}`);

                for (const metaData of tableMetaData) {
                    // create the table
                    const objectStore = database!.createObjectStore(metaData.table!, {
                        keyPath: metaData!.primaryKey!,
                        autoIncrement: false,
                    });

                    // create the columns
                    for (const field of metaData!.fields) {
                        if (field === metaData!.primaryKey) {
                            continue;
                        }
                        objectStore.createIndex(field, field, {
                            unique: false,
                        });
                    }
                }
                // TODO:
                // currently assuming everything went hunky dory
                // if this exits successfully, trigger onsuccess callback
            };

            request.onsuccess = (event: any) => {
                this.database = event.target.result;
                resolve(true);
            };
        });
    }

    private async refreshDatabase(tableName: string): Promise<boolean> {
        if (!this.database) {
            await this.connection(tableName);
        }
        const version = this.database!.version + 1;
        this.database!.close();
        return await this.connection(tableName, version);
    }
}
