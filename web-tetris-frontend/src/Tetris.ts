import { Cell, Game } from "../../tetris-logic/pkg/rusty_web_tetris";
import { memory } from "../../tetris-logic/pkg/rusty_web_tetris_bg";
import InputController from "./InputController";
import { GetElementById, toHHMMSS } from "./util";
import { Settings } from "./models/Settings";
import { isObject } from "util";
import GameRecord from "./models/GameRecord";

const DEBUG_GAME = false;
const CELL_PREVIEW_AMOUNT = 6;

type Color = string;

export interface TetrisConfig {
    gridColor: Color;
    cellSize: number;
    previewCellSize: number;
}
export enum TetrisEvent {
    GAME_OVER = 0,
}

type Callback = () => void;

/**
 * Tetris is a small layer that surrounds our tetris game logic in web assembly.
 * Tetris's only job is to run the main loop of the program and update the game
 * board as the state of the game changes
 *
 * Tetris is strongly linked to the index.html page and assumes certain span and
 * canvas elements will be there
 */
class Tetris {
    private tetrisGame: Game;
    private inputController: InputController;

    private callbackEvents: {[key in TetrisEvent]?: Callback[]} = {};

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly width: number;
    private readonly totalHeight: number;
    private readonly boardHeight: number;

    private animationId?: number = undefined;

    private config: TetrisConfig;
    private settings: Settings;

    /**
     * Is the game paused
     */
    get isPaused() {
        return this.animationId === undefined;
    }

    /**
     * Is the game running?
     */
    get isRunning() {
        return this.animationId !== undefined;
    }

    /**
     * Is the game over?
     */
    get isGameOver() {
        return this.tetrisGame.is_game_over();
    }

    /**
     * Get the height of the board
     */
    private get height() {
        let height = this.boardHeight;
        if (DEBUG_GAME) {
            height = this.totalHeight;
        }
        return height;
    }

    /**
     * Get the offset of the game board
     * (the board is 5 more cells higher then what is presided)
     */
    private get offsetHeight() {
        let offset = this.totalHeight - this.boardHeight;
        if (DEBUG_GAME) {
            offset = 0;
        }
        return offset;
    }

    /**
     * Create tetris
     * @param game tetris game logic
     * @param config settings that change the way the game looks
     */
    constructor(game: Game, settings: Settings, config: TetrisConfig) {
        this.tetrisGame = game;
        this.width = game.get_width();
        this.totalHeight = game.get_height();
        this.boardHeight = this.totalHeight - game.get_offset_height();
        this.canvas = GetElementById("tetris") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;
        this.config = config;
        this.settings = settings;
        this.canvas.height = (this.config.cellSize + 1) * this.height + 1;
        this.canvas.width = (this.config.cellSize + 1) * this.width + 1;

        /**
         * Initialize preview canvas
         *
         */
        const previewCanvas = GetElementById("preview") as HTMLCanvasElement;
        previewCanvas.height = this.config.previewCellSize * 4 * 6;
        previewCanvas.width = 64;

        /**
         * Initialize hold piece canvas
         *
         */
        const holdPiece = GetElementById("hold_piece") as HTMLCanvasElement;
        holdPiece.height = 64;
        holdPiece.width = 64;

        /**
         * Initialize Input Controls
         *
         */
        this.inputController = new InputController(this.canvas, holdPiece);
        this.inputController.start();
    }

    /***************************************************************************
     * Game State
     **************************************************************************/

    public getGameRecord(): GameRecord {
        const record = new GameRecord(
            "placeholder",
            this.tetrisGame.get_seconds(),
            this.tetrisGame.get_score(),
            this.tetrisGame.get_level(),
            this.tetrisGame.get_rows_completed(),
        );
        return record;
    }

    public addEventListener(event: TetrisEvent, callback: Callback) {
        if (!isObject(this.callbackEvents[event])) {
            this.callbackEvents[event] = [];
        }
        this.callbackEvents[event]!.push(callback);
    }


