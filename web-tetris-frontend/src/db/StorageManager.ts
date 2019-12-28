interface ITableMetaData {
    table: string;
    primaryKey?: string;
    fields: string[];
}

export default class StorageManager {

    public static GetInstance() {
        return StorageManager.instance || (StorageManager.instance = new StorageManager());
    }

    private static instance: StorageManager;

    private storage: ITableMetaData[];

    private tableQueue: Array<{
        primaryKey: boolean,
        table: string;
        field: string;
    }>;

    private constructor() {
        this.storage = [];
        this.tableQueue = [];
    }

    public addTable(table: string) {
        const fields = this.tableQueue
            .filter((item) => item.table === table)
            .map((item) => item.field);
        const keys = this.tableQueue
            .filter((item) => item.primaryKey)
            .filter((item) => item.table === table);
        let primaryKey;
        if (keys[0]) {
            primaryKey = keys[0].field;
        }
        const record = { table, fields, primaryKey };
        this.storage.push(record);
    }

    public addField(table: string, field: string, isPrimary: boolean) {
        const item = this.storage.find((o) => o.table === table);
        if (item !== undefined) {
            item.fields.push(field);
        } else {
            this.tableQueue.push({ table, field, primaryKey: isPrimary});
        }
    }

    public getPrimaryKey(table: string): string | undefined {
        const metaData = this.storage.find((s) => s.table === table);
        if (!metaData) {
            return undefined;
        }
        if (!metaData.primaryKey) {
            return undefined;
        }
        return metaData.primaryKey;
    }

    public getMetaData(): ITableMetaData[] {
        return this.storage;
    }

    public getTableMetaData(table: string): ITableMetaData | undefined {
        return this.storage.find((s) => s.table === table);
    }
}
