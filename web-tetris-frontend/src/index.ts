import { Game } from "../../tetris-logic/pkg/rusty_web_tetris";
import Tetris from "./Tetris";

/**
 * Load and start the game
 */
const t = new Tetris(Game.new());
t.startTetris();
