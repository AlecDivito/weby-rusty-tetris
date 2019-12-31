/* tslint:disable */
/* eslint-disable */
export enum Cell {
  I,
  O,
  T,
  S,
  Z,
  J,
  L,
  EMPTY,
}
/**
* A Cell is a byte representation of a possible pieces value
*/
export enum Action {
  HardDrop,
  HoldPiece,
  RotateClockWise,
  RotateCounterClockWise,
  MoveLeft,
  MoveRight,
  SoftDrop,
  ToggleRunning,
  Nothing,
}
/**
*/
/**
*/
export class Game {
  free(): void;
/**
* Create a new tetris game
* @returns {Game} 
*/
  static new(): Game;
/**
* TODO: Look into changing u8 into Action
* wasm_bindgen should be able to have custom types
* @param {Uint8Array} events 
*/
  event_handler(events: Uint8Array): void;
/**
* @param {number} target_x_pos 
* @param {number} target_y_pos 
*/
  touch_event_handler(target_x_pos: number, target_y_pos: number): void;
/**
* Update the tetris board
* @param {number} this.ptr 
* @returns {bool} 
*/
  update(ptr: number): bool;
/**
* @returns {bool} 
*/
  is_game_over(): bool;
/**
* Get the current score of the running game
* @returns {number} 
*/
  get_score(): number;
/**
* Get the width of the game board
* @returns {number} 
*/
  get_width(): number;
/**
* Get the height of the game board
* @returns {number} 
*/
  get_height(): number;
/**
* Get the amount of seconds the game has been played for
* @returns {number} 
*/
  get_seconds(): number;
/**
* Get the offset height to make the game field
* @returns {number} 
*/
  get_offset_height(): number;
/**
* Return the current level of the game board
* @returns {number} 
*/
  get_level(): number;
/**
* Return the number of rows that have been completed
* @returns {number} 
*/
  get_rows_completed(): number;
/**
* Get the current piece that is currently being held
* @returns {number} 
*/
  get_hold_piece(): number;
/**
* Get the cells that are in queue to go next
* TODO: Give interface to be called without wasm_bindgen
* @returns {number} 
*/
  get_queued_pieces(): number;
/**
* Return a pointer to the first element in the boards vector
* TODO: Give interface to be called without wasm_bindgen
* @returns {number} 
*/
  get_cells(): number;
/**
* Get the cells that make up the falling piece
* TODO: Give interface to be called without wasm_bindgen
* @returns {number} 
*/
  get_pieces(): number;
/**
* Get the pieces bounding box size
* @returns {number} 
*/
  get_piece_bounding_box(): number;
/**
* Get the actives pieces type
* @returns {number} 
*/
  get_piece_type(): number;
/**
* Get the world coordinates of the active piece position
* @returns {Point} 
*/
  get_piece_position(): Point;
/**
* Get the position of the shadow piece 
* @returns {Point} 
*/
  get_shadow_piece_position(): Point;
}
/**
*/
export class Point {
  free(): void;
  x: number;
  y: number;
}
