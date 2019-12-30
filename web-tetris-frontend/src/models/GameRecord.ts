import { IDBTable } from "../db/IDBTable";
import { Table } from "../db/Table";
import { Field } from "../db/Field";
import { uuid, toHHMMSS } from "../util";
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

    @Field("game_record")
    public createdAt: Date;

    constructor(username: string, seconds: number, score: number, level: number, rows: number) {
        this.id = uuid();
        this.username = username;
        this.seconds = seconds;
        this.score = score;
        this.level = level;
        this.rows = rows;
        this.createdAt = new Date();
    }

    public async Save() {
        const result = await QueryService.GetInstance().save(this);
        console.assert(result, "Game record wasn't successfully saved");
    }

    public createHtmlItem(): HTMLLIElement {
        const item = document.createElement("li");
        item.classList.add("game-record");
        this.addHTMLSpan(item);
        return item;
    }

    public createHTMLDiv(): HTMLDivElement {
        const item = document.createElement("div");
        item.classList.add("game-record");
        this.addHTMLSpan(item);
        return item;
    }

    private addHTMLSpan(item: HTMLElement): void {
        [this.score, this.level, this.rows, this.seconds].forEach((val, i) => {
            const span = document.createElement("span");
            if (i === 3) {
                span.textContent = toHHMMSS(val);
            } else {
                span.textContent = `${val}`;
            }
            item.appendChild(span);
        });
    }

}
