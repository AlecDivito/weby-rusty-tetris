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
}

pub enum Rotation {
    NORTH = 1,
    EAST = 2,
    SOUTH = 3,
    WEST = 4,
}

impl Rotation {
    pub fn clockwise(rotation: Rotation) -> Rotation {
        match rotation {
            NORTH => Rotation::EAST,
            EAST => Rotation::SOUTH,
            SOUTH => Rotation::WEST,
            WEST => Rotation::NORTH
        }
    }

    pub fn counter_clockwise(rotation: Rotation) -> Rotation {
        match rotation {
            NORTH => Rotation::WEST,
            EAST => Rotation::NORTH,
            SOUTH => Rotation::EAST,
            WEST => Rotation::SOUTH
        }
    }

}

pub struct Point {
    x: i32,
    y: i32,
}

#[wasm_bindgen]
pub struct Piece {
    cells: Vec<Cell>,
    rotation: Rotation,
    cell: Cell,
    position: Point,
}

impl Piece {
    pub fn new() -> Piece {
        let piece = 1;

        let x = 4;
        let y = 22;

        let cell = Cell::random();

        let cells: Vec<Cell> = match cell {
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
        };

        let rotation = Rotation::NORTH;

        let position = Point {
            x,
            y,
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
    pub fn rotate(&mut self) {
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
                let vector_r_x = world_point.x - pivot.x;
                let vector_r_y = world_point.y - pivot.y;

                let transformed_vector_x = 0 * vector_r_x + -1 * vector_r_y;
                let transformed_vector_y = 1 * vector_r_x +  0 * vector_r_y;

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
    }

    pub fn advance(&mut self) {
        self.position.y = self.position.y - 1;
    }

    pub fn move_left(&mut self) {
        self.position.x = self.position.x - 1;
    }

    pub fn move_right(&mut self) {
        self.position.x = self.position.x + 1;
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
    level: i32,
    width: i32,
    height: i32,
    cells: Vec<Cell>,
    piece: Piece,
}

#[wasm_bindgen]
impl Tetris {
    pub fn new() -> Tetris {
        let level = 1;
        let width = 10;
        let height = 40;

        let cells = (0..width * height)
            .map(|_i| Cell::EMPTY).collect();

        let piece = Piece::new();

        Tetris {
            level,
            width,
            height,
            cells,
            piece,
        }
    }

    pub fn update(&mut self) {
        if self.can_piece_advance() {
            self.piece.advance();
        } else {
            // 1. move piece into cells
            let height = self.height / 2;
            for row in 0..self.piece.get_bounding_box_size() {
                for col in 0..self.piece.get_bounding_box_size() {
                    let cell = self.piece.cells[self.piece.get_index(row, col)];
                    if cell == Cell::EMPTY {
                        continue;
                    }
                    let world_coord = Point { x: self.piece.position.x + col, y: (height - self.piece.position.y) + row };

                    let index = self.get_index(world_coord.y, world_coord.x);
                    self.cells[index] = cell;
                }
            }
            // 2. create a new piece
            self.piece = Piece::new();
        }
    }

    pub fn get_width(&self) -> i32 {
        self.width
    }

    pub fn get_height(&self) -> i32 {
        self.height
    }

    pub fn get_level(&self) -> i32 {
        self.level
    }

    pub fn get_cells(&self) -> * const Cell {
        self.cells.as_ptr()
    }

    pub fn can_piece_advance(&self) -> bool {
        let mut can_advance = true;

        if self.piece.position.y - self.piece.get_bounding_box_size() > 0 {
            return can_advance;
        }

        let row = self.piece.position.y - 1;
        log!("{} = {} * 2 - {}", row, self.piece.get_bounding_box_size(), self.piece.position.y);
        for col in 0..self.piece.get_bounding_box_size() {
            let index = self.piece.get_index(row, col);
            log!("({}, {}) = {}", row, col, index);
            if self.piece.cells[index] != Cell::EMPTY {
                can_advance = false;
                break;
            }
        }

        can_advance
    }

    /**
     * All of this stuff is used to talk to the piece
     */
    pub fn get_pieces(&self) -> * const Cell {
        self.piece.get_piece()
    }

    pub fn get_piece_bounding_box(&self) -> i32 {
        self.piece.get_bounding_box_size()
    }

    pub fn get_piece_type(&self) -> Cell {
        self.piece.cell
    }

    pub fn get_piece_x(&self) -> i32 {
        self.piece.position.x
    }

    pub fn get_piece_y(&self) -> i32 {
        self.piece.position.y
    }

    pub fn move_left(&mut self) {
        if self.piece.position.x > 0 {
            self.piece.move_left();
        } else {
            // not just a simple move
            // check if the bounding box has any non-empty
            // cells in the left most column
            for row in 0..self.piece.get_bounding_box_size() {
                let index = self.piece.get_index(row, self.piece.position.x * -1);
                if self.piece.cells[index] != Cell::EMPTY {
                    return;
                }
            }
            self.piece.move_left();
        }
    }

    pub fn move_right(&mut self) {
        if self.piece.position.x < self.width - self.piece.get_bounding_box_size() {
            self.piece.move_right();
        } else {
            // not just a simple move
            // check if the bounding box has any non-empty
            // cells in the left most column
            for row in 0..self.piece.get_bounding_box_size() {
                let index = self.piece.get_index(row, (self.piece.get_bounding_box_size() * 2 + self.piece.position.x) - self.width - 1 );
                if self.piece.cells[index] != Cell::EMPTY {
                    return;
                }
            }
            self.piece.move_right();
        }
    }

    pub fn rotate(&mut self) {
        self.piece.rotate();
    }
}

impl Tetris {

    fn get_index(&self, row: i32, col: i32) -> usize {
        (self.width * row + col) as usize
    }
}