    /***************************************************************************
     * GAME LOGIC
     **************************************************************************/

    /**
     * Start tetris game
     */
    public startTetris() {
        this.updateQueuedPieces();
        this.play();
    }

    /**
     * Pause the game
     * Throws error when game is already paused
     */
    public pause() {
        if (this.isRunning) {
            cancelAnimationFrame(this.animationId!);
            this.animationId = undefined;
        } else {
            throw new Error("Can't pause the game when it is already paused");
        }
    }

    /**
     * Unpause the game
     * Throws error when game is already in play
     */
    public play() {
        if (this.isPaused) {
            this.animationId = requestAnimationFrame(this.run);
            this.updateQueuedPieces();
        } else {
            throw new Error("Can't play the game when it is already playing");
        }
    }

    public destroy() {
        this.inputController.stop();
    }

    /**
     * Main loop of the program, try to run and update the game at 60 fps
     */
    private run = () => {
        // stop run look if game becomes paused
        if (this.isGameOver && this.isRunning) {
            this.callbackEvents[TetrisEvent.GAME_OVER]?.forEach((cb) => cb());
            return;
        }

        // if (this.inputController.Input.Escape) {
        //     if (this.isRunning) {
        //         StateManager.GetInstance().GoToPauseModalAndPauseGame();
        //     } else {
        //         StateManager.GetInstance().GoToGameAndResumeGame()
        //     }
        // }
        // handle all the queued events on the input controller
        // tslint:disable-next-line: max-line-length
        const touchControls = this.inputController.getTouchGridArea(this.config.cellSize, this.tetrisGame.get_piece_bounding_box());
        if (touchControls) {
            this.tetrisGame.touch_event_handler(touchControls.x, touchControls.y);
        }
        this.tetrisGame.event_handler(this.inputController.getEventQueue());
        const boardMerged = this.tetrisGame.update(performance.now());
        this.drawGrid();
        this.drawCells();
        this.drawPiece();
        this.updateHoldPiece();
        GetElementById("game-time")!.textContent = toHHMMSS(this.tetrisGame.get_seconds());
        GetElementById("game-score")!.textContent = `score: ${this.tetrisGame.get_score()}`;

        // A piece was merged into the board
        if (boardMerged) {
            // update queued pieces view
            this.updateQueuedPieces();
            GetElementById("game-level")!.textContent = `${this.tetrisGame.get_level()}`;
            GetElementById("game-rows")!.textContent = `${this.tetrisGame.get_rows_completed()}`;
        }

        this.animationId = requestAnimationFrame(this.run);
    }

    /***************************************************************************
     * DRAW CODE
     **************************************************************************/

    /**
     * Draw the grid of the play field
     */
    private drawGrid() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.config.gridColor;

        // Vertical lines
        for (let i = 0; i <= this.width; i++) {
            this.ctx.moveTo(i * (this.config.cellSize + 1) + 1, 0);
            this.ctx.lineTo(
                i * (this.config.cellSize + 1) + 1,
                (this.config.cellSize + 1) * this.height + 1,
            );
        }

        // Horizontal lines
        for (let j = this.height; j >= 0; j--) {
            this.ctx.moveTo(this.offsetHeight, j * (this.config.cellSize + 1) + 1);
            this.ctx.lineTo(
                (this.config.cellSize + 1) * this.width + 1,
                j * (this.config.cellSize + 1) + 1,
            );
        }

