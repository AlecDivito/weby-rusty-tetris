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

    private static instance: QueryService;

    private static GetInstance() {
        return QueryService.instance || (QueryService.instance = new QueryService());
    }

    private db: IQueryable<any>;

    private constructor() {
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
        return await this.db.save(object);
    }

    public async getAll<T extends IDBTable>(type: T, filter?: FilterFun<T>): Promise<T[]> {
        return await this.db.getAll(type, filter);
    }


    public async getById<T extends IDBTable>(type: T, id: string): Promise<T | undefined> {
        return await this.db.getById(type, id);
    }

}