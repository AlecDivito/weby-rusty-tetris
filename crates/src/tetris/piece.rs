use super::cell::Cell;
use super::game_timer::Timer;
use super::point::Point;
use super::rotation::{Direction, Rotation};

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
            _ => Point { x: 3, y: 3 },
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
            _ => Point { x: 3, y: 3 },
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

    pub fn get_record_timer(&self) -> f64 {
        self.record_timer
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
        let pivot = Point {
            x: self.position.x + 1,
            y: self.position.y - 1,
        };
        for row in 0..box_size {
            for col in 0..box_size {
                let index = self.get_index(row, col);
                if self.cells[index] == Cell::EMPTY {
                    continue;
                }
                let world_point = Point {
                    x: self.position.x + row,
                    y: self.position.y - col,
                };
                let rotated_vector_x = world_point.x - pivot.x;
                let rotated_vector_y = world_point.y - pivot.y;

                let transformed_vector_x = 0 * rotated_vector_x + -1 * rotated_vector_y;
                let transformed_vector_y = 1 * rotated_vector_x + 0 * rotated_vector_y;

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

    pub fn force_move_piece(&mut self, direction: Direction) {
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
                    y: self.position.y + 2,
                },
                Rotation::WEST => Point {
                    x: self.position.x + 1,
                    y: self.position.y + 1,
                },
                Rotation::SOUTH => Point {
                    x: self.position.x + 2,
                    y: self.position.y + 2,
                },
                Rotation::EAST => Point {
                    x: self.position.x + 1,
                    y: self.position.y + 1,
                },
            },
            _ => Point {
                x: self.position.x + 1,
                y: self.position.y + 1,
            },
        }
    }

    pub fn get_bounding_box_size(&self) -> i32 {
        match self.cell {
            Cell::I => 4,
            Cell::O => 2,
            _ => 3,
        }
    }

    pub fn get_piece(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn get_type(&self) -> Cell {
        self.cell
    }

    pub(crate) fn get_position_ref(&mut self) -> &mut Point {
        &mut self.position
    }

    pub fn get_position(&self) -> Point {
        self.position.clone()
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

    #[cfg(test)]
    pub fn set_timer(&mut self, timer: f64) {
        self.record_timer = timer
    }
}

#[cfg(test)]
mod test {

    use crate::tetris::action::Action;
    use crate::tetris::cell::Cell;
    use crate::tetris::game::Game;
    use crate::tetris::piece::Piece;
    use crate::tetris::point::Point;

    fn action(game: &mut Game, action: Action) {
        game.get_piece().set_timer(1000.0);
        game.event_handler(&mut [action]);
    }

    fn actions(game: &mut Game, actions: &[Action]) {
        let mut vec_actions = actions.to_vec();
        game.get_piece().set_timer(1000.0);
        game.event_handler(&mut vec_actions);
    }

    #[test]
    pub fn test_rotation_left() {
        let mut game = Game::new();
        let mut piece = Piece::new(Cell::I);
        let moves = [Action::RotateClockWise, Action::MoveLeft];
        piece.set_position(Point::new(0, 5));
        game.set_piece(piece);

        actions(&mut game, &moves);
        actions(&mut game, &moves);

        let position = game.get_piece_position();
        assert_eq!(position.x, 0);
        assert_eq!(position.y, 5);
        game.merge_piece_into_board();
        let cells = game.get_cell_vec();
        assert_eq!(cells[game.get_index(7, 0)], Cell::I);
        assert_eq!(cells[game.get_index(7, 1)], Cell::I);
        assert_eq!(cells[game.get_index(7, 2)], Cell::I);
        assert_eq!(cells[game.get_index(7, 3)], Cell::I);
    }

    #[test]
    pub fn test_rotation_left_2() {
        let mut game = Game::new();
        let mut piece = Piece::new(Cell::I);
        let moves = [Action::RotateClockWise, Action::MoveLeft];
        piece.set_position(Point::new(0, 5));
        game.set_piece(piece);

        actions(&mut game, &moves);
        actions(&mut game, &moves);
        actions(&mut game, &moves);
        actions(&mut game, &moves);
        actions(&mut game, &moves);
        actions(&mut game, &moves);

        let position = game.get_piece_position();
        assert_eq!(position.x, 0);
        assert_eq!(position.y, 5);
        game.merge_piece_into_board();
        let cells = game.get_cell_vec();
        assert_eq!(cells[game.get_index(7, 0)], Cell::I);
        assert_eq!(cells[game.get_index(7, 1)], Cell::I);
        assert_eq!(cells[game.get_index(7, 2)], Cell::I);
        assert_eq!(cells[game.get_index(7, 3)], Cell::I);
    }

    #[test]
    pub fn test_rotation_right() {
        let mut game = Game::new();
        let mut piece = Piece::new(Cell::I);
        piece.set_position(Point::new(game.get_width() - 4, 5));
        game.set_piece(piece);

        // start flat
        action(&mut game, Action::RotateClockWise);
        action(&mut game, Action::RotateClockWise);
        action(&mut game, Action::RotateClockWise);
        action(&mut game, Action::MoveRight);
        action(&mut game, Action::MoveRight);
        let position = game.get_piece_position();
        assert_eq!(position.x, game.get_width() - 2);
        assert_eq!(position.y, 5);
        action(&mut game, Action::RotateClockWise);

        game.update_shadow_piece_position();
        game.merge_piece_into_board();
        game.print();
        let position = game.get_piece_position();
        assert_eq!(position.x, game.get_width() - 4);
        assert_eq!(position.y, 5);
        let cells = game.get_cell_vec();
        let max = game.get_width();
        assert_eq!(cells[game.get_index(6, max - 1)], Cell::I);
        assert_eq!(cells[game.get_index(6, max - 2)], Cell::I);
        assert_eq!(cells[game.get_index(6, max - 3)], Cell::I);
        assert_eq!(cells[game.get_index(6, max - 4)], Cell::I);
    }

    #[test]
    pub fn test_shadow_always_on_floor() {
        let mut game = Game::new();

        let mut piece = Piece::new(Cell::I);
        piece.set_position(Point::new(3, 5));
        game.set_piece(piece);
        game.update_shadow_piece_position();
        game.merge_piece_into_board();

        let mut piece = Piece::new(Cell::L);
        piece.set_position(Point::new(2, 6));
        game.set_piece(piece);
        game.update_shadow_piece_position();
        game.merge_piece_into_board();

        game.print();

        let cells = game.get_cell_vec();
        let shadow_position = game.get_shadow_piece_position();

        assert_eq!(cells[game.get_index(6, 3)], Cell::I);
        assert_eq!(cells[game.get_index(6, 4)], Cell::I);
        assert_eq!(cells[game.get_index(6, 5)], Cell::I);
        assert_eq!(cells[game.get_index(6, 6)], Cell::I);

        assert_eq!(cells[game.get_index(6, 2)], Cell::L);
        assert_eq!(cells[game.get_index(7, 2)], Cell::L);
        assert_eq!(cells[game.get_index(7, 3)], Cell::L);
        assert_eq!(cells[game.get_index(7, 4)], Cell::L);

        assert_eq!(shadow_position.x, 2);
        assert_eq!(shadow_position.y, 23);
    }

    #[test]
    pub fn test_l_rotation_1() {
        let mut game = Game::from(
            r#" 
        LLLLL LLLL
        LLL    LLL
        LLLLL LLLL
        LLLLL LLLL
        "#,
        );

        let mut piece = Piece::new(Cell::I);
        piece.set_position(Point::new(3, 0));
        game.set_piece(piece);
        action(&mut game, Action::RotateClockWise);
        game.update_shadow_piece_position();
        game.merge_piece_into_board();
        game.print();

        let cells = game.get_cell_vec();
        assert_eq!(cells[game.get_index(0, 5)], Cell::I);
        assert_eq!(cells[game.get_index(1, 5)], Cell::I);
        assert_eq!(cells[game.get_index(2, 5)], Cell::I);
        assert_eq!(cells[game.get_index(3, 5)], Cell::I);
    }

    #[test]
    pub fn test_l_rotation_2() {
        let mut game = Game::from(
            r#" 
        LLLLL LLLL
        LLLLL LLLL
        LLL    LLL
        LLLLL LLLL
        "#,
        );

        let mut piece = Piece::new(Cell::I);
        piece.set_position(Point::new(3, 0));
        game.set_piece(piece);
        action(&mut game, Action::RotateClockWise);
        action(&mut game, Action::RotateClockWise);
        game.update_shadow_piece_position();
        game.merge_piece_into_board();
        game.print();

        let cells = game.get_cell_vec();
        assert_eq!(cells[game.get_index(2, 3)], Cell::I);
        assert_eq!(cells[game.get_index(2, 4)], Cell::I);
        assert_eq!(cells[game.get_index(2, 5)], Cell::I);
        assert_eq!(cells[game.get_index(2, 6)], Cell::I);
    }

    #[test]
    pub fn test_cant_move_left_right() {
        let mut game = Game::from(
            r#"
        LLLLL LLLL
        LLL    LLL
        LLLLL LLLL
        LLLLL LLLL
        "#,
        );

        let mut piece = Piece::new(Cell::I);
        piece.set_position(Point::new(3, 0));
        game.set_piece(piece);
        action(&mut game, Action::RotateClockWise);
        action(&mut game, Action::MoveRight);
        action(&mut game, Action::MoveLeft);
        game.update_shadow_piece_position();
        game.merge_piece_into_board();
        game.print();

        let cells = game.get_cell_vec();
        assert_eq!(cells[game.get_index(0, 5)], Cell::I);
        assert_eq!(cells[game.get_index(1, 5)], Cell::I);
        assert_eq!(cells[game.get_index(2, 5)], Cell::I);
        assert_eq!(cells[game.get_index(3, 5)], Cell::I);
    }

    #[test]
    pub fn test_game_over() {
        let mut game = Game::from(
            r#" 
        __________
        LLL_______
        LLL_______
        LLL_______
        "#,
        );

        let mut piece = Piece::new(Cell::I);
        piece.set_position(Point::new(3, 0));
        game.set_piece(piece);
        action(&mut game, Action::RotateClockWise);
        action(&mut game, Action::RotateClockWise);
        game.update_shadow_piece_position();
        game.merge_piece_into_board();
        game.print();

        let cells = game.get_cell_vec();
        assert_eq!(cells[game.get_index(2, 3)], Cell::I);
        assert_eq!(cells[game.get_index(2, 4)], Cell::I);
        assert_eq!(cells[game.get_index(2, 5)], Cell::I);
        assert_eq!(cells[game.get_index(2, 6)], Cell::I);
    }
}