        this.ctx.stroke();
    }

    /**
     * Draw all the cells of the game board
     */
    private drawCells() {
        const cellsPtr = this.tetrisGame.get_cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, this.width * this.totalHeight);
        this.ctx.beginPath();
        for (let row = this.offsetHeight; row < this.totalHeight; row++) {
            for (let col = 0; col < this.width; col++) {
                const index = this.getIndex(row, col);
                if (cells[index] === Cell.EMPTY && row < this.totalHeight - this.boardHeight) {
                    this.ctx.fillStyle = "#132456";
                } else {
                    this.ctx.fillStyle = getColor(cells[index]);
                }

                this.drawCell(row, col);
            }
        }

        if (DEBUG_GAME) {
            this.ctx.beginPath();
            for (let row = this.offsetHeight; row < this.totalHeight; row++) {
                for (let col = 0; col < this.width; col++) {
                    this.ctx.fillStyle = "red";
                    this.ctx.font = "14px Arial";
                    this.ctx.fillText(
                        `${this.getIndex(row, col)}`,
                        col * (this.config.cellSize + 1) + 1,
                        (row - this.offsetHeight) * (this.config.cellSize + 1) +
                            this.config.cellSize,
                    );
                }
            }
        }
    }

    /**
     * Draw player controller falling piece
     */
    private drawPiece() {
        const position = this.tetrisGame.get_piece_position();
        const shadowPiecePosition = this.tetrisGame.get_shadow_piece_position();
        const boundingBox = this.tetrisGame.get_piece_bounding_box();
        const cellsPtr = this.tetrisGame.get_pieces();
        const cellType = this.tetrisGame.get_piece_type();
        const cells = new Uint8Array(memory.buffer, cellsPtr, boundingBox * boundingBox);

        this.ctx.beginPath();
        for (let row = 0; row < boundingBox; row++) {
            for (let col = 0; col < boundingBox; col++) {
                const index = row * boundingBox + col;

                if (cells[index] !== Cell.EMPTY) {
                    this.ctx.fillStyle = getColor(cellType);
                    this.ctx.globalAlpha = 0.5;
                    this.drawCell(row + shadowPiecePosition.y, col + shadowPiecePosition.x);
                    this.ctx.globalAlpha = 1;
                    this.drawCell(row + position.y, col + position.x);
                }
            }
        }
    }

    /**
     * Get and update preview canvas's with the next queued pieces
     */
    private updateQueuedPieces() {
        const previewCanvas = GetElementById("preview") as HTMLCanvasElement;
        const context = previewCanvas.getContext("2d");
        if (!context) {
            return;
        }
        // Get the first 6 cells types (each cell is 1 byte)
        const queuedPieces = this.tetrisGame.get_queued_pieces();
        const cells = new Uint8Array(memory.buffer, queuedPieces, CELL_PREVIEW_AMOUNT);

        const minX = 0;
        let minY = 0;
        const maxX = previewCanvas.width;
        let maxY = previewCanvas.height;

        // draw in background
        context.fillStyle = "#000000";
        context.fillRect(0, 0, maxX, maxY * cells.length);

        cells.forEach((cell) => {
            // set the needed area to draw the cells on the preview canvas's
            let boundingBox = 3;
            if (cell === Cell.O) {
                boundingBox = 2;
            } else if (cell === Cell.I) {
                boundingBox = 4;
            }

            // draw the cell
            context.fillStyle = getColor(cell);
            const pieces = getCells(cell);
            for (let row = 0; row < boundingBox; row++) {
                for (let col = 0; col < boundingBox; col++) {
                    const i = row * boundingBox + col;
                    if (pieces[i] !== Cell.EMPTY) {
                        context.fillStyle = getColor(cell);
                    } else {
                        context.fillStyle = "#000000";
                    }
                    context.fillRect(
                        minX + (col * (this.config.previewCellSize + 1) + 1),
                        minY + (row * (this.config.previewCellSize + 1) + 1),
                        this.config.previewCellSize,
                        this.config.previewCellSize,
                    );
                }
            }
            minY += this.config.previewCellSize * 4;
            maxY += this.config.previewCellSize * 4;
        });
    }

    /**
     * Color in the piece that is currently being held
     */
    private updateHoldPiece() {
        const holdCanvas = GetElementById("hold_piece") as HTMLCanvasElement;
        const holdCell = this.tetrisGame.get_hold_piece();
        const context = holdCanvas.getContext("2d")!;
        // draw in background
        context.beginPath();
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 150, 150);

        let boundingBox = 3;
        if (holdCell === Cell.O) {
            boundingBox = 2;
        } else if (holdCell === Cell.I) {
            boundingBox = 4;
        }

        // piece
        const pieces = getCells(holdCell);
        context.beginPath();
        context.fillStyle = getColor(holdCell);
        for (let row = 0; row < boundingBox; row++) {
            for (let col = 0; col < boundingBox; col++) {
                const i = row * boundingBox + col;
                if (pieces[i] !== Cell.EMPTY) {
                    context.fillStyle = getColor(holdCell);
                } else {
                    context.fillStyle = "#000000";
                }
                context.fillRect(
                    col * (this.config.previewCellSize + 1) + 1,
                    row * (this.config.previewCellSize + 1) + 1,
                    this.config.previewCellSize,
                    this.config.previewCellSize,
                );
            }
        }

        context.stroke();
    }

    /**
     * Draw a cell at a certain row and column on the board
     * @param row row cell is on
     * @param col column cell is on
     */
    private drawCell(row: number, col: number) {
        this.ctx.fillRect(
            col * (this.config.cellSize + 1) + 1,
            (row - this.offsetHeight) * (this.config.cellSize + 1) + 1,
            this.config.cellSize,
            this.config.cellSize,
        );
    }

    /**
     * Get the index of a cell as if the 1D board was 2D
     * @param row y
     * @param col x
     */
    private getIndex(row: number, col: number) {
        return row * this.width + col;
    }
}

