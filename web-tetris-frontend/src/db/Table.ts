import StorageManager from "./StorageManager";

export function Table(name: string) {
    // tslint:disable-next-line: ban-types
    return (target: Function) => {
        StorageManager.GetInstance().addTable(name);
    };
}
