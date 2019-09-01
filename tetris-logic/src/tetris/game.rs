use wasm_bindgen::prelude::wasm_bindgen;

use super::rotation::{Rotation, Direction};
use super::game_timer::GameTimer;
use super::action::Action;
use super::cell::Cell;
use super::point::Point;
use super::piece::Piece;

use web_sys::console;
use crate::utils::set_panic_hook;

macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// TODO: test scoring system: https://tetris.fandom.com/wiki/Scoring#Guideline_scoring_system
#[wasm_bindgen]
pub struct Game {
    game: GameTimer,
    soft_drop: bool,
    can_hard_drop: bool,
    rows_completed: u32,
    level: u32,
    score: u32,
    width: i32,
    height: i32,
    cells: Vec<Cell>,
    piece_queue: Vec<Cell>,
    piece: Piece,
    shadow_piece_position: Point,
    can_swap_piece: bool,
    hold_piece: Cell,
}

/// try to remove the first element of the array
pub fn shift<T>(array: &mut Vec<T>) -> Option<T> {
    array.reverse();
    let value = array.pop();
    array.reverse();
    value
}

#[wasm_bindgen]
impl Game {

    /// Create a new tetris game
    pub fn new() -> Game {
        let game = GameTimer::new();
        let score = 0;
        let rows_completed = 0;
        let level = 1;
        let width = 10;
        let height = 25;
        let soft_drop = false;

        let cells = (0..width * height)
            .map(|_i| Cell::EMPTY).collect();

        let mut piece_queue = Cell::random_piece_queue();
        piece_queue.append(&mut Cell::random_piece_queue());

        let mut piece = match shift(&mut piece_queue) {
            Some(x) => Piece::new(x),
            None => Piece::random()
        };
        piece.advance();
        let shadow_piece_position = Point::new(0, 0);
        let hold_piece = Cell::EMPTY;
        let can_swap_piece = true;
        let can_hard_drop = true;

        Game {
            game,
            soft_drop,
            can_hard_drop,
            rows_completed,
            level,
            score,
            width,
            height,
            cells,
            piece,
            piece_queue,
            shadow_piece_position,
            can_swap_piece,
            hold_piece,
        }
    }

    // TODO: Look into changing u8 into Action
    // wasm_bindgen should be able to have custom types
    pub fn event_handler(&mut self, events: &mut [u8]) {
        events.sort();
        if !events.contains(&(Action::HardDrop as u8)) {
            self.can_hard_drop = true;
        }
        for byte_action in events {
            let action = Action::from(byte_action.clone());
            let stop_updating = match action {
                Action::HardDrop => self.hard_drop(),
                Action::HoldPiece => self.hold_piece(),
                Action::RotateClockWise => self.rotate(Direction::Right), // self.rotate_clockwise(),
                Action::RotateCounterClockWise => self.rotate(Direction::Left),// self.rotate_counter_clockwise(),
                Action::MoveLeft => self.move_piece(Direction::Left),
                Action::MoveRight => self.move_piece(Direction::Right),
                Action::SoftDrop => self.enable_soft_drop(),
                Action::ToggleRunning => self.game.toggle_pause(),
                _ => false,
            };
            if stop_updating {
                break;
            }
        }
        // update shadow piece position after piece is done moving
        self.update_shadow_piece_position();
    }

