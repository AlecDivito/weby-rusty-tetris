mod utils;

extern crate web_sys;
extern crate js_sys;

use web_sys::console;
use wasm_bindgen::prelude::*;

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

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Point {
    pub x: i32,
    pub y: i32,
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

}

struct Piece {
    cells: Vec<Cell>,
    rotation: Rotation,
    cell: Cell,
    position: Point,
}

impl Piece {
    pub fn new() -> Piece {
        let cell = Cell::random();
        let cells = cell.get_cells();
        let rotation = Rotation::NORTH;
        let position = match cell {
            Cell::O => Point { x: 4, y: 3 },
            Cell::I => Point { x: 3, y: 3 },
            _ =>       Point { x: 3, y: 3 }
        };

        Piece {
            cells,
            rotation,
            cell,
            position,
        }
    }

    pub fn get_index(&self, row: i32, col: i32) -> usize {
        (self.get_bounding_box_size() * row + col) as usize
    }

    /**
     * rotations and stuff
     * https://www.youtube.com/watch?v=Atlr5vvdchY
     */
    pub fn rotate_clockwise(&mut self) {
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

    pub fn move_left(&mut self) {
        self.position.x = self.position.x - 1;
    }

    pub fn move_right(&mut self) {
        self.position.x = self.position.x + 1;
    }

    pub fn get_origin(&self) -> Point {
        match self.cell {
            Cell::I => match self.rotation {
                Rotation::NORTH => Point {
                    x: self.position.x + 2,
                    y: self.position.y + 2
                },
                Rotation::EAST  => Point {
                    x: self.position.x + 1,
                    y: self.position.y + 1
                },
                Rotation::SOUTH => Point {
                    x: self.position.x + 2,
                    y: self.position.y + 2
                },
                Rotation::WEST  => Point {
                    x: self.position.x + 1,
                    y: self.position.y + 1
                }
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

#[wasm_bindgen]
pub struct Tetris {
    rows_completed: u32,
    level: u32,
    width: i32,
    height: i32,
    cells: Vec<Cell>,
    piece: Piece,
}

#[wasm_bindgen]
impl Tetris {
    pub fn new() -> Tetris {
        let rows_completed = 0;
        let level = 1;
        let width = 10;
        let height = 25;

        let cells = (0..width * height)
            .map(|_i| Cell::EMPTY).collect();

        let piece = Piece::new();

        Tetris {
            rows_completed,
            level,
            width,
            height,
            cells,
            piece,
        }
    }

    /// Update the tetris board
    pub fn update(&mut self) {
        // TODO: use controller controls
        //       https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
        // TODO: add mouse tracking
        if self.can_piece_advance() {
            self.piece.advance();
        } else {
            self.merge_piece_into_board();
        }
        // TODO: when landing, use a half second lock delay
        //       https://tetris.fandom.com/wiki/Lock_delay

        // TODO: if piece was just merged and new piece was generated
        //       Immediately drop one space if no existing Block is in its path

        // TODO: implement Hold piece
        //       when putting a piece into the hold box, if there is a piece, swap the two pieces
        //       otherwise just put the hold piece in the box
        //       you can only swap piece once
        //       enabled by default

        // TODO: Sound effect on by default
        //       effect for rotation, movement, landing on surface, touching a wall,
        //       locking, line clear, game over

        // TODO: Must have music (song must be Korobeiniki)
        //       music on by default

        // TODO: Ghost Piece
        //       enabled by default

        // TODO: when starting game or resuming a game, trigger a count down timer from 3

        // TODO: implement game features
        //       Leveling up can be by using a fixed goal (10 lines)
        //       Or using a variable goal (5 times the level number)
        //       if using variable goal: (use https://tetris.fandom.com/wiki/Scoring#Guideline_scoring_system)
        //          Single line: 1 line
        //          Double line: 3 line
        //          Triple line: 5 line
        //          Tetris line: 8 line
        // Get extra points by doing T-spins: https://tetris.fandom.com/wiki/T-Spin
        //      T-spin algorithm seems really hard so you don't need to really do this
        // Marathon mode must have 15 levels
        // 2 or 3 minute timed mode (called ultra)
        // scoring system: https://tetris.fandom.com/wiki/Scoring#Guideline_scoring_system
        // Lose game when a piece top outs: https://tetris.fandom.com/wiki/Top_out

        // TODO: show 1 to 6 "next" pieces
        //       set the default to 6

        // TODO: Game must have this notice when the game starts (XXXX is the year the game was created)
            // Tetris © 1985~XXXX Tetris Holding.
            // Tetris logos, Tetris theme song and Tetriminos are trademarks of Tetris Holding.
            // The Tetris trade dress is owned by Tetris Holding.
            // Licensed to The Tetris Company.
            // Tetris Game Design by Alexey Pajitnov.
            // Tetris Logo Design by Roger Dean.
            // All Rights Reserved.

        // TODO:
        //  - Up arrow and X are to rotate 90° clockwise.
        //  - Space to hard drop.
        //  - Shift and C are to hold.
        //  - Ctrl and Z are to rotate 90° counterclockwise.
        //  - Esc and F1 are to pause.
        //  - Left, right, and down arrows are the same as on the console.
        //  - Number pad controls:
        //      - 0 is to hold.
        //      - 8, 4, 6, and 2 are hard drop, left shift, right shift, and soft drop respectively.
        //      - 1, 5, and 9 are to rotate 90° clockwise.
        //      - 3 and 7 are to rotate 90° counterclockwise.
    }

    /// Return the width of the game board
    pub fn get_width(&self) -> i32 {
        self.width
    }

    /// Return the height of the game board
    pub fn get_height(&self) -> i32 {
        self.height
    }

    /// Return the current level of the game board
    pub fn get_level(&self) -> u32 {
        self.level
    }

    /// Return the number of rows that have been completed
    pub fn get_rows_completed(&self) -> u32 {
        self.rows_completed
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

    /// Try to move the active piece left
    pub fn move_left(&mut self) {
        if self.can_piece_go_left() {
            self.piece.move_left();
        }
    }

    /// Try to move the active piece right
    pub fn move_right(&mut self) {
        if self.can_piece_go_right() {
            self.piece.move_right();
        }
    }

    /// Try to rotate the active piece
    pub fn rotate(&mut self) {
        if self.piece.cell == Cell::O {
            return;
        }

        let box_size = self.piece.get_bounding_box_size();
        let pivot = self.piece.get_origin();
        log!("{} {}, {} {}", self.piece.position.x, self.piece.position.y, pivot.x, pivot.y);
        let mut moves: Vec<(usize, usize)> = Vec::with_capacity(4);
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

                let transformed_vector_x = 0 * rotated_vector_x + -1 * rotated_vector_y;
                let transformed_vector_y = 1 * rotated_vector_x +  0 * rotated_vector_y;

                let mut new_world_x = pivot.x + transformed_vector_x;
                let new_world_y = pivot.y + transformed_vector_y;

                if self.piece.cell == Cell::I {
                    if self.piece.rotation == Rotation::NORTH || self.piece.rotation == Rotation::SOUTH{
                        new_world_x = new_world_x - 1;
                    } else if self.piece.rotation == Rotation::EAST || self.piece.rotation == Rotation::WEST {
                        new_world_x = new_world_x + 1;
                    }
                }

                // 1. check if move is valid. If move is not valid, don't rotate
                // 1.1 check if piece is inside right wall
                // TODO: Add kick back
                if new_world_x > self.width - 1 {
                    return;
                }
                // 1.2 check if piece is inside left wall
                // TODO: Add kick back
                if new_world_x < 0 {
                    return;
                }

                let new_local_x = new_world_x - self.piece.position.x;
                let new_local_y = new_world_y - self.piece.position.y;


                let new_index = self.piece.get_index(new_local_y, new_local_x);

                // 1.3 check if piece is inside piece
                // TODO: Add kick back
                let new_world_index = self.get_index(new_world_y, new_world_x);
                if self.cells[new_world_index] != Cell::EMPTY {
                    return;
                }

                moves.push((local_index, new_index));
            }
        }
        // move pieces
        for i in &moves {
            self.piece.cells[i.0] = Cell::EMPTY;
        }
        for i in &moves {
            self.piece.cells[i.1] = self.piece.cell;
        }
        self.piece.rotation.clockwise();
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
        // 1. move piece into cells
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
        // 2. create a new piece
        self.piece = Piece::new();
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
}