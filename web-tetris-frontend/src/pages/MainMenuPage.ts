import Page from "./Page";
import StateManager from "../StateManager";
import { GetElementById } from "../util";

export default class MainMenuPage extends Page {

    private playBtn: HTMLButtonElement;
    private darkModeBtn: HTMLButtonElement;

    constructor() {
        super("main-menu-page");
        this.playBtn = GetElementById('main-menu-play') as HTMLButtonElement;
        this.darkModeBtn = GetElementById('main-menu-dark-mode') as HTMLButtonElement;
        this.playBtn.addEventListener('click', this.playGame);
        this.darkModeBtn.addEventListener('click', this.darkMode);
        this.darkMode();
    }

    playGame = () => {
        StateManager.GetInstance().GoToGameAndStartGame();
    }

    darkMode = () => {
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
        if (!currentTheme || currentTheme !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); //add this
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); //add this
        } 
    }
}
