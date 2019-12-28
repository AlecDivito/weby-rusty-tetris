
import StorageManager from "./StorageManager";

export function Field(tableName: string, isPrimary: boolean = false) {
    return (target: () => void, propertyName: string) => {
        StorageManager.GetInstance()
            .addField(tableName, propertyName, isPrimary);
    };
}
