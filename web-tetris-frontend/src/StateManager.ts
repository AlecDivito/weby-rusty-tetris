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

    public static GetInstance = (): StateManager => {
        if (StateManager.instance === undefined) {
            StateManager.instance = new StateManager();
        }
        return StateManager.instance!;
    }

    private static instance?: StateManager;

    private mainMenu: MainMenuPage;
    private gamePage: GamePage;
    private pauseModal: PauseModal;
    private gameOverModal: GameOverModal;
    private game?: Tetris;

    private constructor() {
        // assign all the needed html elements we need to keep track of
        this.mainMenu = new MainMenuPage();
        this.gamePage = new GamePage();
        this.pauseModal = new PauseModal();
        this.gameOverModal = new GameOverModal();
        this.game = undefined;
    }

    public GoToMainMenu() {
        this.mainMenu.show();
        this.gamePage.hide();
        this.pauseModal.hide();
        this.gameOverModal.hide();
        /**
         * Make the game null
         */
        this.game = undefined;
    }

    public GoToGameAndRestartGame() {
        this.GoToGame();
        this.game = new Tetris(Game.new(), this.gamePage.CalculateTetrisConfig());
        this.game.startTetris();
    }

    public GoToGameAndStartGame() {
        this.GoToGame();
        this.game = new Tetris(Game.new(), this.gamePage.CalculateTetrisConfig());
        this.game.startTetris();
    }

    public GoToGameAndResumeGame() {
        this.GoToGame();
        if (!this.game) {
            throw new Error("[GoToGameAndResumeGame]: Game MUST exist for the game to be resumed");
        } else {
            this.game.play();
        }
    }

    public GoToPauseModalAndPauseGame() {
        this.GoToPauseGameModal();
        if (!this.game) {
            throw new Error("[GoToPauseModalAndPauseGame]: Game MUST exist for the game to be paused");
        } else {
            this.game.pause();
        }
    }

    public GoToGameOverModalAndPauseGame() {
        if (!this.game) {
            console.log(this.game);
            throw new Error("Tetris game must be running if 'GoToGameOverModal()' is called!");
        }
        if (!this.game.isGameOver) {
            console.log(this.game.isGameOver);
            throw new Error("Tetris game must be in a Game over state for 'GoToGameOverModal()' to be called");
        }
        console.log('pausing game');
        this.game.pause();
        this.GoToGameOverModal();
    }

    public GoToStatisticsPage() {
        throw new Error("Method not implemented.");
    }

    public GoToCustomizePage() {
        throw new Error("Method not implemented.");
    }

    private GoToGame() {
        this.mainMenu.hide();
        this.gamePage.show();
        this.pauseModal.hide();
        this.gameOverModal.hide();
    }

    private GoToPauseGameModal() {
        this.mainMenu.hide();
        this.gamePage.show();
        this.pauseModal.show();
        this.gameOverModal.hide();
    }

    private GoToGameOverModal() {
        this.mainMenu.hide();
        this.gamePage.show();
        this.pauseModal.hide();
        this.gameOverModal.show();
    }

}
