import Page from "./Page";
import { GetElementById } from "../util";
import StateManager from "../StateManager";
import Tetris, { TetrisConfig } from "../Tetris";
import PauseModal from "./PauseModal";
import { Game } from "../../../tetris-logic/pkg/rusty_web_tetris";

export default class GamePage extends Page {

    private pauseBtn: HTMLButtonElement;

    private rightContentBar: HTMLElement;
    private mainContentBar: HTMLElement;
    private leftContentBar: HTMLElement;

    private game: Tetris;

    constructor() {
        super("game-page");
        this.pauseBtn = GetElementById("game-pause") as HTMLButtonElement;
        this.pauseBtn.addEventListener("click", this.pauseGame);

        this.rightContentBar = GetElementById("game__board__item--right");
        this.mainContentBar = GetElementById("game__board__item--main");
        this.leftContentBar = GetElementById("game__board__item--left");

        this.game = new Tetris(Game.new(), this.CalculateTetrisConfig());
    }

    public show() {
        const padding = 8 * 4;
        const width = document.documentElement.clientWidth - padding;

        const mainWidth = .70 * width;
        const sideWidth = .15 * width;

        this.rightContentBar.style.width = `${sideWidth}px`;
        this.leftContentBar.style.width = `${sideWidth}px`;
        this.mainContentBar.style.width = `${mainWidth}px`;
        this.game.play();
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
        this.game.pause();
        StateManager.GetInstance().Push(new PauseModal(), false);
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
