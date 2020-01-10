import { IDBTable } from "../db/IDBTable";
import { Table } from "../db/Table";
import { Field } from "../db/Field";
import QueryService from "../db/QueryService";


export interface IMe {

    username: string;
    totalScore: number;
    rank: number;
    currency: number;

}

@Table("me")
export default class Me implements IMe, IDBTable {

    public static async GetMe(): Promise<Me> {
        const me = new Me();
        const realMe = await QueryService.GetInstance().getById(me, me.id);
        if (!realMe) {
            return me;
        }
        return realMe;
    }

    public readonly id: string = "me";

    public readonly tableName: string = "me";

    @Field("me")
    public username: string;

    @Field("me")
    public totalScore: number;

    @Field("me")
    public rank: number;

    @Field("me")
    public currency: number;

    private constructor() {
        this.username = "placeholder";
        this.totalScore = 0;
        this.rank = 0;
        this.currency = 0;
    }

    public save(): Promise<boolean> {
        return QueryService.GetInstance().save(this);
    }
}
