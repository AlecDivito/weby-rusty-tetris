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
        return new Settings(setting);
    }

    public static async Save(stats: Settings): Promise<boolean> {
        return await QueryService.GetInstance().save(stats);
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

    private constructor(setting?: ISettings) {
        this.sound = setting?.sound || true;
        this.music = setting?.music || true;
        this.notifications = setting?.notifications || true;
        this.vibration = setting?.vibration || true;
        this.musicVolume = setting?.musicVolume || 50;
        this.soundVolume = setting?.soundVolume || 50;
    }
}