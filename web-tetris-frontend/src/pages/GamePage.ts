import Page from "./Page";
import { GetElementById } from "../util";
import StateManager from "../StateManager";

export default class GamePage extends Page {
    
    private pauseBtn: HTMLButtonElement;

    constructor() {
        super('game-page');
        this.pauseBtn = GetElementById('game-pause') as HTMLButtonElement;
        this.pauseBtn.addEventListener('click', this.pauseGame);
    }

    public show(): void {
        this.parentElement.style.display = 'grid';
    }

    pauseGame = () => {
        StateManager.GetInstance().GoToPauseModalAndPauseGame();
    }
}
