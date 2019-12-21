/// Rotation of an object in 4 cardinal directions
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Rotation {
    NORTH = 1,
    EAST = 2,
    SOUTH = 3,
    WEST = 4,
}

/// Possible directions that a piece can move
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum Direction {
    Left,
    Right,
}

impl Rotation {
    /// Set the current rotation to the next position it will be in in one
    /// clockwise rotation
    pub fn clockwise(&mut self) {
        let temp = self.clone();
        *self = match temp {
            Rotation::NORTH => Rotation::EAST,
            Rotation::EAST => Rotation::SOUTH,
            Rotation::SOUTH => Rotation::WEST,
            Rotation::WEST => Rotation::NORTH
        };
    }

    /// Set the current rotation to the next position it will be in in one
    /// counter clockwise rotation
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