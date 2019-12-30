
import StorageManager from "./StorageManager";

export function Field(tableName: string, isPrimary: boolean = false) {
    return (target: any, propertyName: string) => {
        StorageManager.GetInstance()
            .addField(tableName, propertyName, isPrimary);
    };
}
