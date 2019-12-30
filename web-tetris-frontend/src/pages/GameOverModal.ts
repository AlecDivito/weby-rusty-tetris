import Page from "./Page";
import { GetElementById, GetChildElement, ClearAllHTMLChildren } from "../util";
import StateManager from "../StateManager";
import MainMenuPage from "./MainMenuPage";
import GamePage from "./GamePage";
import GameRecord from "../models/GameRecord";
import QueryService from "../db/QueryService";

enum HighScoreList {
    ME,
    FRIENDS,
}

export default class GameOverModal extends Page {

    private restartBtn: HTMLButtonElement;
    private exitGameBtn: HTMLButtonElement;
    private myHighScoresBtn: HTMLButtonElement;
    private myFriendsScoresBtn: HTMLButtonElement;

    private currentGameScore: HTMLDivElement;

    private highScoresList: HTMLUListElement

    private _highScoreListType: HighScoreList;
    private _currentScore?: GameRecord;
    private _highScores: GameRecord[];

    set currentScore(value: GameRecord) {
        this._currentScore = value;
    }

    constructor() {
        super("game-over-modal");
        this._highScoreListType = HighScoreList.ME;
        this._highScores = [];
        const temp = GetElementById("game-over-modal");
        this.highScoresList = GetChildElement(temp, ".game-over__list") as HTMLUListElement;

        this.currentGameScore = GetElementById("game-over-result") as HTMLDivElement;

        this.exitGameBtn = GetElementById("game-over-exit") as HTMLButtonElement;
        this.restartBtn = GetElementById("game-over-restart") as HTMLButtonElement;
        this.myHighScoresBtn = GetElementById("game-over-me") as HTMLButtonElement;
        this.myFriendsScoresBtn = GetElementById("game-over-friends") as HTMLButtonElement;
        this.exitGameBtn.addEventListener("click", this.exitGame);
        this.restartBtn.addEventListener("click", this.restartGame);
        this.myHighScoresBtn.addEventListener("click", this.fillListWithMyHighScores);
        this.myFriendsScoresBtn.addEventListener("click", this.fillListWithFriendsHighScores);
    }

    public async show(): Promise<boolean> {
        if (!this._currentScore) {
            console.assert("current score must be provided by pervious state");
        }
        ClearAllHTMLChildren(this.currentGameScore);
        this.currentGameScore.appendChild(this._currentScore!.createHTMLDiv());
        this.fillListWithMyHighScores();
        super.show();
        return false;
    }

    public destroy() {
        super.destroy();
        this.exitGameBtn.removeEventListener("click", this.exitGame);
        this.restartBtn.removeEventListener("click", this.restartGame);
        this.myHighScoresBtn.removeEventListener("click", this.fillListWithMyHighScores);
        this.myFriendsScoresBtn.removeEventListener("click", this.fillListWithFriendsHighScores);
    }

    private exitGame = () => {
        StateManager.GetInstance().ClearAndPush(new MainMenuPage());
    }

    private restartGame = async () => {
        StateManager.GetInstance().Pop();
        StateManager.GetInstance().Swap(await GamePage.Create());
    }

    private fillListWithMyHighScores = async () => {
        this._highScoreListType = HighScoreList.ME;
        const records = await QueryService.GetInstance().getAll(this._currentScore!);
        records.sort((a, b) => b.score - a.score);
        this._highScores = records.slice(0, 5);
        this.myHighScoresBtn.classList.add("selected");
        this.renderList();
    }

    private fillListWithFriendsHighScores = async () => {
        this._highScoreListType = HighScoreList.FRIENDS;
        this.renderList();
    }

    private renderList() {
        ClearAllHTMLChildren(this.highScoresList);
        if (this._highScores.length === 0) {
            console.log('empty list');
        } else {
            this._highScores
                .map((r) => r.createHtmlItem())
                .forEach((item) => this.highScoresList.appendChild(item));
        }
    }

}
