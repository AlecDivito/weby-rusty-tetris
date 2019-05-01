mod utils;

extern crate web_sys;
extern crate js_sys;

use web_sys::console;
use wasm_bindgen::prelude::wasm_bindgen;
use crate::utils::set_panic_hook;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[derive(Copy, Clone, Debug, Eq, PartialEq)]
enum Direction {
    Left,
    Right,
}

struct Timer {
    last_time: f64,
}

impl Timer {
    pub fn new() -> Timer {
        Timer {
            last_time: 0.0
        }
    }

    pub fn get_elapsed_time(&mut self, current_time: f64) -> f64 {
        let elapsed_time = current_time - self.last_time;
        self.last_time = current_time;
        elapsed_time
    }
}

struct Game {
    timer: Timer,
    record_time: f64,
    update_now: bool,
    paused: bool,
}

impl Game {
    pub fn new() -> Game {
        Game {
            timer: Timer::new(),
            record_time: 0.0,
            update_now: false,
            paused: false,
        }
    }

    pub fn update(&mut self, current_time: f64) {
        self.record_time = self.record_time + self.timer.get_elapsed_time(current_time);
    }

    pub fn can_update_game(&mut self, update_speed: f64) -> bool {
        let result = self.get_record_time() > update_speed || self.update_now;
        if self.update_now {
            self.update_now = false;
        }
        result
    }

    pub fn update_asap(&mut self) {
        self.update_now = true;
    }

    pub fn reset(&mut self) {
        self.record_time = 0.0;
    }

    pub fn get_record_time(&self) -> f64 {
        self.record_time
    }

    pub fn toggle_pause(&mut self) -> bool {
        self.paused = !self.paused;
        if self.is_running() {
            self.reset();
        }
        false
    }

    pub fn is_running(&self) -> bool {
        !self.paused
    }

    pub fn is_paused(&self) -> bool {
        self.paused
    }
}


pub fn shuffle<T>(array: &mut Vec<T>) {
    for i in (0..array.len()).rev() {
        let mut j = (js_sys::Math::random() * ((i as f64) + 1.0)).round() as usize;
        if j >= array.len() {
            j = array.len() - 1;
        }
        array.swap(i, j);
    }
}

pub fn pop_front<T>(array: &mut Vec<T>) -> Option<T> {
    array.reverse();
    let value = array.pop();
    array.reverse();
    value
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Point {
    pub x: i32,
    pub y: i32,
}

impl Point {
    pub fn new(x: i32, y: i32) -> Point {
        Point { x, y }
    }
}

#[repr(u8)]
#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Action {
    HardDrop = 0,
    HoldPiece = 1,
    RotateClockWise = 2,
    RotateCounterClockWise = 3,
    MoveLeft = 4,
    MoveRight = 5,
    SoftDrop = 6,
    ToggleRunning = 7,
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    I = 0,
    O = 1,
    T = 2,
    S = 3,
    Z = 4,
    J = 5,
    L = 6,
    EMPTY = 7,
}

impl Cell {
    pub fn random() -> Cell {
        // TODO: implement So-called 7-bag Random Generator (also called "random bag" or "7 system")
        let piece = (js_sys::Math::random() * 6.0).round() as i32;
        match piece {
            0 => Cell::I,
            1 => Cell::O,
            2 => Cell::T,
            3 => Cell::S,
            4 => Cell::Z,
            5 => Cell::J,
            6 => Cell::L,
            7 => Cell::EMPTY,
            _ => Cell::EMPTY,
        }
    }

