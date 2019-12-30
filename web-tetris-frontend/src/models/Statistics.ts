import { IDBTable } from "../db/IDBTable";
import { Table } from "../db/Table";
import { Field } from "../db/Field";
import QueryService from "../db/QueryService";

export interface IStatistics {
    gamesPlayed: number;
    longestGameTime: number;
    averageTime: number;
    totalTimePlayed: number;
    highestLevelReached: number;
    mostRowsCompleted: number;
}

@Table("stats")
export class Statistics implements IStatistics, IDBTable {

    public static async GetStats(): Promise<Statistics> {
        const type = new Statistics();
        const stats = await QueryService.GetInstance().getById(type, type.id);
        if (!stats) {
            return type;
        }
        return new Statistics(stats);
    }

    public static async Save(stats: Statistics): Promise<boolean> {
        return await QueryService.GetInstance().save(stats);
    }

    public readonly tableName: string = "stats";

    @Field("stats", true)
    public readonly id: string = "statistics";

    @Field("stats")
    public gamesPlayed: number;

    @Field("stats")
    public longestGameTime: number;

    @Field("stats")
    public averageTime: number;

    @Field("stats")
    public totalTimePlayed: number;

    @Field("stats")
    public highestLevelReached: number;

    @Field("stats")
    public mostRowsCompleted: number ;

    private constructor(statistic?: IStatistics) {
        this.gamesPlayed = statistic?.gamesPlayed || 0;
        this.longestGameTime = statistic?.longestGameTime || 0;
        this.averageTime = statistic?.averageTime || 0;
        this.totalTimePlayed = statistic?.totalTimePlayed || 0;
        this.highestLevelReached = statistic?.highestLevelReached || 0;
        this.mostRowsCompleted = statistic?.mostRowsCompleted || 0;
    }

}
