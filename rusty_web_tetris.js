import * as wasm from './rusty_web_tetris_bg.wasm';

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }
/**
* A Cell is a byte representation of a possible pieces value
*/
export const Cell = Object.freeze({ I:0,O:1,T:2,S:3,Z:4,J:5,L:6,EMPTY:7, });
/**
*/
export const Action = Object.freeze({ HardDrop:0,HoldPiece:1,RotateClockWise:2,RotateCounterClockWise:3,MoveLeft:4,MoveRight:5,SoftDrop:6,ToggleRunning:7,Nothing:255, });
/**
*/
export class Game {

    static __wrap(ptr) {
        const obj = Object.create(Game.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_game_free(ptr);
    }
    /**
    * Create a new tetris game
    * @returns {Game}
    */
    static new() {
        var ret = wasm.game_new();
        return Game.__wrap(ret);
    }
    /**
    * TODO: Look into changing u8 into Action
    * wasm_bindgen should be able to have custom types
    * @param {Uint8Array} events
    */
    event_handler(events) {
        try {
            var ptr0 = passArray8ToWasm0(events, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.game_event_handler(this.ptr, ptr0, len0);
        } finally {
            events.set(getUint8Memory0().subarray(ptr0 / 1, ptr0 / 1 + len0));
            wasm.__wbindgen_free(ptr0, len0 * 1);
        }
    }
    /**
    * @param {number} target_x_pos
    * @param {number} target_y_pos
    */
    touch_event_handler(target_x_pos, target_y_pos) {
        wasm.game_touch_event_handler(this.ptr, target_x_pos, target_y_pos);
    }
    /**
    * Update the tetris board
    * @param {number} this.ptr
    * @returns {bool}
    */
    update(elapsed_time) {
        var ret = wasm.game_update(this.ptr, elapsed_time);
        return ret !== 0;
    }
    /**
    * @returns {bool}
    */
    is_game_over() {
        var ret = wasm.game_is_game_over(this.ptr);
        return ret !== 0;
    }
    /**
    * Get the current score of the running game
    * @returns {number}
    */
    get_score() {
        var ret = wasm.game_get_score(this.ptr);
        return ret >>> 0;
    }
    /**
    * Get the width of the game board
    * @returns {number}
    */
    get_width() {
        var ret = wasm.game_get_width(this.ptr);
        return ret;
    }
    /**
    * Get the height of the game board
    * @returns {number}
    */
    get_height() {
        var ret = wasm.game_get_height(this.ptr);
        return ret;
    }
    /**
    * Get the amount of seconds the game has been played for
    * @returns {number}
    */
    get_seconds() {
        var ret = wasm.game_get_seconds(this.ptr);
        return ret;
    }
    /**
    * Get the offset height to make the game field
    * @returns {number}
    */
    get_offset_height() {
        var ret = wasm.game_get_offset_height(this.ptr);
        return ret;
    }
    /**
    * Return the current level of the game board
    * @returns {number}
    */
    get_level() {
        var ret = wasm.game_get_level(this.ptr);
        return ret >>> 0;
    }
    /**
    * Return the number of rows that have been completed
    * @returns {number}
    */
    get_rows_completed() {
        var ret = wasm.game_get_rows_completed(this.ptr);
        return ret >>> 0;
    }
    /**
    * Get the current piece that is currently being held
    * @returns {number}
    */
    get_hold_piece() {
        var ret = wasm.game_get_hold_piece(this.ptr);
        return ret >>> 0;
    }
    /**
    * Get the cells that are in queue to go next
    * TODO: Give interface to be called without wasm_bindgen
    * @returns {number}
    */
    get_queued_pieces() {
        var ret = wasm.game_get_queued_pieces(this.ptr);
        return ret;
    }
    /**
    * Return a pointer to the first element in the boards vector
    * TODO: Give interface to be called without wasm_bindgen
    * @returns {number}
    */
    get_cells() {
        var ret = wasm.game_get_cells(this.ptr);
        return ret;
    }
    /**
    * Get the cells that make up the falling piece
    * TODO: Give interface to be called without wasm_bindgen
    * @returns {number}
    */
    get_pieces() {
        var ret = wasm.game_get_pieces(this.ptr);
        return ret;
    }
    /**
    * Get the pieces bounding box size
    * @returns {number}
    */
    get_piece_bounding_box() {
        var ret = wasm.game_get_piece_bounding_box(this.ptr);
        return ret;
    }
    /**
    * Get the actives pieces type
    * @returns {number}
    */
    get_piece_type() {
        var ret = wasm.game_get_piece_type(this.ptr);
        return ret >>> 0;
    }
    /**
    * Get the world coordinates of the active piece position
    * @returns {Point}
    */
    get_piece_position() {
        var ret = wasm.game_get_piece_position(this.ptr);
        return Point.__wrap(ret);
    }
    /**
    * Get the position of the shadow piece
    * @returns {Point}
    */
    get_shadow_piece_position() {
        var ret = wasm.game_get_shadow_piece_position(this.ptr);
        return Point.__wrap(ret);
    }
}
/**
*/
export class Point {

    static __wrap(ptr) {
        const obj = Object.create(Point.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_point_free(ptr);
    }
    /**
    * @returns {number}
    */
    get x() {
        var ret = wasm.__wbg_get_point_x(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_point_x(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        var ret = wasm.__wbg_get_point_y(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_point_y(this.ptr, arg0);
    }
}

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export const __widl_f_log_1_ = function(arg0) {
    console.log(getObject(arg0));
};

export const __wbg_random_40717e477b6813d8 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

