import Page from "./Page";
import StateManager from "../StateManager";
import { GetElementById, randomInteger } from "../util";
import { getColor, getCells } from "../Tetris";
import { Cell } from "../../../tetris-logic/pkg/rusty_web_tetris";
import GamePage from "./GamePage";
import CustomizationPage from "./CustomizationPage";
import StatisticsPage from "./StatisticsPage";

interface IPiece {
    type: Cell;
    x: number;
    y: number;
    rotation: number;
    cells: Cell[];
}

export default class MainMenuPage extends Page {

    private playBtn: HTMLButtonElement;
    private customizeBtn: HTMLButtonElement;
    private statisticsBtn: HTMLButtonElement;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animationFrameId: number = 0;
    private pieces: IPiece[];

    constructor() {
        super("main-menu-page");
        this.playBtn = GetElementById("main-menu-play") as HTMLButtonElement;
        this.playBtn.addEventListener("click", this.playGame);
        this.canvas = GetElementById("main-menu-canvas") as HTMLCanvasElement;
        this.customizeBtn = GetElementById("main-menu-custom") as HTMLButtonElement;
        this.customizeBtn.addEventListener("click", this.customize);
        this.statisticsBtn = GetElementById("main-menu-stats") as HTMLButtonElement;
        this.statisticsBtn.addEventListener("click", this.statistics);

        const allCells = [ Cell.I, Cell.O, Cell.T, Cell.S, Cell.Z, Cell.J, Cell.L ];
        this.pieces = allCells.map( (type) => {
            const cells = getCells(type);
            const x = randomInteger(this.canvas.width);
            const y = randomInteger(this.canvas.height);
            const rotation = randomInteger(35, -35);
            return { type, x, y, cells, rotation };
        });

        this.canvas.width = window.innerWidth;
        this.ctx = this.canvas.getContext("2d")!;
        // this.animationFrameId = requestAnimationFrame(this.run);
    }

    public hide() {
        cancelAnimationFrame(this.animationFrameId);
        super.hide();
    }

    public destroy() {
        super.destroy();
        this.playBtn.removeEventListener("click", this.playGame);
        this.customizeBtn.removeEventListener("click", this.customize);
        this.statisticsBtn.removeEventListener("click", this.statistics);
    }

    private playGame = async () => {
        StateManager.GetInstance().Push(await GamePage.Create());
    }

    private customize = () => {
        StateManager.GetInstance().Push(new CustomizationPage());
    }

    private statistics = () => {
        StateManager.GetInstance().Push(new StatisticsPage());
    }

    private run = () => {
        this.pieces.forEach(({type, x, y, cells, rotation }) => {
            const cellSize = 20;
            this.ctx.fillStyle = getColor(type);
            cells.forEach( (cell) => {
                if (cell === Cell.EMPTY) {
                    return;
                }
                this.ctx.fillRect(
                    x * (cellSize + 1) + 1,
                    y * (cellSize + 1) + 1,
                    cellSize,
                    cellSize,
                );
            });
        });
        this.animationFrameId = requestAnimationFrame(this.run);
    }

    /**
     * Draw a cell at a certain row and column on the board
     * @param row row cell is on
     * @param col column cell is on
     */
    private drawCell({type, x, y, cells, rotation }: IPiece) {
        const cellSize = 20;
        this.ctx.fillStyle = getColor(type);
        cells.forEach( (cell) => {
            if (cell === Cell.EMPTY) {
                return;
            }
            this.ctx.fillRect(
                x * (cellSize + 1) + 1,
                y * (cellSize + 1) + 1,
                cellSize,
                cellSize,
            );
        });
    }
}