    /// Update the tetris board
    pub fn update(&mut self, elapsed_time: f64) -> bool {
        // TODO: use controller controls
        //       https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
        // TODO: add mouse tracking
        
        if self.game.is_paused() {
            return false;
        }

        self.game.update(elapsed_time);
        self.piece.update(elapsed_time);
        let mut result = false;
        if self.game.can_update_game(self.update_speed()) {
            self.game.reset();
            if self.can_piece_advance() {
                self.piece.advance();
                if self.soft_drop {
                    self.score += 1;
                }
                result = false;
            } else {
                self.merge_piece_into_board();
                self.get_next_piece();
                self.can_swap_piece = true;
                if self.is_topped_out() {
                    // TODO: game lost logic
                    log!("game lost");
                } else {
                    self.update_board();
                    self.piece.advance();
                }
                result = true;
            }
            self.soft_drop = false;
        }
        result


        // TODO WHEN DONE (OR BASICITY DONE):
        // CHECK OUT https://shop.tetris.com/
        // THIS COULD BE AN IDEA  TO HELP MONETIZE A WEBSITE

        // TODO: when landing, use a half second lock delay
        //       https://tetris.fandom.com/wiki/Lock_delay

        // TODO: Sound effect on by default
        //       effect for rotation, movement, landing on surface, touching a wall,
        //       locking, line clear, game over

        // TODO: Must have music (song must be Korobeiniki)
        //       music on by default

        // TODO: when starting game or resuming a game, trigger a count down timer from 3

        // TODO: Game must have this notice when the game starts (XXXX is the year the game was created)
            // Game © 1985~XXXX Game Holding.
            // Game logos, Game theme song and Tetriminos are trademarks of Game Holding.
            // The Game trade dress is owned by Game Holding.
            // Licensed to The Game Company.
            // Game Game Design by Alexey Pajitnov.
            // Game Logo Design by Roger Dean.
            // All Rights Reserved.
    }

    /// Get the current score of the running game
    pub fn get_score(&self) -> u32 {
        self.score
    }

    /// Get the width of the game board
    pub fn get_width(&self) -> i32 {
        self.width
    }

    /// Get the height of the game board
    pub fn get_height(&self) -> i32 {
        self.height
    }

    /// Get the offset height to make the game field
    pub fn get_offset_height(&self) -> i32 {
        self.height - 20
    }

    /// Return the current level of the game board
    pub fn get_level(&self) -> u32 {
        self.level
    }

    /// Return the number of rows that have been completed
    pub fn get_rows_completed(&self) -> u32 {
        self.rows_completed
    }

    /// Get the current piece that is currently being held
    pub fn get_hold_piece(&self) -> Cell {
        self.hold_piece
    }

    /// Get the cells that are in queue to go next
    /// TODO: Give interface to be called without wasm_bindgen
    pub fn get_queued_pieces(&self) -> * const Cell {
        self.piece_queue.as_ptr()
    }

    /// Return a pointer to the first element in the boards vector
    /// TODO: Give interface to be called without wasm_bindgen
    pub fn get_cells(&self) -> * const Cell {
        self.cells.as_ptr()
    }

    /// Get the cells that make up the falling piece
    /// TODO: Give interface to be called without wasm_bindgen
    pub fn get_pieces(&self) -> * const Cell {
        self.piece.get_piece()
    }

    /// Get the pieces bounding box size
    pub fn get_piece_bounding_box(&self) -> i32 {
        self.piece.get_bounding_box_size()
    }

    /// Get the actives pieces type
    pub fn get_piece_type(&self) -> Cell {
        self.piece.get_type()
    }

    /// Get the world coordinates of the active piece position
    pub fn get_piece_position(&self) -> Point {
        self.piece.get_position()
    }

    /// Get the position of the shadow piece 
    pub fn get_shadow_piece_position(&self) -> Point {
        self.shadow_piece_position.clone()
    }
}

impl Game {

    /// Return the next level's goal
    /// 
    /// The next levels goal is always the current level * 5
    fn get_next_level_goal(&self) -> u32 {
        // TODO: remove magic number
        self.level * 5
    }

    /// Convert row and column to a position inside of the
    /// board array
    fn get_index(&self, row: i32, col: i32) -> usize {
        ((self.width * row) + col) as usize
    }

    /// Merge piece into board of cells
    fn merge_piece_into_board(&mut self) {
        for row in 0..self.piece.get_bounding_box_size() {
            for col in 0..self.piece.get_bounding_box_size() {
                let cell = self.piece.get_cells()[self.piece.get_index(row, col)];
                if cell == Cell::EMPTY {
                    continue;
                }
                let world_coord = Point {
                    x: self.piece.get_position().x + col,
                    y: self.piece.get_position().y + row
                };

                let index = self.get_index(world_coord.y, world_coord.x);
                self.cells[index] = cell;
            }
        }
    }

