import { IDBTable } from "./IDBTable";
import IndexDbDatabase from "./IndexDbDatabase";
import MemoryDatabase from "./MemoryDatabase";

export type FilterFun<T extends IDBTable> = (record: T) => boolean;

export interface IQueryable<T extends IDBTable> {
    connect(): Promise<boolean>;
    save(obj: T): Promise<boolean>;
    getAll(type: T, filter?: FilterFun<T>): Promise<T[]>;
    getById(type: T, id: string): Promise<T | undefined>;
}

export default class QueryService {

    public static GetInstance() {
        return QueryService.instance || (QueryService.instance = new QueryService());
    }

    private static instance: QueryService;

    private db: IQueryable<any>;
    private isConnected: boolean;

    private constructor() {
        this.isConnected = false;
        this.db = (window.indexedDB) ? new IndexDbDatabase()
            : new MemoryDatabase();
    }

    public async connect(): Promise<boolean> {
        const result = await this.db.connect();
        if (!result && this.db instanceof IndexDbDatabase) {
            console.log("Couldn't create IndexDB database, setting up in-memory database");
            this.db = new MemoryDatabase();
        }
        return true;
    }

    public async save<T extends IDBTable>(object: T): Promise<boolean> {
        if (!this.isConnected) {
            await this.connect();
        }
        return await this.db.save(object);
    }

    public async getAll<T extends IDBTable>(type: T, filter?: FilterFun<T>): Promise<T[]> {
        if (!this.isConnected) {
            await this.connect();
        }
        const data = await this.db.getAll(type, filter);
        return data.map((item) => Object.create(type, this.makePropertiesObj(item)));
    }

    public async getById<T extends IDBTable>(type: T, id: string): Promise<T | undefined> {
        if (!this.isConnected) {
            await this.connect();
        }
        const data = await this.db.getById(type, id);
        if (data) {
            return Object.create(type, this.makePropertiesObj(data));
        }
        return data;
    }

    // Customize this if you don't want the default settings on the properties object.
    private makePropertiesObj(obj: any): any {
        return Object.keys(obj).reduce((propertiesObj: any, currentKey: any) => {
            propertiesObj[currentKey] = {
                value: obj[currentKey],
                writable: true,
                enumerable: true,
            };
            return propertiesObj;
        }, {}); // The object passed in is the propertiesObj in the callback
    }
}
