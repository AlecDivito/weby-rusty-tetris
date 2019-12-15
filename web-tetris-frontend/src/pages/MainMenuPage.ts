import Page from "./Page";
import StateManager from "..";
import { GetElementById } from "../util";

export default class MainMenuPage extends Page {

    private playBtn: HTMLButtonElement;

    constructor(router: StateManager) {
        super("main-menu-page", router);
        this.playBtn = GetElementById('main-menu-play') as HTMLButtonElement;
        this.playBtn.addEventListener('click', this.playGame);
    }

    playGame = () => {
        console.log('play game');
        this.router.GoToGame();
    }
}
