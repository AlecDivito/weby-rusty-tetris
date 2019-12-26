import Page from "./Page";
import StateManager from "../StateManager";
import { GetElementById } from "../util";

export default class MainMenuPage extends Page {

    private playBtn: HTMLButtonElement;
    private customizeBtn: HTMLButtonElement;
    private statisticsBtn: HTMLButtonElement;

    constructor() {
        super("main-menu-page");
        this.playBtn = GetElementById("main-menu-play") as HTMLButtonElement;
        this.playBtn.addEventListener("click", this.playGame);
        this.customizeBtn = GetElementById("main-menu-custom") as HTMLButtonElement;
        this.customizeBtn.addEventListener("click", this.customize);
        this.statisticsBtn = GetElementById("main-menu-stats") as HTMLButtonElement;
        this.statisticsBtn.addEventListener("click", this.statistics);
    }

    private playGame = () => {
        StateManager.GetInstance().GoToGameAndStartGame();
    }

    private customize = () => {
        StateManager.GetInstance().GoToCustomizePage();
    }

    private statistics = () => {
        StateManager.GetInstance().GoToStatisticsPage();
    }
}
