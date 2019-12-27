import { GetElementById } from "../util";

export default abstract class Page {

    protected parentElement: HTMLDivElement;
    private id: string;

    constructor(id: string) {
        this.parentElement = GetElementById(id) as HTMLDivElement;
        this.id = id;
    }

    /**
     * Hide the current page
     */
    public hide() {
        console.log(`hiding ${this.id}`);
        this.parentElement.style.display = "none";
    }

    /**
     * Show the page
     *
     * {return} boolean - hide the last page shown
     *      to hide the previous state, return true
     *      to keep the last state visible, return false
     */
    public show(): boolean {
        console.log(`showing ${this.id}`);
        this.parentElement.style.display = "block";
        return true;
    }

    public isShowing(): boolean {
        return this.parentElement.style.display === "block";
    }

    /**
     * Remove any event listeners binded to the page
     */
    public destroy() {
        console.log(`destroying ${this.id}`);
    }
}
