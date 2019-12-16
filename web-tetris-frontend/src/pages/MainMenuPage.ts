import Page from "./Page";
import StateManager from "../StateManager";
import { GetElementById } from "../util";

export default class MainMenuPage extends Page {

    private playBtn: HTMLButtonElement;

    constructor() {
        super("main-menu-page");
        this.playBtn = GetElementById('main-menu-play') as HTMLButtonElement;
        this.playBtn.addEventListener('click', this.playGame);
    }

    playGame = () => {
        StateManager.GetInstance().GoToGameAndStartGame();
    }
}
