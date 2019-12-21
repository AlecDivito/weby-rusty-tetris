import { Action } from "../../tetris-logic/pkg/rusty_web_tetris";

export default class InputController {

    private listening: boolean;
    private canvasElement: HTMLCanvasElement;
    private holdPieceCanvas: HTMLCanvasElement;

    private input: { [key: string]: boolean } = {
        /**
         * Keyboard input
         */
        ShiftLeft: false,
        ControlLeft: false,
        Escape: false,
        Space: false,
        ArrowLeft: false,
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
        KeyC: false,
        KeyX: false,
        KeyZ: false,
        Numpad0: false,
        Numpad1: false,
        Numpad2: false,
        Numpad3: false,
        Numpad4: false,
        Numpad5: false,
        Numpad6: false,
        Numpad7: false,
        Numpad8: false,
        Numpad9: false,
        F1: false,

        /**
         * mouse input
         */
        leftClick: false,
        leftClickHold: false,
        rightClick: false,
        rightClickHold: false,
        middleClick: false,
        middleClickHold: false,

        /**
         * touch input
         */
        dragDown: false,
        holdDown: false,
        tapHold: false,
        tapLeft: false,
        tapRight: false,
    };

    private mouseInput = {
        x: 0,
        y: 0,
        updated: false,
    }

    private touchInput = {
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
        timeStamp: 0,
        touchStartTime: 0,
        updated: false
    }

    private touchEventFirst: boolean = false;

    get Input() {
        return this.input;
    }

    private keyMap: { [key: number]: string } = {
        16:  "ShiftLeft",
        17:  "ControlLeft",
        27:  "Escape",
        32:  "Space",
        37:  "ArrowLeft",
        38:  "ArrowUp",
        39:  "ArrowRight",
        40:  "ArrowDown",
        67:  "KeyC",
        88:  "KeyX",
        90:  "KeyZ",
        96:  "Numpad0",
        97:  "Numpad1",
        98:  "Numpad2",
        99:  "Numpad3",
        100: "Numpad4",
        101: "Numpad5",
        102: "Numpad6",
        103: "Numpad7",
        104: "Numpad8",
        105: "Numpad9",
        112: "F1",
    };

    /**
     * Create a Input controller
     */
    constructor(canvasBoard: HTMLCanvasElement, holdPieceCanvas: HTMLCanvasElement) {
        this.listening = false;
        this.canvasElement = canvasBoard;
        this.holdPieceCanvas = holdPieceCanvas;
    }

    /**
     * Start the input controller.
     * Throws error when controller is already listening for events
     */
    public start() {
        if (this.listening) {
            throw new Error("You can't start listening to the game because you already are!");
        }
        window.addEventListener("keyup", this.keyboardEvent);
        window.addEventListener("keydown", this.keyboardEvent);

        /**
         * Mouse Controls
         */
        const update = (event: MouseEvent) => {
            this.mouseInput.x = event.clientX - this.canvasElement.offsetLeft;
            this.mouseInput.y = event.clientY - this.canvasElement.offsetTop;
            this.mouseInput.updated = true;
        }
        this.canvasElement.addEventListener("mousemove", update);
        this.canvasElement.addEventListener("mouseenter", update);
        this.canvasElement.addEventListener('mouseleave', update);
        this.canvasElement.addEventListener('contextmenu', event => event.preventDefault());
        this.canvasElement.addEventListener('mousedown', event => {
            this.input.leftClick = [1, 3, 5, 7].includes(event.buttons);
            this.input.rightClick = [2, 3, 6, 7].includes(event.buttons);
            this.input.middleClick = [4, 5, 6, 7].includes(event.buttons);
        });
        this.canvasElement.addEventListener('mouseup', event => {
            this.input.leftClick = [1, 3, 5, 7].includes(event.buttons);
            this.input.rightClick = [2, 3, 6, 7].includes(event.buttons);
            this.input.middleClick = [4, 5, 6, 7].includes(event.buttons);
        });

        /**
         * Touch Controls
         */

        const updateTouch = (event: TouchEvent) => {
            this.touchEventFirst = true;
            if (event.type === 'touchend') {
                const x = event.changedTouches[0].clientX - this.canvasElement.offsetLeft;
                const y = event.changedTouches[0].clientY - this.canvasElement.offsetTop;

                this.touchInput.x = x;
                this.touchInput.y = y;

                const diff_x = Math.floor(this.touchInput.startX - x);
                const diff_y = Math.floor(this.touchInput.startY - y);
                const timeDiff = event.timeStamp - this.touchInput.touchStartTime;
                const threshold = 160; // 5 frames
                const isTap = diff_x >= -1 && diff_x <= 1 && diff_y >= -1 && diff_y <= 1;
                console.log(timeDiff, diff_x, diff_y, this.touchInput.startX, x);
                if (timeDiff < threshold && isTap) {
                    const width_offset = this.canvasElement.width / 2;
                    if (x < width_offset) {
                        this.input.tapLeft = true;
                    } else {
                        this.input.tapRight = true;
                    }
                }
                return false;
            }
            
            const x = event.targetTouches[0].clientX - this.canvasElement.offsetLeft;
            const y = event.targetTouches[0].clientY - this.canvasElement.offsetTop;
            if (event.type === 'touchstart') {
                this.touchInput.x = x;
                this.touchInput.y = y;
                this.touchInput.timeStamp = event.timeStamp;

                this.touchInput.startX = x;
                this.touchInput.startY = y;
                this.touchInput.touchStartTime = event.timeStamp;
                return false;
            }
            const diff_x = this.touchInput.x - x;
            const diff_y = this.touchInput.y - y;

            const abs_x = Math.abs(diff_x);
            const abs_y = Math.abs(diff_y);

            const time = event.timeStamp - this.touchInput.timeStamp;
            const velocity = Math.sqrt(abs_x * abs_x + abs_y * abs_y) / time;

            const flick_threshold = .8;
            const isFlick = velocity > flick_threshold;

            const rad = Math.atan2(y - this.touchInput.y, x - this.touchInput.x);
            const degree = Math.abs(rad) * 180 / Math.PI;

            if (degree > 80 && degree < 100 && isFlick) {
                // swipe down
                this.input.dragDown = true;
            } else if ((degree >= -45 && degree <= 45) || (degree < 225 && degree > 135)) {
                // move left and right
                this.touchInput.updated = true;
                this.touchInput.x = x;
                this.touchInput.y = y;
                this.touchInput.timeStamp = event.timeStamp;
                this.input.dragDown = false;
            }
            return false;
        }

        this.canvasElement.addEventListener('touchmove', updateTouch, { passive: true });
        this.canvasElement.addEventListener('touchstart', updateTouch, { passive: true });
        this.canvasElement.addEventListener('touchend', updateTouch, { passive: true});
        this.holdPieceCanvas.addEventListener('click', () => this.input.tapHold = true);

        this.listening = true;
    }

