import MainMenuPage from "./pages/MainMenuPage";
import GamePage from "./pages/GamePage";
import PauseModal from "./pages/PauseModal";
import GameOverModal from "./pages/GameOverModal";
import Tetris from "./Tetris";
import { Game } from "../../tetris-logic/pkg/rusty_web_tetris";

/**
 * Website StateManager
 * Control what pages are currently shown to the user
 */
export default class StateManager {
    
    private mainMenu: MainMenuPage;
    private gamePage: GamePage;
    private pauseModal: PauseModal;
    private gameOverModal: GameOverModal;

    private game?: Tetris;

    constructor() {
        // assign all the needed html elements we need to keep track of
        this.mainMenu = new MainMenuPage(this);
        this.gamePage = new GamePage(this);
        this.pauseModal = new PauseModal(this);
        this.gameOverModal = new GameOverModal(this);
        this.game = undefined;
    }

    GoToMainMenu() {
        this.mainMenu.show();
        this.gamePage.hide();
        this.pauseModal.hide();
        this.gameOverModal.hide();
        /**
         * Make the game null
         */
        this.game = undefined;
    }

    GoToGame() {
        this.mainMenu.hide();
        this.gamePage.show();
        this.pauseModal.hide();
        this.gameOverModal.hide();
        /**
         * Load and start the game
         */
        if (!this.game) {
            this.game = new Tetris(Game.new());
            this.game.startTetris();
        } else if (this.game.isPaused) {
            this.game.play();
        }
    }

    GoToPauseGameModal() {
        // pause the game
        if (!this.game) {
            throw new Error("Tetris game must be running if 'GoToPauseGameModal()' is called!");
        }
        this.game.pause();
        // hide and show related content
        this.mainMenu.hide();
        this.gamePage.show();
        this.pauseModal.show();
        this.gameOverModal.hide();
    }

    GoToGameOverModal() {
        // Go to the game over screen
        if (!this.game) {
            throw new Error("Tetris game must be running if 'GoToGameOverModal()' is called!");
        }
        // TODO: Double check that game is actually in a gameover state
        // if (!this.game.isGameOver) {
        //     throw new Error("Tetris game must be in a Game over state for 'GoToGameOverModal()' to be called");
        // }
        // this.game.pause();

        this.mainMenu.hide();
        this.gamePage.show();
        this.pauseModal.hide();
        this.gameOverModal.show();
    }
}

try {
    const router = new StateManager();
}
catch (error) {
    console.error(error);
    console.error("Stop The Game Please!");
}