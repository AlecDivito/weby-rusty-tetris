import StorageManager from "./StorageManager";

export function Table(name: string) {
    return (target: () => void) => {
        StorageManager.GetInstance().addTable(name);
    };
}