    pub fn random_piece_queue() -> Vec<Cell> {
        let mut cell_array = vec![Cell::I, Cell::O, Cell::T, Cell::S, Cell::Z, Cell::J, Cell::L];
        shuffle(&mut cell_array);
        cell_array
    }
    pub fn get_cells(&self) -> Vec<Cell> {
        match self {
            Cell::O => vec![Cell::O, Cell::O,
                            Cell::O, Cell::O],
            Cell::I => vec![Cell::EMPTY, Cell::EMPTY, Cell::EMPTY, Cell::EMPTY,
                            Cell::I,     Cell::I,     Cell::I,     Cell::I,
                            Cell::EMPTY, Cell::EMPTY, Cell::EMPTY, Cell::EMPTY,
                            Cell::EMPTY, Cell::EMPTY, Cell::EMPTY, Cell::EMPTY],
            Cell::T => vec![Cell::EMPTY, Cell::T,     Cell::EMPTY,
                            Cell::T,     Cell::T,     Cell::T,
                            Cell::EMPTY, Cell::EMPTY, Cell::EMPTY],
            Cell::S => vec![Cell::EMPTY, Cell::S,     Cell::S,
                            Cell::S,     Cell::S,     Cell::EMPTY,
                            Cell::EMPTY, Cell::EMPTY, Cell::EMPTY],
            Cell::Z => vec![Cell::Z,     Cell::Z,     Cell::EMPTY,
                            Cell::EMPTY, Cell::Z,     Cell::Z,
                            Cell::EMPTY, Cell::EMPTY, Cell::EMPTY],
            Cell::J => vec![Cell::EMPTY, Cell::EMPTY, Cell::J,
                            Cell::J,     Cell::J,     Cell::J,
                            Cell::EMPTY, Cell::EMPTY, Cell::EMPTY],
            Cell::L => vec![Cell::L,     Cell::EMPTY, Cell::EMPTY,
                            Cell::L,     Cell::L,     Cell::L,
                            Cell::EMPTY, Cell::EMPTY, Cell::EMPTY],
            _ => vec![Cell::EMPTY]
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum Rotation {
    NORTH = 1,
    EAST = 2,
    SOUTH = 3,
    WEST = 4,
}

impl Rotation {
    pub fn clockwise(&mut self) {
        let temp = self.clone();
        *self = match temp {
            Rotation::NORTH => Rotation::EAST,
            Rotation::EAST => Rotation::SOUTH,
            Rotation::SOUTH => Rotation::WEST,
            Rotation::WEST => Rotation::NORTH
        };
    }

    pub fn counter_clockwise(&mut self) {
        let temp = self.clone();
        *self = match temp {
            Rotation::NORTH => Rotation::WEST,
            Rotation::EAST => Rotation::NORTH,
            Rotation::SOUTH => Rotation::EAST,
            Rotation::WEST => Rotation::SOUTH
        }
    }

    pub fn next_rotation(&self, direction: Direction) -> Rotation {
        match direction {
            Direction::Left => {
                match self {
                    Rotation::NORTH => Rotation::WEST,
                    Rotation::EAST => Rotation::NORTH,
                    Rotation::SOUTH => Rotation::EAST,
                    Rotation::WEST => Rotation::SOUTH,
                }
            },
            Direction::Right => {
                match self {
                    Rotation::NORTH => Rotation::EAST,
                    Rotation::EAST => Rotation::SOUTH,
                    Rotation::SOUTH => Rotation::WEST,
                    Rotation::WEST => Rotation::NORTH,
                }
            },
        }
    }
}

struct Piece {
    timer: Timer,
    record_timer: f64,
    reset_timer: bool,
    cells: Vec<Cell>,
    rotation: Rotation,
    cell: Cell,
    position: Point,
}

impl Piece {
    pub fn random() -> Piece {
        let cell = Cell::random();
        let cells = cell.get_cells();
        let rotation = Rotation::NORTH;
        let position = match cell {
            Cell::O => Point { x: 4, y: 3 },
            Cell::I => Point { x: 3, y: 3 },
            _ =>       Point { x: 3, y: 3 }
        };

        Piece {
            timer: Timer::new(),
            record_timer: 0.0,
            reset_timer: false,
            cells,
            rotation,
            cell,
            position,
        }
    }

    pub fn new(cell: Cell) -> Piece {
        let cells = cell.get_cells();
        let rotation = Rotation::NORTH;
        let position = match cell {
            Cell::O => Point { x: 4, y: 3 },
            Cell::I => Point { x: 3, y: 3 },
            _ =>       Point { x: 3, y: 3 }
        };

        Piece {
            timer: Timer::new(),
            record_timer: 0.0,
            reset_timer: false,
            cells,
            rotation,
            cell,
            position,
        }
    }

    pub fn update(&mut self, elapsed_time: f64) {
        if self.reset_timer {
            self.record_timer = 0.0;
            self.reset_timer = false;
        }
        self.record_timer = self.record_timer + self.timer.get_elapsed_time(elapsed_time);
    }

    pub fn get_index(&self, row: i32, col: i32) -> usize {
        (self.get_bounding_box_size() * row + col) as usize
    }

    /**
     * rotations and stuff
     * https://www.youtube.com/watch?v=Atlr5vvdchY
     */
    pub fn rotate_clockwise(&mut self) {
        if self.record_timer > 0.5 {
            self.reset_timer = true;
        } else {
            return;
        }

        let box_size = self.get_bounding_box_size();
        if box_size == 2 {
            return;
        }

        if box_size == 4 {
            return;
        }

        // all other blocks
        let mut moves: Vec<(usize, usize)> = Vec::with_capacity(4);
        let pivot = Point { x: self.position.x + 1, y: self.position.y - 1 };
        for row in 0..box_size {
            for col in 0..box_size {

                let index = self.get_index(row, col);
                if self.cells[index] == Cell::EMPTY {
                    continue;
                }
                let world_point = Point { x: self.position.x + row, y: self.position.y - col };
                let rotated_vector_x = world_point.x - pivot.x;
                let rotated_vector_y = world_point.y - pivot.y;

                let transformed_vector_x = 0 * rotated_vector_x + -1 * rotated_vector_y;
                let transformed_vector_y = 1 * rotated_vector_x +  0 * rotated_vector_y;

                let new_world_x = pivot.x + transformed_vector_x;
                let new_world_y = pivot.y + transformed_vector_y;

                let new_local_x = new_world_x - self.position.x;
                let new_local_y = self.position.y - new_world_y;

                let new_index = (box_size * new_local_x + new_local_y) as usize;
                moves.push((index, new_index));
            }
        }

        for i in &moves {
            self.cells[i.0] = Cell::EMPTY;
        }
        for i in &moves {
            self.cells[i.1] = self.cell;
        }
        self.rotation.clockwise();
    }

    pub fn advance(&mut self) {
        self.position.y = self.position.y + 1;
    }

    pub fn move_piece(&mut self, direction: Direction) {
        if self.record_timer > 50.0 {
            self.reset_timer = true;
            match direction {
                Direction::Left => self.position.x -= 1,
                Direction::Right => self.position.x += 1,
            };
        }
    }

    pub fn get_origin(&self) -> Point {
        match self.cell {
            Cell::I => match self.rotation {
                Rotation::NORTH => Point {
                    x: self.position.x + 2,
                    y: self.position.y + 2
                },
                Rotation::WEST  => Point {
                    x: self.position.x + 1,
                    y: self.position.y + 1
                },
                Rotation::SOUTH => Point {
                    x: self.position.x + 2,
                    y: self.position.y + 2
                },
                Rotation::EAST  => Point {
                    x: self.position.x + 1,
                    y: self.position.y + 1
                },
            },
            _ => Point {
                x: self.position.x + 1,
                y: self.position.y + 1
            }
        }
    }

    pub fn get_bounding_box_size(&self) -> i32 {
        match self.cell {
            Cell::I => 4,
            Cell::O => 2,
            _ => 3
        }
    }

    pub fn get_piece(&self) -> * const Cell {
        self.cells.as_ptr()
    }
}

// TODO: test scoring system: https://tetris.fandom.com/wiki/Scoring#Guideline_scoring_system
#[wasm_bindgen]
pub struct Tetris {
    game: Game,
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

#[wasm_bindgen]
impl Tetris {
    pub fn new() -> Tetris {
        set_panic_hook();
        let game = Game::new();
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

        let mut piece = match pop_front(&mut piece_queue) {
            Some(x) => Piece::new(x),
            None => Piece::random()
        };
        piece.advance();
        let shadow_piece_position = Point::new(0, 0);
        let hold_piece = Cell::EMPTY;
        let can_swap_piece = true;
        let can_hard_drop = true;

        Tetris {
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
        let hd = 0 as u8;
        if !events.contains(&hd) {
            self.can_hard_drop = true;
        }
        for action in events {
            let stop_updating = match action {
                0 => self.hard_drop(),
                1 => self.hold_piece(),
                2 => self.rotate(Direction::Right), // self.rotate_clockwise(),
                3 => self.rotate(Direction::Left),// self.rotate_counter_clockwise(),
                4 => self.move_piece(Direction::Left),
                5 => self.move_piece(Direction::Right),
                6 => self.enable_soft_drop(),
                7 => self.game.toggle_pause(),
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
            // Tetris © 1985~XXXX Tetris Holding.
            // Tetris logos, Tetris theme song and Tetriminos are trademarks of Tetris Holding.
            // The Tetris trade dress is owned by Tetris Holding.
            // Licensed to The Tetris Company.
            // Tetris Game Design by Alexey Pajitnov.
            // Tetris Logo Design by Roger Dean.
            // All Rights Reserved.
    }

    pub fn get_score(&self) -> u32 {
        self.score
    }

    /// Return the width of the game board
    pub fn get_width(&self) -> i32 {
        self.width
    }

    /// Return the height of the game board
    pub fn get_height(&self) -> i32 {
        self.height
    }

    /// Return the offset height to make the game field
    /// 10 x 20
    pub fn get_offset_height(&self) -> i32 {
        self.height - 20
    }

    /// Return the next level's goal
    /// 
    /// The next levels goal is always the current level * 5
    pub fn get_next_level_goal(&self) -> u32 {
        // TODO: remove magic number
        self.level * 5
    }

    /// Return the current level of the game board
    pub fn get_level(&self) -> u32 {
        self.level
    }

    /// Return the number of rows that have been completed
    pub fn get_rows_completed(&self) -> u32 {
        self.rows_completed
    }

    pub fn get_hold_piece(&self) -> Cell {
        self.hold_piece
    }

    pub fn get_queued_pieces(&self) -> * const Cell {
        self.piece_queue.as_ptr()
    }

    /// Return a pointer to the first element in the boards vector
    pub fn get_cells(&self) -> * const Cell {
        self.cells.as_ptr()
    }

    /// Return the local coordinates of the active piece
    pub fn get_pieces(&self) -> * const Cell {
        self.piece.get_piece()
    }

    /// Get the pieces bounding box size
    pub fn get_piece_bounding_box(&self) -> i32 {
        self.piece.get_bounding_box_size()
    }

    /// Get the actives pieces type
    pub fn get_piece_type(&self) -> Cell {
        self.piece.cell
    }

    /// Get the world coordinates of the active piece position
    pub fn get_piece_position(&self) -> Point {
        self.piece.position.clone()
    }

    pub fn get_shadow_piece_position(&self) -> Point {
        self.shadow_piece_position.clone()
    }
}

impl Tetris {

    /// Convert row and column to a position inside of the
    /// board array
    fn get_index(&self, row: i32, col: i32) -> usize {
        ((self.width * row) + col) as usize
    }

    /// Merge piece into board of cells
    fn merge_piece_into_board(&mut self) {
        for row in 0..self.piece.get_bounding_box_size() {
            for col in 0..self.piece.get_bounding_box_size() {
                let cell = self.piece.cells[self.piece.get_index(row, col)];
                if cell == Cell::EMPTY {
                    continue;
                }
                let world_coord = Point {
                    x: self.piece.position.x + col,
                    y: self.piece.position.y + row
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
        // TODO: improve this by going backwards and stopping
        // after we find the first one
        for row in 0..self.piece.get_bounding_box_size() {
            for col in 0..self.piece.get_bounding_box_size() {
                let local_index = self.piece.get_index(row, col);
                if self.piece.cells[local_index] != Cell::EMPTY {

                    // 2. convert the local lowest row into world coordinates
                    let world_coord = Point {
                        x: self.piece.position.x + col,
                        y: self.piece.position.y + row
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
        // TODO: improve this by going backwards and stopping
        // after we find the first one
        for row in 0..self.piece.get_bounding_box_size() {
            for col in 0..self.piece.get_bounding_box_size() {
                let local_index = self.piece.get_index(row, col);
                if self.piece.cells[local_index] != Cell::EMPTY {

                    // 2. convert the local lowest row into world coordinates
                    let world_coord = Point {
                        x: self.piece.position.x + col,
                        y: self.piece.position.y + row
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
        // TODO: improve this by going backwards and stopping
        // after we find the first one
        for row in 0..self.piece.get_bounding_box_size() {
            for col in 0..self.piece.get_bounding_box_size() {
                let local_index = self.piece.get_index(row, col);
                if self.piece.cells[local_index] != Cell::EMPTY {

                    // 2. convert the local lowest row into world coordinates
                    let world_coord = Point {
                        x: self.piece.position.x + col,
                        y: self.piece.position.y + row
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
        //          Tetris line: 8 line
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
        let world_x = self.piece.position.x;
        let size = self.piece.get_bounding_box_size();
        for col in (0..size).rev() {
            if col + world_x >= self.width || col + world_x < 0 {
                // bounding box is off page, no point in checking
                continue;
            }
            for row in (0..size).rev() {
                let cell = self.piece.cells[self.piece.get_index(row, col)];
                if cell == Cell::EMPTY {
                    continue;
                }
                if world_y > self.height - (row + 1) {
                    world_y = self.height - (row + 1)
                }

                // find largest stack
                let mut breakout = false;
                let world_col = world_x + col;
                for world_row in self.piece.position.y..self.height {
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
        if self.piece.record_timer > 250.0 {
            self.piece.reset_timer = true;
        } else {
            return false;
        }

        if self.piece.cell == Cell::O {
            return false;
        }

        let box_size = self.piece.get_bounding_box_size();
        let pivot = self.piece.get_origin();
        let mut wall_kick_translation = Point::new(0, 0);
        let mut moves: Vec<(i32, i32)> = Vec::with_capacity(4);
        for row in 0..box_size {
            for col in 0..box_size {

                let local_index = self.piece.get_index(row, col);
                if self.piece.cells[local_index] == Cell::EMPTY {
                    continue;
                }
                let world_point = Point {
                    x: self.piece.position.x + col,
                    y: self.piece.position.y + row
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

                if self.piece.cell == Cell::I {
                    if direction == Direction::Right {
                        if self.piece.rotation == Rotation::NORTH || self.piece.rotation == Rotation::SOUTH {
                            new_world_x = new_world_x - 1;
                        } else if self.piece.rotation == Rotation::EAST || self.piece.rotation == Rotation::WEST {
                            new_world_x = new_world_x + 1;
                        }
                    } else if direction == Direction::Left {
                        if self.piece.rotation == Rotation::NORTH || self.piece.rotation == Rotation::SOUTH {
                            new_world_y = new_world_y - 1;
                        } else if self.piece.rotation == Rotation::EAST || self.piece.rotation == Rotation::WEST {
                            new_world_y = new_world_y + 1;
                        }
                    }
                }

                let new_local_x = new_world_x - self.piece.position.x;
                let new_local_y = new_world_y - self.piece.position.y;
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
        for i in 0..self.piece.cells.len() {
            self.piece.cells[i] = Cell::EMPTY;
        }
        for i in &moves {
            let new_index = self.piece.get_index(i.1, i.0);
            log!("{}, ({}, {})", new_index, i.0, i.1);
            self.piece.cells[new_index] = self.piece.cell;
        }
        self.piece.position.x = self.piece.position.x + wall_kick_translation.x;
        match direction {
            Direction::Right => self.piece.rotation.clockwise(),
            Direction::Left => self.piece.rotation.counter_clockwise(),
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
            self.score += ((self.height - self.piece.position.y) * 2) as u32;
            self.piece.position = self.shadow_piece_position;
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
            self.hold_piece = self.piece.cell;
            self.get_next_piece();
        } else {
            let new_piece = self.hold_piece;
            self.hold_piece = self.piece.cell;
            self.piece = Piece::new(new_piece);
        }
        self.can_swap_piece = false;
        true
    }

    fn get_next_piece(&mut self) {
        self.piece = match pop_front(&mut self.piece_queue) {
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