    /**
     * Stop the input controller, and remove the event listeners from the window.
     * Throws error if the controller is already in a stopped state
     */
    public stop() {
        if (!this.listening) {
            throw new Error("Must start() the InputController before you can stop() it!");
        }
        window.removeEventListener("keyup", this.keyboardEvent);
        window.removeEventListener("keydown", this.keyboardEvent);
        this.listening = false;
    }

    // TODO: Convert to back to Action[]
    public getEventQueue(): Uint8Array /*Action[]*/ {
        const i = this.input;
        const eventQueue: Action[] = [];
        if (i.Numpad1 || i.Numpad5 || i.Numpad9 || i.KeyX || i.ArrowUp || i.tapRight) {
            eventQueue.push(Action.RotateClockWise);
        }
        if (i.Numpad3 || i.Numpad7 || i.ControlLeft || i.KeyZ || i.tapLeft) {
            eventQueue.push(Action.RotateCounterClockWise);
        }
        if (i.Numpad8 || i.Space || i.leftClick || i.dragDown) {
            eventQueue.push(Action.HardDrop);
        }
        if (i.Numpad0 || i.KeyC || i.ShiftLeft || i.rightClick || i.tapHold) {
            eventQueue.push(Action.HoldPiece);
        }
        if (i.Numpad4 || i.ArrowLeft) {
            eventQueue.push(Action.MoveLeft);
        }
        if (i.Numpad6 || i.ArrowRight) {
            eventQueue.push(Action.MoveRight);
        }
        if (i.Numpad2 || i.ArrowDown || i.holdDown) {
            eventQueue.push(Action.SoftDrop);
        }
        if (i.Escape) {
            eventQueue.push(Action.ToggleRunning)
        }
        // TODO: THIS SHOULDN'T BE NEEDED, POST An ISSUE
        const byteEventQueue = new Uint8Array(eventQueue.length);
        for (let j = 0; j < eventQueue.length; j++) {
            const event = eventQueue[j];
            switch (event) {
                case Action.HardDrop: byteEventQueue[j] = 0; break;
                case Action.HoldPiece: byteEventQueue[j] = 1; break;
                case Action.RotateClockWise: byteEventQueue[j] = 2; break;
                case Action.RotateCounterClockWise: byteEventQueue[j] = 3; break;
                case Action.MoveLeft: byteEventQueue[j] = 4; break;
                case Action.MoveRight: byteEventQueue[j] = 5; break;
                case Action.SoftDrop: byteEventQueue[j] = 6; break;
                case Action.ToggleRunning: byteEventQueue[j] = 7; break;
            }
        }
        // toggle all touch events 
        this.input.dragDown = false
        this.input.holdDown = false;
        this.input.tapHold = false;
        this.input.tapLeft = false;
        this.input.tapRight = false;
        return byteEventQueue;
    }

    public getTouchGridArea(cellSize: number, boundingBox: number): {x: number, y: number} | null {
        let offset = boundingBox / 2;
        if (this.mouseInput.updated && this.touchEventFirst === false) {
            let x = this.mouseInput.x,
                y = this.mouseInput.y;
            x = Math.round(x / cellSize - offset);
            y = Math.round(y / cellSize - offset);
            this.mouseInput.updated = false;
            return { x, y };
        }
        if (this.touchInput.updated) {
            let x = this.touchInput.x, y = this.touchInput.y;
            x = Math.round(x / cellSize - offset);
            y = Math.round(y / cellSize - offset);
            this.touchInput.updated = false;
            return {x,y};
        }
        return null; 
    }

    /**
     * Callback that listens for keyboard events
     */
    private keyboardEvent = (event: KeyboardEvent) => {
        const code = this.getKeyCode(event);
        this.input[code] = event.type === "keydown";
    }

    /**
     * Try and get the key code of the keyboard button pressed
     * @param event Keyboard browser Event
     */
    private getKeyCode(event: KeyboardEvent): string {
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
        // event.code only supports the QWERTY keyboard and assumes everyone
        // is running that keyboard layout
        let code = event.code;
        if (!code) {
            // TODO: remove "keyCode" and replace it with "key"
            code = this.keyMap[event.keyCode];
        }
        return code;
    }
}
