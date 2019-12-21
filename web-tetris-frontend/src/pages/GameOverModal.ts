import Page from "./Page";
import { GetElementById } from "../util";
import StateManager from "../StateManager";

export default class GameOverModal extends Page {
    
    private restartBtn: HTMLButtonElement;
    private exitGameBtn: HTMLButtonElement;

    constructor() {
        super("game-over-modal");
        this.exitGameBtn = GetElementById('game-over-exit') as HTMLButtonElement;
        this.restartBtn = GetElementById('game-over-restart') as HTMLButtonElement;
        this.exitGameBtn.addEventListener('click', this.exitGame);
        this.restartBtn.addEventListener('click', this.restartGame);
    }

    private exitGame = () => {
        console.log('exit current game');
        StateManager.GetInstance().GoToMainMenu();
    }

    private restartGame = () => {
        StateManager.GetInstance().GoToGameAndRestartGame();
    }

}
