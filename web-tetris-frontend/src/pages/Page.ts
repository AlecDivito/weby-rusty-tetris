import { GetElementById } from "../util";

export default abstract class Page {

    protected parentElement: HTMLDivElement;

    constructor(id: string) {
        this.parentElement = GetElementById(id) as HTMLDivElement;
    }

    public hide() {
        this.parentElement.style.display = "none";
    }

    public show() {
        this.parentElement.style.display = "block";
    }
}