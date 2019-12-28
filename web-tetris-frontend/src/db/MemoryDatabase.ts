import { IDBTable } from "./IDBTable";
import { IQueryable, FilterFun } from "./QueryService";
import { isObject } from "util";

export default class MemoryDatabase<T extends IDBTable> implements IQueryable<T> {

    private memoryDb: any = {};

    public connect(): Promise<boolean> {
        return Promise.resolve(true);
    }
    public save(obj: T): Promise<boolean> {
        if (!isObject(this.memoryDb[obj.tableName])) {
            this.memoryDb[obj.tableName] = {};
        }
        this.memoryDb[obj.tableName][obj.id] = obj;
        return Promise.resolve(true);
    }

    public getAll(type: T, filter?: FilterFun<T> | undefined): Promise<T[]> {
        if (!isObject(this.memoryDb[type.tableName])) {
            return Promise.resolve([]);
        }
        const list = Object.keys(this.memoryDb[type.tableName])
            .map((id) => this.memoryDb[type.tableName][id])
            .filter((t) => (filter) ? filter(t) : true);
        return Promise.resolve(list);
    }

    public getById(type: T, id: string): Promise<T | undefined> {
        if (!isObject(this.memoryDb[type.tableName])) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(this.memoryDb[type.tableName][id]);
    }
}
