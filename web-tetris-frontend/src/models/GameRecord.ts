import { IDBTable } from "../db/IDBTable";
import { Table } from "../db/Table";
import { Field } from "../db/Field";
import { uuid } from "../util";
import QueryService from "../db/QueryService";

export interface IGameRecord {
    id: string;
    username: string;
    seconds: number;
    score: number;
    level: number;
    rows: number;
}

@Table("game_record")
export default class GameRecord implements IGameRecord, IDBTable {

    public readonly tableName: string = "game_record";

    @Field("game_record", true)
    public readonly id: string;

    @Field("game_record")
    public username: string;

    @Field("game_record")
    public seconds: number;

    @Field("game_record")
    public score: number;

    @Field("game_record")
    public level: number;

    @Field("game_record")
    public rows: number;

    constructor(username: string, seconds: number, score: number, level: number, rows: number) {
        this.id = uuid();
        this.username = username;
        this.seconds = seconds;
        this.score = score;
        this.level = level;
        this.rows = rows;
    }

    public async Save() {
        const result = await QueryService.GetInstance().save(this);
        console.assert(result, "Game record wasn't successfully saved");
    }

}
