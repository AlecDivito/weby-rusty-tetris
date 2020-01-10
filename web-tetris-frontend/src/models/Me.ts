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

type Float = number;
type Integer = number;

/**
 * TODO: rank can be calculated at dynamically
 */

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

    @Field("me", true)
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

    public save(gameScore: number): Promise<boolean> {
        this.currency += Math.floor(gameScore / 10);
        this.totalScore += gameScore;
        this.rank = Math.floor(this.getRank(this.totalScore));
        return QueryService.GetInstance().save(this);
    }

    public calculatePercentToNextRank(additionalScore: Integer): Integer {
        const rank = this.getRank(this.totalScore + additionalScore);
        const currentRank = Math.floor(rank);
        if (currentRank > this.rank) {
            this.rank = currentRank;
        }
        return (rank - currentRank) * 100;
    }

    private getRank(score: Integer): Float {
        return Math.sqrt(0.0001 * score) + 0.0001 * score;
    }
}
