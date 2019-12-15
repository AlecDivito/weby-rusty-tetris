import Page from "./Page";
import StateManager from "..";

export default class GameOverModal extends Page {
    
    constructor(router: StateManager) {
        super("game-over-modal", router);
    }
}
