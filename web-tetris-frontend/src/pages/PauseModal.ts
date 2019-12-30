import Page from "./Page";
import StateManager from "../StateManager";
import { GetElementById } from "../util";
import MainMenuPage from "./MainMenuPage";
import GamePage from "./GamePage";
import SettingsPage from "./SettingsPage";
import CustomizationPage from "./CustomizationPage";

export default class PauseModal extends Page {
    private resumeBtn: HTMLButtonElement;
    private restartBtn: HTMLButtonElement;
    private customizeBtn: HTMLButtonElement;
    private settingsBtn: HTMLButtonElement;
    private exitGameBtn: HTMLButtonElement;

    constructor() {
        super("pause-game-modal");

        this.resumeBtn = GetElementById("pause-game-resume") as HTMLButtonElement;
        this.restartBtn = GetElementById("pause-game-restart") as HTMLButtonElement;
        this.customizeBtn = GetElementById("pause-game-customize") as HTMLButtonElement;
        this.settingsBtn = GetElementById("pause-game-setting") as HTMLButtonElement;
        this.exitGameBtn = GetElementById("pause-game-exit") as HTMLButtonElement;

        this.resumeBtn.addEventListener("click", this.resumeGame);
        this.restartBtn.addEventListener("click", this.restartGame);
        this.customizeBtn.addEventListener("click", this.customizePage);
        this.settingsBtn.addEventListener("click", this.settingPage);
        this.exitGameBtn.addEventListener("click", this.exitGame);
    }
    public show(): Promise<boolean> {
        super.show();
        return Promise.resolve(false);
    }

    public destroy() {
        super.destroy();
        this.resumeBtn.removeEventListener("click", this.resumeGame);
        this.restartBtn.removeEventListener("click", this.restartGame);
        this.customizeBtn.removeEventListener("click", this.customizePage);
        this.settingsBtn.removeEventListener("click", this.settingPage);
        this.exitGameBtn.removeEventListener("click", this.exitGame);
    }

    private resumeGame = () => {
        StateManager.GetInstance().Pop();
    }

    private restartGame = async () => {
        StateManager.GetInstance().Pop();
        StateManager.GetInstance().Swap(await GamePage.Create());
    }

    private customizePage = () => {
        StateManager.GetInstance().Push(new CustomizationPage());
    }

    private settingPage = () => {
        StateManager.GetInstance().Push(new SettingsPage());
    }

    private exitGame = () => {
        StateManager.GetInstance().ClearAndPush(new MainMenuPage());
    }
}