/**
 * Given the type of cell that needs coloring, return a hex color
 * @param cell type of cell
 */
export function getColor(cell: Cell): string {
    switch (cell) {
        case Cell.EMPTY:
            return "#000"; // black
        case Cell.I:
            return "#00FFFF"; // cyan
        case Cell.O:
            return "#FFFF00"; // yellow
        case Cell.T:
            return "#800080"; // purple
        case Cell.S:
            return "#00FF00"; // green
        case Cell.Z:
            return "#FF0000"; // Red
        case Cell.J:
            return "#0000FF"; // Blue
        case Cell.L:
            return "#FFA500"; // Orange
        default:
            return "#FFFFFF"; // white
    }
}

/**
 * Get array that makes up the cell on the grid
 * @param cell type of cell
 */
export function getCells(cell: Cell) {
    switch (cell) {
        case Cell.O:
            return [Cell.O, Cell.O,
                    Cell.O, Cell.O];
        case Cell.I:
            return [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY, Cell.EMPTY,
                    Cell.I,     Cell.I,     Cell.I,     Cell.I,
                    Cell.EMPTY, Cell.EMPTY, Cell.EMPTY, Cell.EMPTY,
                    Cell.EMPTY, Cell.EMPTY, Cell.EMPTY, Cell.EMPTY];
        case Cell.T:
            return [Cell.EMPTY, Cell.T, Cell.EMPTY,
                    Cell.T, Cell.T, Cell.T,
                    Cell.EMPTY, Cell.EMPTY, Cell.EMPTY];
        case Cell.S:
            return [Cell.EMPTY, Cell.S, Cell.S,
                    Cell.S, Cell.S, Cell.EMPTY,
                    Cell.EMPTY, Cell.EMPTY, Cell.EMPTY];
        case Cell.Z:
            return [Cell.Z, Cell.Z, Cell.EMPTY,
                    Cell.EMPTY, Cell.Z, Cell.Z,
                    Cell.EMPTY, Cell.EMPTY, Cell.EMPTY];
        case Cell.J:
            return [Cell.EMPTY, Cell.EMPTY, Cell.J,
                    Cell.J, Cell.J, Cell.J,
                    Cell.EMPTY, Cell.EMPTY, Cell.EMPTY];
        case Cell.L:
            return [Cell.L, Cell.EMPTY, Cell.EMPTY,
                    Cell.L, Cell.L, Cell.L,
                    Cell.EMPTY, Cell.EMPTY, Cell.EMPTY];
        default:
            return [Cell.EMPTY];
    }
}

export default Tetris;