    /// Check if piece can advance on the board
    /// 
    /// make sure that all blocks under a cell is empty,
    /// otherwise return false to stop advancement
    fn can_piece_advance(&self) -> bool {
        // 1. find the lowest point on the shape
        for row in 0..self.piece.get_bounding_box_size() {
            for col in 0..self.piece.get_bounding_box_size() {
                let local_index = self.piece.get_index(row, col);
                if self.piece.get_cells()[local_index] != Cell::EMPTY {

                    // 2. convert the local lowest row into world coordinates
                    let world_coord = Point {
                        x: self.piece.get_position().x + col,
                        y: self.piece.get_position().y + row
                    };

                    // 3. check if piece will pass the border if it goes down 1 more
                    if world_coord.y + 1 >= self.height {
                        return false;
                    }

                    // 4. now that the row is in world coordinates, check if there is a piece
                    //    under this one in the game cells
                    let world_index = self.get_index(world_coord.y + 1, world_coord.x);
                    if self.cells[world_index] != Cell::EMPTY {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    /// Check if a piece can move right
    fn can_piece_go_right(&self) -> bool {
        // 1. find the rightest point on the shape
        for row in 0..self.piece.get_bounding_box_size() {
            for col in 0..self.piece.get_bounding_box_size() {
                let local_index = self.piece.get_index(row, col);
                if self.piece.get_cells()[local_index] != Cell::EMPTY {

                    // 2. convert the local lowest row into world coordinates
                    let world_coord = Point {
                        x: self.piece.get_position().x + col,
                        y: self.piece.get_position().y + row
                    };

                    // 3. now that the row is in world coordinates, check if there is a piece
                    //    to the right of the game cell
                    let world_index = self.get_index(world_coord.y, world_coord.x + 1);
                    if self.cells[world_index] != Cell::EMPTY {
                        return false;
                    }

                    // 4. check if piece will pass the border if it goes down 1 more
                    if world_coord.x + 1 >= self.width {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /// Check if a piece can move left
    fn can_piece_go_left(&self) -> bool {
        // 1. find the rightest point on the shape
        for row in 0..self.piece.get_bounding_box_size() {
            for col in 0..self.piece.get_bounding_box_size() {
                let local_index = self.piece.get_index(row, col);
                if self.piece.get_cells()[local_index] != Cell::EMPTY {

                    // 2. convert the local lowest row into world coordinates
                    let world_coord = Point {
                        x: self.piece.get_position().x + col,
                        y: self.piece.get_position().y + row
                    };

                    // 3. now that the row is in world coordinates, check if there is a piece
                    //    to the right of the game cell
                    let world_index = self.get_index(world_coord.y, world_coord.x - 1);
                    if self.cells[world_index] != Cell::EMPTY {
                        return false;
                    }

                    // 4. check if piece will pass the border if it goes down 1 more
                    if world_coord.x - 1 < 0 {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    fn update_board(&mut self) {
        // 1. find all removable rows
        let mut removable_rows = Vec::new();
        for row in (0..self.height).rev() {
            // TODO: improve by stopping loop when row only contains empty cells
            //       also have is_row_full return a enum
            if self.is_row_full(row) {
                removable_rows.push(row);
            }
        }

        // 2. if no rows are removable, return
        if removable_rows.len() == 0 {
            return;
        }

        // 2. calculate points
        // TODO: double check point system
        // https://tetris.fandom.com/wiki/Scoring#Guideline_scoring_system
        //          Single line: 1 line
        //          Double line: 3 line
        //          Triple line: 5 line
        //          Game line: 8 line
        let rows_completed_score = match removable_rows.len() {
            0 => 0,
            1 => 100,
            2 => 300,
            3 => 500,
            4 => 800,
            _ => 800,
        };
        // update level if rows_completed passed a threshold
        self.score = self.score + rows_completed_score;
        self.rows_completed = self.rows_completed + (removable_rows.len() as u32);
        if self.rows_completed > self.get_next_level_goal() {
            self.level = self.level + 1;
        }

        // 3. remove all rows and push higher pieces down
        for row in &removable_rows {
            for col in 0..self.width {
                let index = self.get_index(*row, col);
                self.cells[index] = Cell::EMPTY;
            }
        }

        // 4. pull all piece above row down one
        for _ in &removable_rows {
            for row in (0..self.height - 1).rev() {
                // move bricks down one
                if !self.is_row_empty(row + 1) {
                    continue;
                }
                for col in 0..self.width {
                    let old_index = self.get_index(row, col);
                    let new_index = self.get_index(row + 1, col);
                    self.cells.swap(old_index, new_index);
                }
            }
        }
    }

    fn update_shadow_piece_position(&mut self) {
        // TODO: enabled by default
        let mut world_y = self.height;
        let world_x = self.piece.get_position().x;
        let size = self.piece.get_bounding_box_size();
        for col in (0..size).rev() {
            if col + world_x >= self.width || col + world_x < 0 {
                // bounding box is off page, no point in checking
                continue;
            }
            for row in (0..size).rev() {
                let cell = self.piece.get_cells()[self.piece.get_index(row, col)];
                if cell == Cell::EMPTY {
                    continue;
                }
                if world_y > self.height - (row + 1) {
                    world_y = self.height - (row + 1)
                }

                // find largest stack
                let mut breakout = false;
                let world_col = world_x + col;
                for world_row in self.piece.get_position().y..self.height {
                    let world_cell = self.cells[self.get_index(world_row, world_col)];
                    if world_cell != Cell::EMPTY && world_y > world_row - (row + 1) {
                        world_y = world_row - (row + 1);
                        breakout = true;
                    }
                    if breakout {
                        break;
                    }
                }
            }
        }
        self.shadow_piece_position = Point { x: world_x, y: world_y };
    }

    fn is_row_full(&self, row: i32) -> bool {
        for col in 0..self.width {
            let index = self.get_index(row, col);
            if self.cells[index] == Cell::EMPTY {
                return false;
            }
        }
        return true
    }

    fn is_row_empty(&self, row: i32) -> bool {
        for col in 0..self.width {
            let index = self.get_index(row, col);
            if self.cells[index] != Cell::EMPTY {
                return false;
            }
        }
        return true
    }

    fn rotate(&mut self, direction: Direction) -> bool {
        if self.piece.can_piece_rotate() {
            self.piece.reset_timer();
        } else {
            return false;
        }

        if self.piece.get_type() == Cell::O {
            return false;
        }

        let box_size = self.piece.get_bounding_box_size();
        let pivot = self.piece.get_origin();
        let mut wall_kick_translation = Point::new(0, 0);
        let mut moves: Vec<(i32, i32)> = Vec::with_capacity(4);
        for row in 0..box_size {
            for col in 0..box_size {

                let local_index = self.piece.get_index(row, col);
                if self.piece.get_cells()[local_index] == Cell::EMPTY {
                    continue;
                }
                let world_point = Point {
                    x: self.piece.get_position().x + col,
                    y: self.piece.get_position().y + row
                };
                let rotated_vector_x = world_point.x - pivot.x;
                let rotated_vector_y = world_point.y - pivot.y;

                let rotation_matrix = match direction {
                    Direction::Right => (1, -1),
                    Direction::Left => (-1, 1),
                };

                let transformed_vector_x = 0 * rotated_vector_x + rotation_matrix.1 * rotated_vector_y;
                let transformed_vector_y = rotation_matrix.0 * rotated_vector_x +  0 * rotated_vector_y;

                let mut new_world_x = pivot.x + transformed_vector_x;
                let mut new_world_y = pivot.y + transformed_vector_y;

                if self.piece.get_type() == Cell::I {
                    if direction == Direction::Right {
                        if self.piece.get_rotation() == Rotation::NORTH || self.piece.get_rotation() == Rotation::SOUTH {
                            new_world_x = new_world_x - 1;
                        } else if self.piece.get_rotation() == Rotation::EAST || self.piece.get_rotation() == Rotation::WEST {
                            new_world_x = new_world_x + 1;
                        }
                    } else if direction == Direction::Left {
                        if self.piece.get_rotation() == Rotation::NORTH || self.piece.get_rotation() == Rotation::SOUTH {
                            new_world_y = new_world_y - 1;
                        } else if self.piece.get_rotation() == Rotation::EAST || self.piece.get_rotation() == Rotation::WEST {
                            new_world_y = new_world_y + 1;
                        }
                    }
                }

                let new_local_x = new_world_x - self.piece.get_position().x;
                let new_local_y = new_world_y - self.piece.get_position().y;
                log!("({}, {})", new_local_x, new_local_y);


                // 1. check if move is valid. If move is not valid, don't rotate
                // 1.1 check if piece is inside right wall
                let wall_kick_distance = new_world_x - self.width - 1;
                if new_world_x > self.width - 1 && wall_kick_distance < wall_kick_translation.x {
                    wall_kick_translation.x = wall_kick_distance;
                }
                // 1.2 check if piece is inside left wall
                if new_world_x < 0 && new_world_x < wall_kick_translation.x {
                    wall_kick_translation.x = new_world_x * -1;
                }

                // 1.3 check if piece is inside piece
                let new_world_index = self.get_index(new_world_y, new_world_x);
                if self.cells[new_world_index] != Cell::EMPTY {
                    // TODO: complicated wall kick
                    return false;
                }

                moves.push((new_local_x, new_local_y));
            }
        }
        // move pieces
        for i in 0..self.piece.get_cells().len() {
            self.piece.set_cell(i, Cell::EMPTY);
        }
        for i in &moves {
            let new_index = self.piece.get_index(i.1, i.0);
            log!("{}, ({}, {})", new_index, i.0, i.1);
            self.piece.set_cell(new_index, self.piece.get_type());
        }
        self.piece.get_position().x = self.piece.get_position().x + wall_kick_translation.x;
        match direction {
            Direction::Right => self.piece.get_rotation().clockwise(),
            Direction::Left => self.piece.get_rotation().counter_clockwise(),
        }
        false
    }

    fn move_piece(&mut self, direction: Direction) -> bool {
        let can_move = match direction {
            Direction::Left => self.can_piece_go_left(),
            Direction::Right => self.can_piece_go_right(),
        };
        if can_move {
            self.piece.move_piece(direction);
        }
        true
    }

    fn hard_drop(&mut self) -> bool {
        if self.can_hard_drop {
            self.can_hard_drop = false;
            self.score += ((self.height - self.piece.get_position().y) * 2) as u32;
            self.piece.set_position(self.shadow_piece_position);
            self.game.update_asap();
            return true;
        } else {
            return false;
        }
    }

    fn hold_piece(&mut self) -> bool {
        // TODO: enabled by default
        if !self.can_swap_piece {
            return true;
        }

        if self.hold_piece == Cell::EMPTY {
            self.hold_piece = self.piece.get_type();
            self.get_next_piece();
        } else {
            let new_piece = self.hold_piece;
            self.hold_piece = self.piece.get_type();
            self.piece = Piece::new(new_piece);
        }
        self.can_swap_piece = false;
        true
    }

    fn get_next_piece(&mut self) {
        self.piece = match shift(&mut self.piece_queue) {
            Some(x) => Piece::new(x),
            None => Piece::random()
        };
        if self.piece_queue.len() <= 7 { // TODO: remove magic number
            self.piece_queue.append(&mut Cell::random_piece_queue());
        }
    }

    // TODO: add some more "fun" logic https://tetris.fandom.com/wiki/Top_out
    fn is_topped_out(&self) -> bool {
        for col in 0..self.width {
            let index = self.get_index(4, col);
            if self.cells[index] != Cell::EMPTY {
                return true;
            }
        }
        false
    }

    fn update_speed(&self) -> f64 {
        let update_speed = if self.soft_drop {
            // TODO remove magic number
            // this is the constant soft drop number
            0.05
        } else {
            let level = (self.level as f64) - 1.0;
            (0.8 - (level * 0.007)).powf(level)
        };
        update_speed * 1000.0
    }

    fn enable_soft_drop(&mut self) -> bool {
        self.soft_drop = true;
        false
    }
}