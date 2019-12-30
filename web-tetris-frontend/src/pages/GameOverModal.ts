import Page from "./Page";
import { GetElementById } from "../util";
import StateManager from "../StateManager";
import MainMenuPage from "./MainMenuPage";
import GamePage from "./GamePage";

export default class GameOverModal extends Page {

    private restartBtn: HTMLButtonElement;
    private exitGameBtn: HTMLButtonElement;

    constructor() {
        super("game-over-modal");
        this.exitGameBtn = GetElementById("game-over-exit") as HTMLButtonElement;
        this.restartBtn = GetElementById("game-over-restart") as HTMLButtonElement;
        this.exitGameBtn.addEventListener("click", this.exitGame);
        this.restartBtn.addEventListener("click", this.restartGame);
    }

    public show(): boolean {
        super.show();
        return false;
    }

    public destroy() {
        super.destroy();
        this.exitGameBtn.removeEventListener("click", this.exitGame);
        this.restartBtn.removeEventListener("click", this.restartGame);
    }

    private exitGame = () => {
        StateManager.GetInstance().ClearAndPush(new MainMenuPage());
    }

    private restartGame = async () => {
        StateManager.GetInstance().Pop();
        StateManager.GetInstance().Swap(await GamePage.Create());
    }

}
