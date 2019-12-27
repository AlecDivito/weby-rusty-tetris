import Page from "./Page";
import StateManager from "../StateManager";
import { GetElementById } from "../util";
import MainMenuPage from "./MainMenuPage";
import GamePage from "./GamePage";

export default class PauseModal extends Page {
    private resumeBtn: HTMLButtonElement;
    private restartBtn: HTMLButtonElement;
    private controlsBtn: HTMLButtonElement;
    private settingsBtn: HTMLButtonElement;
    private exitGameBtn: HTMLButtonElement;

    constructor() {
        super("pause-game-modal");

        this.resumeBtn = GetElementById("pause-game-resume") as HTMLButtonElement;
        this.restartBtn = GetElementById("pause-game-restart") as HTMLButtonElement;
        this.controlsBtn = GetElementById("pause-game-control") as HTMLButtonElement;
        this.settingsBtn = GetElementById("pause-game-setting") as HTMLButtonElement;
        this.exitGameBtn = GetElementById("pause-game-exit") as HTMLButtonElement;

        this.resumeBtn.addEventListener("click", this.resumeGame);
        this.restartBtn.addEventListener("click", this.restartGame);
        this.controlsBtn.addEventListener("click", this.controlPage);
        this.settingsBtn.addEventListener("click", this.settingPage);
        this.exitGameBtn.addEventListener("click", this.exitGame);
    }

    public show(): boolean {
        super.show();
        return false;
    }

    public destroy() {
        super.destroy();
        this.resumeBtn.removeEventListener("click", this.resumeGame);
        this.restartBtn.removeEventListener("click", this.restartGame);
        this.controlsBtn.removeEventListener("click", this.controlPage);
        this.settingsBtn.removeEventListener("click", this.settingPage);
        this.exitGameBtn.removeEventListener("click", this.exitGame);
    }

    private resumeGame = () => {
        StateManager.GetInstance().Pop();
    }

    private restartGame = () => {
        StateManager.GetInstance().Pop();
        StateManager.GetInstance().Swap(new GamePage());
    }

    private controlPage = () => {
        throw new Error("TODO: implement control Page Button");
    }

    private settingPage = () => {
        throw new Error("TODO: implement settings page button");
    }

    private exitGame = () => {
        StateManager.GetInstance().ClearAndPush(new MainMenuPage());
    }
}
