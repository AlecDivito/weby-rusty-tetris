use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
#[repr(u8)]
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
    Nothing = 255,
}

impl std::convert::From<u8> for Action {
    fn from(byte: u8) -> Self {
        match byte {
            0 => Action::HardDrop,
            1 => Action::HoldPiece,
            2 => Action::RotateClockWise,
            3 => Action::RotateCounterClockWise,
            4 => Action::MoveLeft,
            5 => Action::MoveRight,
            6 => Action::SoftDrop,
            7 => Action::ToggleRunning,
            _ => Action::Nothing,
        }
    }
}
