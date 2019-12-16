use super::game_timer::Timer;
use super::rotation::{Rotation, Direction};
use super::cell::Cell;
use super::point::Point;

/// Piece tracks where the falling piece is relative to the game board.
/// Piece depends on tetris for information on when to do certain events
pub struct Piece {
    timer: Timer,
    record_timer: f64,
    reset_timer: bool,
    cells: Vec<Cell>,
    rotation: Rotation,
    cell: Cell,
    position: Point,
}

impl Piece {
    /// Create a piece that is a random value
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

    /// Create a new piece using a cell
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

    /// Update the moving piece
    pub fn update(&mut self, elapsed_time: f64) {
        if self.reset_timer {
            self.record_timer = 0.0;
            self.reset_timer = false;
        }
        self.record_timer = self.record_timer + self.timer.get_elapsed_time(elapsed_time);
    }

    /// Can piece rotate is only true after a certain amount of time
    /// passes
    pub fn can_piece_rotate(&self) -> bool {
        // TODO: remove magic number
        self.record_timer > 250.0
    }

    pub fn reset_timer(&mut self) {
        self.reset_timer = true;
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

    // TODO: Please clean this up and actually fix the functions so that the
    //       timer is not in the way
    pub fn FORCE_MOVE_PIECE(&mut self, direction: Direction) {
        match direction {
            Direction::Left => self.position.x -= 1,
            Direction::Right => self.position.x += 1,
        };
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

    pub fn get_type(&self) -> Cell {
        self.cell
    }

    pub fn get_position(&self) -> Point {
        self.position
    }

    pub fn set_position(&mut self, position: Point) {
        self.position = position;
    }

    pub fn get_cells(&self) -> &Vec<Cell> {
        &self.cells
    }

    pub fn set_cell(&mut self, index: usize, cell: Cell) {
        self.cells[index] = cell;
    }

    pub fn get_rotation(&self) -> Rotation {
        self.rotation
    }

}