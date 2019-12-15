import Page from "./Page";
import StateManager from "..";
import { GetElementById } from "../util";

export default class GamePage extends Page {
    
    private pauseBtn: HTMLButtonElement;

    constructor(router: StateManager) {
        super('game-page', router);
        this.pauseBtn = GetElementById('game-pause') as HTMLButtonElement;
        this.pauseBtn.addEventListener('click', this.pauseGame);
    }

    public show(): void {
        this.parentElement.style.display = 'grid';
    }

    pauseGame = () => {
        this.router.GoToPauseGameModal();
    }
}
