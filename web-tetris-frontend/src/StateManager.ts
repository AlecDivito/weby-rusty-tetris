import Page from "pages/Page";

/**
 * Website StateManager
 * Control what pages are currently shown to the user
 */
export default class StateManager {

    public static GetInstance = (): StateManager => {
        if (StateManager.instance === undefined) {
            StateManager.instance = new StateManager();
        }
        return StateManager.instance!;
    }

    private static instance?: StateManager;

    private stack: Page[] = [];

    private constructor() { }

    /**
     * Push a new state onto the stack
     * @param page state to transfer to
     * @param hidePervious Should the current state be hidden
     */
    public async Push(page: Page, hideAllPervious: boolean = true) {
        if (this.stack.length > 0 && hideAllPervious) {
            this.stack[this.stack.length - 1].hide();
        }
        await page.show();
        this.stack.push(page);
    }

    /**
     * Pop the current state
     */
    public async Pop() {
        const page = this.stack.pop()!;
        page.hide();
        page.destroy();
        if (this.stack.length > 0) {
            const newPage = this.stack[this.stack.length - 1];
            await newPage.show();
        }
    }

    /**
     * Pop the current state and push a new one on
     * @param page state to transfer to
     */
    public async Swap(page: Page) {
        await this.Pop();
        await this.Push(page);
    }

    /**
     * Remove all pages and transfer to the new one
     * @param page state to transfer to
     */
    public async ClearAndPush(page: Page) {
        while (this.stack.length !== 0) {
            await this.Pop();
        }
        await this.Push(page);
    }

}
