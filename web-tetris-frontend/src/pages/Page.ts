import StateManager from "..";
import { GetElementById } from "../util";

export default abstract class Page {

    protected parentElement: HTMLDivElement;
    protected router: StateManager;

    constructor(id: string, router: StateManager) {
        this.parentElement = GetElementById(id) as HTMLDivElement;
        this.router = router;
    }

    public hide() {
        this.parentElement.style.display = "none";
    }

    public show() {
        this.parentElement.style.display = "block";
    }
}