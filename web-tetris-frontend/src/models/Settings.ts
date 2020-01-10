import { IDBTable } from "../db/IDBTable";
import { Table } from "../db/Table";
import { Field } from "../db/Field";
import QueryService from "../db/QueryService";

export interface ISettings {
    sound: boolean;
    music: boolean;
    notifications: boolean;
    vibration: boolean;
    musicVolume: number;
    soundVolume: number;
}

@Table("settings")
export class Settings implements ISettings, IDBTable {

    public static async GetSettings(): Promise<Settings> {
        const type = new Settings();
        const setting = await QueryService.GetInstance().getById(type, type.id);
        if (!setting) {
            return type;
        }
        return setting;
    }

    public readonly tableName: string = "settings";

    @Field("settings", true)
    public readonly id: string = "settings";

    @Field("settings")
    public sound: boolean;

    @Field("settings")
    public music: boolean;

    @Field("settings")
    public notifications: boolean;

    @Field("settings")
    public vibration: boolean;

    @Field("settings")
    public musicVolume: number;

    @Field("settings")
    public soundVolume: number;

    private constructor() {
        this.sound = true;
        this.music = true;
        this.notifications = true;
        this.vibration = true;
        this.musicVolume = 50;
        this.soundVolume = 50;
    }

    public save(): Promise<boolean> {
        return QueryService.GetInstance().save(this);
    }
}
