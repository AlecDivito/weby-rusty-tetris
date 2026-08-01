use wasm_bindgen::prelude::wasm_bindgen;

/// A Cell is a byte representation of a possible pieces value
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

    /// pick a random cell
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

    /// Get a random queue of next pieces to pick to start falling
    pub fn random_piece_queue() -> Vec<Cell> {
        let mut cell_array = vec![Cell::I, Cell::O, Cell::T, Cell::S, Cell::Z, Cell::J, Cell::L];
        Cell::shuffle(&mut cell_array);
        cell_array
    }

    /// Get the cell represented in a 4x4 grid in a 1D array
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

    /// Random generator for next piece position
    /// Read More: https://tetris.fandom.com/wiki/Random_Generator
    fn shuffle<T>(array: &mut Vec<T>) {
        for i in (0..array.len()).rev() {
            let mut j = (js_sys::Math::random() * ((i as f64) + 1.0)).round() as usize;
            if j >= array.len() {
                j = array.len() - 1;
            }
            array.swap(i, j);
        }
    }
}