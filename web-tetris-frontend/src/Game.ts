import { Cell, Tetris, Action } from "rusty-web-tetris";
import { memory } from "rusty-web-tetris/rusty_web_tetris_bg";
import InputController from "./InputController";

const DEBUG_GAME = false;

class Game {

    private tetris: Tetris;
    private inputController: InputController;

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly width: number;
    private readonly totalHeight: number;
    private readonly boardHeight: number;

    private animationId?: number = undefined;

    private config: any = {
        gridColor: "#fff",
        cellSize: 35,
    };

    get isPaused() {
        return this.animationId === undefined;
    }

    get isRunning() {
        return this.animationId !== undefined;
    }

    private get height() {
        let height = this.boardHeight;
        if (DEBUG_GAME) {
            height = this.totalHeight;
        }
        return height;
    }

    private get offsetHeight() {
        let offset = this.totalHeight - this.boardHeight;
        if (DEBUG_GAME) {
            offset = 0;
        }
        return offset;
    }

    constructor(tetris: Tetris, config: {} = {}) {
        this.tetris = tetris;
        this.width = tetris.get_width();
        this.totalHeight = tetris.get_height();
        this.boardHeight = this.totalHeight - tetris.get_offset_height();
        this.canvas = document.getElementById("tetris") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;
        this.config = { ...this.config, ...config };
        this.canvas.height = (this.config.cellSize + 1) * this.height + 1;
        this.canvas.width = (this.config.cellSize + 1) * this.width + 1;
        this.inputController = new InputController();
        this.inputController.start();
    }

    public startGame() {
        this.updateQueuedPieces();
        this.play();
    }

    private pause() {
        if (this.isRunning) {
            cancelAnimationFrame(this.animationId!);
            this.animationId = undefined;
        } else {
            throw new Error("Can't pause the game when it is already paused");
        }
    }

    private play() {
        if (this.isPaused) {
            this.animationId = requestAnimationFrame(this.run);
        } else {
            throw new Error("Can't play the game when it is already playing");
        }
    }

    private run = () => {
        if (this.inputController.Input.Escape) {
            if (this.isRunning) {
                this.pause();
            } else {
                this.play();
            }
        }
        this.tetris.event_handler(this.inputController.getEventQueue());
        const boardMerged = this.tetris.update(performance.now());
        this.drawGrid();
        this.drawCells();
        this.drawPiece();
        this.updateHoldPiece();
        document.getElementById("score")!.textContent = `${this.tetris.get_score()}`;

        if (boardMerged) {
            // update queued pieces view
            this.updateQueuedPieces();
            document.getElementById("level")!.textContent = `${this.tetris.get_level()}`;
            document.getElementById("rows_completed")!.textContent = `${this.tetris.get_rows_completed()}`;
        }

        this.animationId = requestAnimationFrame(this.run);
    }

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

    private drawCells() {
        const cellsPtr = this.tetris.get_cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, this.width * this.totalHeight);
        this.ctx.beginPath();
        for (let row = this.offsetHeight; row < this.totalHeight; row++) {
            for (let col = 0; col < this.width; col++) {
                const index = this.getIndex(row, col);
                if (cells[index] === Cell.EMPTY && row < this.totalHeight - this.boardHeight) {
                    this.ctx.fillStyle = "#132456";
                } else {
                    this.ctx.fillStyle = this.getColor(cells[index]);
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
                    this.ctx.fillText(`${this.getIndex(row, col)}`,
                        col * (this.config.cellSize + 1) + 1,
                        (row - this.offsetHeight) * (this.config.cellSize + 1) + this.config.cellSize,
                    );
                }
            }
        }
    }

    private drawPiece() {
        const position = this.tetris.get_piece_position();
        const shadowPiecePosition = this.tetris.get_shadow_piece_position();
        const boundingBox = this.tetris.get_piece_bounding_box();
        const cellsPtr = this.tetris.get_pieces();
        const cellType = this.tetris.get_piece_type();
        const cells = new Uint8Array(memory.buffer, cellsPtr, boundingBox * boundingBox);

        this.ctx.beginPath();
        for (let row = 0; row < boundingBox; row++) {
            for (let col = 0; col < boundingBox; col++) {
                const index = row * boundingBox + col;

                if (cells[index] !== Cell.EMPTY) {
                    this.ctx.fillStyle = this.getColor(cellType);
                    this.ctx.globalAlpha = 0.5;
                    this.drawCell(row + shadowPiecePosition.y, col + shadowPiecePosition.x);
                    this.ctx.globalAlpha = 1;
                    this.drawCell(row + position.y, col + position.x);
                }
            }
        }
    }

    private updateQueuedPieces() {
        const previews: NodeListOf<HTMLCanvasElement> = document.querySelectorAll(".preview");
        const queuedPieces = this.tetris.get_queued_pieces();
        const cells = new Uint8Array(memory.buffer, queuedPieces, 6);
        previews.forEach( (canvas, index) => {
            const context = canvas.getContext("2d")!;
            const cell = cells[index];

            // draw in background
            context.beginPath();
            context.fillStyle = "#000000";
            context.fillRect(0, 0, 150, 150);

            let boundingBox = 3;
            if (cell === Cell.O) {
                boundingBox = 2;
            } else if (cell === Cell.I) {
                boundingBox = 4;
            }

            // piece
            const pieces = getCells(cell);
            context.beginPath();
            context.fillStyle = this.getColor(cell);
            for (let row = 0; row < boundingBox; row++) {
                for (let col = 0; col < boundingBox; col++) {
                    const i = row * boundingBox + col;
                    if (pieces[i] !== Cell.EMPTY) {
                        context.fillStyle = this.getColor(cell);
                    } else {
                        context.fillStyle = "#000000";
                    }
                    context.fillRect(
                        col * (this.config.cellSize + 1) + 1,
                        row * (this.config.cellSize + 1) + 1,
                        this.config.cellSize,
                        this.config.cellSize,
                    );
                }
            }

            context.stroke();
        });
    }

    private updateHoldPiece() {
        const holdCanvas = document.getElementById("hold_piece") as HTMLCanvasElement;
        const holdCell = this.tetris.get_hold_piece();
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
        context.fillStyle = this.getColor(holdCell);
        for (let row = 0; row < boundingBox; row++) {
            for (let col = 0; col < boundingBox; col++) {
                const i = row * boundingBox + col;
                if (pieces[i] !== Cell.EMPTY) {
                    context.fillStyle = this.getColor(holdCell);
                } else {
                    context.fillStyle = "#000000";
                }
                context.fillRect(
                    col * (this.config.cellSize + 1) + 1,
                    row * (this.config.cellSize + 1) + 1,
                    this.config.cellSize,
                    this.config.cellSize,
                );
            }
        }

        context.stroke();
    }

    private drawCell(row: number, col: number) {
        this.ctx.fillRect(
            col * (this.config.cellSize + 1) + 1,
            (row - this.offsetHeight) * (this.config.cellSize + 1) + 1,
            this.config.cellSize,
            this.config.cellSize,
        );
    }

    private getIndex(row: number, col: number) {
        return row * this.width + col;
    }

    private getColor(cell: Cell): string {
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
}

function getCells(cell: Cell) {
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

export default Game;
