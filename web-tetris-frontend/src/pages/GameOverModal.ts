import Page from "./Page";
import StateManager from "..";
import { GetElementById } from "../util";

export default class GameOverModal extends Page {
    
    private restartBtn: HTMLButtonElement;
    private exitGameBtn: HTMLButtonElement;

    constructor(router: StateManager) {
        super("game-over-modal", router);
        this.restartBtn = GetElementById('pause-game-restart') as HTMLButtonElement;
        this.exitGameBtn = GetElementById('pause-game-exit') as HTMLButtonElement;
        this.restartBtn.addEventListener('click', this.restartGame);
        this.exitGameBtn.addEventListener('click', this.exitGame);
    }

    private restartGame = () => {
        throw new Error("TODO: implement restart Game Button");
    }

    private exitGame = () => {
        throw new Error("TODO: implement exit page button");
    }
}
