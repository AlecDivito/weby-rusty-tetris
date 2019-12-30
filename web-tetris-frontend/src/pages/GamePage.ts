import Page from "./Page";
import { GetElementById } from "../util";
import StateManager from "../StateManager";
import Tetris, { TetrisConfig, TetrisEvent } from "../Tetris";
import PauseModal from "./PauseModal";
import { Game } from "../../../tetris-logic/pkg/rusty_web_tetris";
import { Settings } from "../models/Settings";

export default class GamePage extends Page {

    public static async Create(): Promise<GamePage> {
        const settings = await Settings.GetSettings();
        return new GamePage(settings);
    }

    private pauseBtn: HTMLButtonElement;

    private rightContentBar: HTMLElement;
    private mainContentBar: HTMLElement;
    private leftContentBar: HTMLElement;

    private game: Tetris;

    private constructor(settings: Settings) {
        super("game-page");
        this.pauseBtn = GetElementById("game-pause") as HTMLButtonElement;
        this.pauseBtn.addEventListener("click", this.pauseGame);

        this.rightContentBar = GetElementById("game__board__item--right");
        this.mainContentBar = GetElementById("game__board__item--main");
        this.leftContentBar = GetElementById("game__board__item--left");

        this.game = new Tetris(Game.new(), settings, this.CalculateTetrisConfig());
        this.game.addEventListener(TetrisEvent.GAME_OVER, this.recordGame);
    }

    public show() {
        this.rightContentBar.style.width = `${64}px`;
        this.leftContentBar.style.width = `${64}px`;
        if (!this.game.isGameOver) {
            this.game.play();
        }
        return super.show();
    }

    public hide() {
        super.hide();
        if (!this.game.isPaused && !this.game.isGameOver) {
            this.game.pause();
        }
    }

    public destroy() {
        super.destroy();
        this.pauseBtn.removeEventListener("click", this.pauseGame);
        this.game.destroy();
    }

    public pauseGame = () => {
        if (this.game.isRunning) {
            this.game.pause();
        }
        StateManager.GetInstance().Push(new PauseModal(), false);
    }

    private recordGame = () => {
        const record = this.game.getGameRecord();
        record.Save();
    }

    private CalculateTetrisConfig(): TetrisConfig {
        const width = document.documentElement.clientWidth - 8 * 4;

        let cellSize = (.70 * width) / 10;
        let previewCellSize = (.15 * width) / 4;

        if (cellSize > 35) {
            cellSize = 35;
        }
        if (previewCellSize > 15) {
            previewCellSize = 15;
        }

        return {
            gridColor: "#FFF",
            cellSize,
            previewCellSize
        };
    }

}
