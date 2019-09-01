import { Action } from "../../tetris-logic/pkg/rusty_web_tetris";

export default class InputController {

    private listening: boolean;
    private input: { [key: string]: boolean } = {
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
    };

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
    constructor() {
        this.listening = false;
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
        if (i.Numpad1 || i.Numpad5 || i.Numpad9 || i.KeyX || i.ArrowUp) {
            eventQueue.push(Action.RotateClockWise);
        }
        if (i.Numpad3 || i.Numpad7 || i.ControlLeft || i.KeyZ) {
            eventQueue.push(Action.RotateCounterClockWise);
        }
        if (i.Numpad8 || i.Space) {
            eventQueue.push(Action.HardDrop);
        }
        if (i.Numpad0 || i.KeyC || i.ShiftLeft) {
            eventQueue.push(Action.HoldPiece);
        }
        if (i.Numpad4 || i.ArrowLeft) {
            eventQueue.push(Action.MoveLeft);
        }
        if (i.Numpad6 || i.ArrowRight) {
            eventQueue.push(Action.MoveRight);
        }
        if (i.Numpad2 || i.ArrowDown) {
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
        return byteEventQueue;
    }

    /**
     * Callback that listens for keyboard events
     */
    private keyboardEvent = (event: KeyboardEvent) => {
        const code = this.getKeyCode(event);
        this.input[code] = event.type === "keydown";
        event.preventDefault();
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