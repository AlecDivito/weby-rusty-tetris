use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub struct Config {
    pub current_score: u32,
    pub current_level: u32,
    pub current_rows_completed: u32,

    pub width: u32,
    pub height: u32,
    pub next_goal_multiplier: u32,
    pub one_row_completed_score: u32,
    pub two_row_completed_score: u32,
    pub three_row_completed_score: u32,
    pub four_row_completed_score: u32,
    pub combo_increment: u32,
    pub soft_drop_speed_multiplier: f64,
    pub speed_multiplier: f64,
    pub max_piece_queue_size: usize,
    pub piece_rotation_wait_time: f64,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            width: 10,
            height: 25,
            current_level: 1,
            current_score: 0,
            current_rows_completed: 0,
            next_goal_multiplier: 5,
            one_row_completed_score: 100,
            two_row_completed_score: 300,
            three_row_completed_score: 500,
            four_row_completed_score: 800,
            combo_increment: 50,
            soft_drop_speed_multiplier: 0.05,
            speed_multiplier: 0.0007,
            max_piece_queue_size: 7,
            piece_rotation_wait_time: 250.0
        }
    }
}
