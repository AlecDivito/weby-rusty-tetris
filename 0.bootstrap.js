(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../rusty-web-tetris/pkg/rusty_web_tetris.js":
/*!***************************************************!*\
  !*** ../rusty-web-tetris/pkg/rusty_web_tetris.js ***!
  \***************************************************/
/*! exports provided: Action, Cell, __wbg_error_4bb6c2a97407129a, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __widl_f_log_1_, __wbg_random_58bd29ed438c19c0, __wbindgen_string_new, __wbindgen_throw, Point, Tetris, __wbindgen_object_drop_ref */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_error_4bb6c2a97407129a", function() { return __wbg_error_4bb6c2a97407129a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_new_59cb74e423758ede", function() { return __wbg_new_59cb74e423758ede; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_stack_558ba5917b466edd", function() { return __wbg_stack_558ba5917b466edd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_log_1_", function() { return __widl_f_log_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_random_58bd29ed438c19c0", function() { return __wbg_random_58bd29ed438c19c0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_string_new", function() { return __wbindgen_string_new; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_throw", function() { return __wbindgen_throw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tetris", function() { return Tetris; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_drop_ref", function() { return __wbindgen_object_drop_ref; });
/* harmony import */ var _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rusty_web_tetris_bg */ "../rusty-web-tetris/pkg/rusty_web_tetris_bg.wasm");


/**
*/
const Action = Object.freeze({ HardDrop:0,HoldPiece:1,RotateClockWise:2,RotateCounterClockWise:3,MoveLeft:4,MoveRight:5,SoftDrop:6,ToggleRunning:7, });
/**
*/
const Cell = Object.freeze({ I:0,O:1,T:2,S:3,Z:4,J:5,L:6,EMPTY:7, });

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
        cachegetUint8Memory = new Uint8Array(_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm(arg) {
    const ptr = _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"](arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function __wbg_error_4bb6c2a97407129a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](arg0, arg1 * 1);

    console.error(varg0);
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function __wbg_new_59cb74e423758ede() {
    return addHeapObject(new Error());
}

function getObject(idx) { return heap[idx]; }

let cachedTextEncoder = new TextEncoder('utf-8');

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {

        let size = arg.length;
        let ptr = _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"](size);
        let writeOffset = 0;
        while (true) {
            const view = getUint8Memory().subarray(ptr + writeOffset, ptr + size);
            const { read, written } = cachedTextEncoder.encodeInto(arg, view);
            writeOffset += written;
            if (read === arg.length) {
                break;
            }
            arg = arg.substring(read);
            ptr = _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_realloc"](ptr, size, size += arg.length * 3);
        }
        WASM_VECTOR_LEN = writeOffset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {

        const buf = cachedTextEncoder.encode(arg);
        const ptr = _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_malloc"](buf.length);
        getUint8Memory().set(buf, ptr);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    };
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer) {
        cachegetUint32Memory = new Uint32Array(_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["memory"].buffer);
    }
    return cachegetUint32Memory;
}

function __wbg_stack_558ba5917b466edd(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).stack);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function __widl_f_log_1_(arg0) {
    console.log(getObject(arg0));
}

function __wbg_random_58bd29ed438c19c0() {
    return Math.random();
}

function __wbindgen_string_new(p, l) { return addHeapObject(getStringFromWasm(p, l)); }

function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

function freePoint(ptr) {

    _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbg_point_free"](ptr);
}
/**
*/
class Point {

    static __wrap(ptr) {
        const obj = Object.create(Point.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freePoint(ptr);
    }

    /**
    * @returns {number}
    */
    get x() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbg_get_point_x"](this.ptr);
    }
    set x(arg0) {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbg_set_point_x"](this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbg_get_point_y"](this.ptr);
    }
    set y(arg0) {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbg_set_point_y"](this.ptr, arg0);
    }
}

function freeTetris(ptr) {

    _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbg_tetris_free"](ptr);
}
/**
*/
class Tetris {

    static __wrap(ptr) {
        const obj = Object.create(Tetris.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeTetris(ptr);
    }

    /**
    * @returns {Tetris}
    */
    static new() {
        return Tetris.__wrap(_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_new"]());
    }
    /**
    * @param {Uint8Array} events
    * @returns {void}
    */
    event_handler(events) {
        const ptr0 = passArray8ToWasm(events);
        const len0 = WASM_VECTOR_LEN;
        try {
            return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_event_handler"](this.ptr, ptr0, len0);

        } finally {
            events.set(getUint8Memory().subarray(ptr0 / 1, ptr0 / 1 + len0));
            _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["__wbindgen_free"](ptr0, len0 * 1);

        }

    }
    /**
    * Update the tetris board
    * @param {number} elapsed_time
    * @returns {boolean}
    */
    update(elapsed_time) {
        return (_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_update"](this.ptr, elapsed_time)) !== 0;
    }
    /**
    * @returns {number}
    */
    get_score() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_score"](this.ptr) >>> 0;
    }
    /**
    * Return the width of the game board
    * @returns {number}
    */
    get_width() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_width"](this.ptr);
    }
    /**
    * Return the height of the game board
    * @returns {number}
    */
    get_height() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_height"](this.ptr);
    }
    /**
    * Return the offset height to make the game field
    * 10 x 20
    * @returns {number}
    */
    get_offset_height() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_offset_height"](this.ptr);
    }
    /**
    * Return the next level\'s goal
    *
    * The next levels goal is always the current level * 5
    * @returns {number}
    */
    get_next_level_goal() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_next_level_goal"](this.ptr) >>> 0;
    }
    /**
    * Return the current level of the game board
    * @returns {number}
    */
    get_level() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_level"](this.ptr) >>> 0;
    }
    /**
    * Return the number of rows that have been completed
    * @returns {number}
    */
    get_rows_completed() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_rows_completed"](this.ptr) >>> 0;
    }
    /**
    * @returns {number}
    */
    get_hold_piece() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_hold_piece"](this.ptr);
    }
    /**
    * @returns {number}
    */
    get_queued_pieces() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_queued_pieces"](this.ptr);
    }
    /**
    * Return a pointer to the first element in the boards vector
    * @returns {number}
    */
    get_cells() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_cells"](this.ptr);
    }
    /**
    * Return the local coordinates of the active piece
    * @returns {number}
    */
    get_pieces() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_pieces"](this.ptr);
    }
    /**
    * Get the pieces bounding box size
    * @returns {number}
    */
    get_piece_bounding_box() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_piece_bounding_box"](this.ptr);
    }
    /**
    * Get the actives pieces type
    * @returns {number}
    */
    get_piece_type() {
        return _rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_piece_type"](this.ptr);
    }
    /**
    * Get the world coordinates of the active piece position
    * @returns {Point}
    */
    get_piece_position() {
        return Point.__wrap(_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_piece_position"](this.ptr));
    }
    /**
    * @returns {Point}
    */
    get_shadow_piece_position() {
        return Point.__wrap(_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_0__["tetris_get_shadow_piece_position"](this.ptr));
    }
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function __wbindgen_object_drop_ref(i) { dropObject(i); }



/***/ }),

/***/ "../rusty-web-tetris/pkg/rusty_web_tetris_bg.wasm":
/*!********************************************************!*\
  !*** ../rusty-web-tetris/pkg/rusty_web_tetris_bg.wasm ***!
  \********************************************************/
/*! exports provided: memory, __wbg_point_free, __wbg_get_point_x, __wbg_set_point_x, __wbg_get_point_y, __wbg_set_point_y, __wbg_tetris_free, tetris_new, tetris_event_handler, tetris_update, tetris_get_score, tetris_get_width, tetris_get_height, tetris_get_offset_height, tetris_get_next_level_goal, tetris_get_level, tetris_get_rows_completed, tetris_get_hold_piece, tetris_get_queued_pieces, tetris_get_cells, tetris_get_pieces, tetris_get_piece_bounding_box, tetris_get_piece_type, tetris_get_piece_position, tetris_get_shadow_piece_position, __wbindgen_malloc, __wbindgen_realloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name != "__webpack_init__") exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(/*! ./rusty_web_tetris */ "../rusty-web-tetris/pkg/rusty_web_tetris.js");


// exec wasm module
wasmExports["__webpack_init__"]()

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rusty-web-tetris */ "../rusty-web-tetris/pkg/rusty_web_tetris.js");
/* harmony import */ var rusty_web_tetris_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rusty-web-tetris/rusty_web_tetris_bg */ "../rusty-web-tetris/pkg/rusty_web_tetris_bg.wasm");
/* harmony import */ var _InputController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InputController */ "./src/InputController.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var DEBUG_GAME = false;
var Game = /** @class */ (function () {
    function Game(tetris, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        this.animationId = undefined;
        this.config = {
            gridColor: "#fff",
            cellSize: 35,
        };
        this.run = function () {
            if (_this.inputController.Input.Escape) {
                if (_this.isRunning) {
                    _this.pause();
                }
                else {
                    _this.play();
                }
            }
            _this.tetris.event_handler(_this.inputController.getEventQueue());
            var boardMerged = _this.tetris.update(performance.now());
            _this.drawGrid();
            _this.drawCells();
            _this.drawPiece();
            _this.updateHoldPiece();
            document.getElementById("score").textContent = "" + _this.tetris.get_score();
            if (boardMerged) {
                // update queued pieces view
                _this.updateQueuedPieces();
                document.getElementById("level").textContent = "" + _this.tetris.get_level();
                document.getElementById("rows_completed").textContent = "" + _this.tetris.get_rows_completed();
            }
            _this.animationId = requestAnimationFrame(_this.run);
        };
        this.tetris = tetris;
        this.width = tetris.get_width();
        this.totalHeight = tetris.get_height();
        this.boardHeight = this.totalHeight - tetris.get_offset_height();
        this.canvas = document.getElementById("tetris");
        this.ctx = this.canvas.getContext("2d");
        this.config = __assign({}, this.config, config);
        this.canvas.height = (this.config.cellSize + 1) * this.height + 1;
        this.canvas.width = (this.config.cellSize + 1) * this.width + 1;
        this.inputController = new _InputController__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.inputController.start();
    }
    Object.defineProperty(Game.prototype, "isPaused", {
        get: function () {
            return this.animationId === undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "isRunning", {
        get: function () {
            return this.animationId !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "height", {
        get: function () {
            var height = this.boardHeight;
            if (DEBUG_GAME) {
                height = this.totalHeight;
            }
            return height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "offsetHeight", {
        get: function () {
            var offset = this.totalHeight - this.boardHeight;
            if (DEBUG_GAME) {
                offset = 0;
            }
            return offset;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.startGame = function () {
        this.updateQueuedPieces();
        this.play();
    };
    Game.prototype.pause = function () {
        if (this.isRunning) {
            cancelAnimationFrame(this.animationId);
            this.animationId = undefined;
        }
        else {
            throw new Error("Can't pause the game when it is already paused");
        }
    };
    Game.prototype.play = function () {
        if (this.isPaused) {
            this.animationId = requestAnimationFrame(this.run);
        }
        else {
            throw new Error("Can't play the game when it is already playing");
        }
    };
    Game.prototype.drawGrid = function () {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.config.gridColor;
        // Vertical lines
        for (var i = 0; i <= this.width; i++) {
            this.ctx.moveTo(i * (this.config.cellSize + 1) + 1, 0);
            this.ctx.lineTo(i * (this.config.cellSize + 1) + 1, (this.config.cellSize + 1) * this.height + 1);
        }
        // Horizontal lines
        for (var j = this.height; j >= 0; j--) {
            this.ctx.moveTo(this.offsetHeight, j * (this.config.cellSize + 1) + 1);
            this.ctx.lineTo((this.config.cellSize + 1) * this.width + 1, j * (this.config.cellSize + 1) + 1);
        }
        this.ctx.stroke();
    };
    Game.prototype.drawCells = function () {
        var cellsPtr = this.tetris.get_cells();
        var cells = new Uint8Array(rusty_web_tetris_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_1__["memory"].buffer, cellsPtr, this.width * this.totalHeight);
        this.ctx.beginPath();
        for (var row = this.offsetHeight; row < this.totalHeight; row++) {
            for (var col = 0; col < this.width; col++) {
                var index = this.getIndex(row, col);
                if (cells[index] === rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY && row < this.totalHeight - this.boardHeight) {
                    this.ctx.fillStyle = "#132456";
                }
                else {
                    this.ctx.fillStyle = this.getColor(cells[index]);
                }
                this.drawCell(row, col);
            }
        }
        if (DEBUG_GAME) {
            this.ctx.beginPath();
            for (var row = this.offsetHeight; row < this.totalHeight; row++) {
                for (var col = 0; col < this.width; col++) {
                    this.ctx.fillStyle = "red";
                    this.ctx.font = "14px Arial";
                    this.ctx.fillText("" + this.getIndex(row, col), col * (this.config.cellSize + 1) + 1, (row - this.offsetHeight) * (this.config.cellSize + 1) + this.config.cellSize);
                }
            }
        }
    };
    Game.prototype.drawPiece = function () {
        var position = this.tetris.get_piece_position();
        var shadowPiecePosition = this.tetris.get_shadow_piece_position();
        var boundingBox = this.tetris.get_piece_bounding_box();
        var cellsPtr = this.tetris.get_pieces();
        var cellType = this.tetris.get_piece_type();
        var cells = new Uint8Array(rusty_web_tetris_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_1__["memory"].buffer, cellsPtr, boundingBox * boundingBox);
        this.ctx.beginPath();
        for (var row = 0; row < boundingBox; row++) {
            for (var col = 0; col < boundingBox; col++) {
                var index = row * boundingBox + col;
                if (cells[index] !== rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY) {
                    this.ctx.fillStyle = this.getColor(cellType);
                    this.ctx.globalAlpha = 0.5;
                    this.drawCell(row + shadowPiecePosition.y, col + shadowPiecePosition.x);
                    this.ctx.globalAlpha = 1;
                    this.drawCell(row + position.y, col + position.x);
                }
            }
        }
    };
    Game.prototype.updateQueuedPieces = function () {
        var _this = this;
        var previews = document.querySelectorAll(".preview");
        var queuedPieces = this.tetris.get_queued_pieces();
        var cells = new Uint8Array(rusty_web_tetris_rusty_web_tetris_bg__WEBPACK_IMPORTED_MODULE_1__["memory"].buffer, queuedPieces, 6);
        previews.forEach(function (canvas, index) {
            var context = canvas.getContext("2d");
            var cell = cells[index];
            // draw in background
            context.beginPath();
            context.fillStyle = "#000000";
            context.fillRect(0, 0, 150, 150);
            var boundingBox = 3;
            if (cell === rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].O) {
                boundingBox = 2;
            }
            else if (cell === rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].I) {
                boundingBox = 4;
            }
            // piece
            var pieces = getCells(cell);
            context.beginPath();
            context.fillStyle = _this.getColor(cell);
            for (var row = 0; row < boundingBox; row++) {
                for (var col = 0; col < boundingBox; col++) {
                    var i = row * boundingBox + col;
                    if (pieces[i] !== rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY) {
                        context.fillStyle = _this.getColor(cell);
                    }
                    else {
                        context.fillStyle = "#000000";
                    }
                    context.fillRect(col * (_this.config.cellSize + 1) + 1, row * (_this.config.cellSize + 1) + 1, _this.config.cellSize, _this.config.cellSize);
                }
            }
            context.stroke();
        });
    };
    Game.prototype.updateHoldPiece = function () {
        var holdCanvas = document.getElementById("hold_piece");
        var holdCell = this.tetris.get_hold_piece();
        var context = holdCanvas.getContext("2d");
        // draw in background
        context.beginPath();
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 150, 150);
        var boundingBox = 3;
        if (holdCell === rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].O) {
            boundingBox = 2;
        }
        else if (holdCell === rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].I) {
            boundingBox = 4;
        }
        // piece
        var pieces = getCells(holdCell);
        context.beginPath();
        context.fillStyle = this.getColor(holdCell);
        for (var row = 0; row < boundingBox; row++) {
            for (var col = 0; col < boundingBox; col++) {
                var i = row * boundingBox + col;
                if (pieces[i] !== rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY) {
                    context.fillStyle = this.getColor(holdCell);
                }
                else {
                    context.fillStyle = "#000000";
                }
                context.fillRect(col * (this.config.cellSize + 1) + 1, row * (this.config.cellSize + 1) + 1, this.config.cellSize, this.config.cellSize);
            }
        }
        context.stroke();
    };
    Game.prototype.drawCell = function (row, col) {
        this.ctx.fillRect(col * (this.config.cellSize + 1) + 1, (row - this.offsetHeight) * (this.config.cellSize + 1) + 1, this.config.cellSize, this.config.cellSize);
    };
    Game.prototype.getIndex = function (row, col) {
        return row * this.width + col;
    };
    Game.prototype.getColor = function (cell) {
        switch (cell) {
            case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY:
                return "#000"; // black
            case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].I:
                return "#00FFFF"; // cyan
            case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].O:
                return "#FFFF00"; // yellow
            case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].T:
                return "#800080"; // purple
            case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].S:
                return "#00FF00"; // green
            case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].Z:
                return "#FF0000"; // Red
            case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].J:
                return "#0000FF"; // Blue
            case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].L:
                return "#FFA500"; // Orange
            default:
                return "#FFFFFF"; // white
        }
    };
    return Game;
}());
function getCells(cell) {
    switch (cell) {
        case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].O:
            return [rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].O, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].O,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].O, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].O];
        case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].I:
            return [rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].I, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].I, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].I, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].I,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY];
        case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].T:
            return [rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].T, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].T, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].T, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].T,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY];
        case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].S:
            return [rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].S, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].S,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].S, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].S, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY];
        case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].Z:
            return [rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].Z, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].Z, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].Z, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].Z,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY];
        case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].J:
            return [rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].J,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].J, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].J, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].J,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY];
        case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].L:
            return [rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].L, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].L, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].L, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].L,
                rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY, rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY];
        default:
            return [rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Cell"].EMPTY];
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./src/InputController.ts":
/*!********************************!*\
  !*** ./src/InputController.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rusty-web-tetris */ "../rusty-web-tetris/pkg/rusty_web_tetris.js");

var InputController = /** @class */ (function () {
    function InputController() {
        var _this = this;
        this.input = {
            ShiftLeft: false,
            ControlLeft: false,
            Escape: false,
            Space: false,
            ArrowLeft: false,
            ArrowUp: false,
            ArrowRight: false,
            ArrowDown: false,
            KeyC: false,
            KeyX: false,
            KeyZ: false,
            Numpad0: false,
            Numpad1: false,
            Numpad2: false,
            Numpad3: false,
            Numpad4: false,
            Numpad5: false,
            Numpad6: false,
            Numpad7: false,
            Numpad8: false,
            Numpad9: false,
            F1: false,
        };
        this.keyMap = {
            16: "ShiftLeft",
            17: "ControlLeft",
            27: "Escape",
            32: "Space",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            67: "KeyC",
            88: "KeyX",
            90: "KeyZ",
            96: "Numpad0",
            97: "Numpad1",
            98: "Numpad2",
            99: "Numpad3",
            100: "Numpad4",
            101: "Numpad5",
            102: "Numpad6",
            103: "Numpad7",
            104: "Numpad8",
            105: "Numpad9",
            112: "F1",
        };
        this.keyboardEvent = function (event) {
            var code = _this.getKeyCode(event);
            _this.input[code] = event.type === "keydown";
            event.preventDefault();
        };
        this.listening = false;
    }
    Object.defineProperty(InputController.prototype, "Input", {
        get: function () {
            return this.input;
        },
        enumerable: true,
        configurable: true
    });
    InputController.prototype.start = function () {
        window.addEventListener("keyup", this.keyboardEvent);
        window.addEventListener("keydown", this.keyboardEvent);
        this.listening = true;
    };
    InputController.prototype.stop = function () {
        if (!this.listening) {
            throw new Error("Must start() the InputController before you can stop() it!");
        }
        window.removeEventListener("keyup", this.keyboardEvent);
        window.removeEventListener("keydown", this.keyboardEvent);
        this.listening = false;
    };
    // TODO: Convert to back to Action[]
    InputController.prototype.getEventQueue = function () {
        var i = this.input;
        var eventQueue = [];
        if (i.Numpad1 || i.Numpad5 || i.Numpad9 || i.KeyX || i.ArrowUp) {
            eventQueue.push(rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].RotateClockWise);
        }
        if (i.Numpad3 || i.Numpad7 || i.ControlLeft || i.KeyZ) {
            eventQueue.push(rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].RotateCounterClockWise);
        }
        if (i.Numpad8 || i.Space) {
            eventQueue.push(rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].HardDrop);
        }
        if (i.Numpad0 || i.KeyC || i.ShiftLeft) {
            eventQueue.push(rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].HoldPiece);
        }
        if (i.Numpad4 || i.ArrowLeft) {
            eventQueue.push(rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].MoveLeft);
        }
        if (i.Numpad6 || i.ArrowRight) {
            eventQueue.push(rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].MoveRight);
        }
        if (i.Numpad2 || i.ArrowDown) {
            eventQueue.push(rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].SoftDrop);
        }
        // TODO: THIS SHOULDN'T BE NEEDED, POST An ISSUE
        var byteEventQueue = new Uint8Array(eventQueue.length);
        for (var j = 0; j < eventQueue.length; j++) {
            var event_1 = eventQueue[j];
            switch (event_1) {
                case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].HardDrop:
                    byteEventQueue[j] = 0;
                    break;
                case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].HoldPiece:
                    byteEventQueue[j] = 1;
                    break;
                case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].RotateClockWise:
                    byteEventQueue[j] = 2;
                    break;
                case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].RotateCounterClockWise:
                    byteEventQueue[j] = 3;
                    break;
                case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].MoveLeft:
                    byteEventQueue[j] = 4;
                    break;
                case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].MoveRight:
                    byteEventQueue[j] = 5;
                    break;
                case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].SoftDrop:
                    byteEventQueue[j] = 6;
                    break;
                case rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Action"].ToggleRunning:
                    byteEventQueue[j] = 7;
                    break;
            }
        }
        return byteEventQueue;
    };
    InputController.prototype.getKeyCode = function (event) {
        var code = event.code;
        if (!code) {
            code = this.keyMap[event.keyCode];
        }
        return code;
    };
    return InputController;
}());
/* harmony default export */ __webpack_exports__["default"] = (InputController);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rusty-web-tetris */ "../rusty-web-tetris/pkg/rusty_web_tetris.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ "./src/Game.ts");


var t = new _Game__WEBPACK_IMPORTED_MODULE_1__["default"](rusty_web_tetris__WEBPACK_IMPORTED_MODULE_0__["Tetris"].new());
t.startGame();


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vcnVzdHktd2ViLXRldHJpcy9wa2cvcnVzdHlfd2ViX3RldHJpcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSW5wdXRDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4Qzs7QUFFOUM7QUFDQTtBQUNPLDhCQUE4Qix1SEFBdUg7QUFDNUo7QUFDQTtBQUNPLDRCQUE0Qix1Q0FBdUM7O0FBRTFFO0FBQ0E7QUFDQSx1RUFBdUUsMkRBQVc7QUFDbEYsNkNBQTZDLDJEQUFXO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQixzRUFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQSxJQUFJLG9FQUFvQjs7QUFFeEI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBLHlCQUF5QixrQkFBa0I7O0FBRTNDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixzRUFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHVFQUF1QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBLG9CQUFvQixzRUFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUVBQXlFLDJEQUFXO0FBQ3BGLCtDQUErQywyREFBVztBQUMxRDtBQUNB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LENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsS0FBSyxxREFBSSxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMscURBQUksQ0FBQyxLQUFLLEVBQUUscURBQUksQ0FBQyxDQUFDLEVBQUUscURBQUksQ0FBQyxDQUFDO2dCQUMxQixxREFBSSxDQUFDLENBQUMsRUFBRSxxREFBSSxDQUFDLENBQUMsRUFBRSxxREFBSSxDQUFDLEtBQUs7Z0JBQzFCLHFEQUFJLENBQUMsS0FBSyxFQUFFLHFEQUFJLENBQUMsS0FBSyxFQUFFLHFEQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsS0FBSyxxREFBSSxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMscURBQUksQ0FBQyxDQUFDLEVBQUUscURBQUksQ0FBQyxDQUFDLEVBQUUscURBQUksQ0FBQyxLQUFLO2dCQUMxQixxREFBSSxDQUFDLEtBQUssRUFBRSxxREFBSSxDQUFDLENBQUMsRUFBRSxxREFBSSxDQUFDLENBQUM7Z0JBQzFCLHFEQUFJLENBQUMsS0FBSyxFQUFFLHFEQUFJLENBQUMsS0FBSyxFQUFFLHFEQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsS0FBSyxxREFBSSxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMscURBQUksQ0FBQyxLQUFLLEVBQUUscURBQUksQ0FBQyxLQUFLLEVBQUUscURBQUksQ0FBQyxDQUFDO2dCQUM5QixxREFBSSxDQUFDLENBQUMsRUFBRSxxREFBSSxDQUFDLENBQUMsRUFBRSxxREFBSSxDQUFDLENBQUM7Z0JBQ3RCLHFEQUFJLENBQUMsS0FBSyxFQUFFLHFEQUFJLENBQUMsS0FBSyxFQUFFLHFEQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsS0FBSyxxREFBSSxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMscURBQUksQ0FBQyxDQUFDLEVBQUUscURBQUksQ0FBQyxLQUFLLEVBQUUscURBQUksQ0FBQyxLQUFLO2dCQUM5QixxREFBSSxDQUFDLENBQUMsRUFBRSxxREFBSSxDQUFDLENBQUMsRUFBRSxxREFBSSxDQUFD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Q0FBQztvQkFBQyxNQUFNO2dCQUNwRCxLQUFLLHVEQUFNLENBQUMsUUFBUTtvQkFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLE1BQU07Z0JBQ25ELEtBQUssdURBQU0sQ0FBQyxhQUFhO29CQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQUMsTUFBTTthQUMzRDtTQUNKO1FBQ0QsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQVFPLG9DQUFVLEdBQWxCLFVBQW1CLEtBQW9CO1FBQ25DLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDdElEO0FBQUE7QUFBQTtBQUEwQztBQUNoQjtBQUUxQixJQUFNLENBQUMsR0FBRyxJQUFJLDZDQUFJLENBQUMsdURBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyIsImZpbGUiOiIwLmJvb3RzdHJhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdhc20gZnJvbSAnLi9ydXN0eV93ZWJfdGV0cmlzX2JnJztcblxuLyoqXG4qL1xuZXhwb3J0IGNvbnN0IEFjdGlvbiA9IE9iamVjdC5mcmVlemUoeyBIYXJkRHJvcDowLEhvbGRQaWVjZToxLFJvdGF0ZUNsb2NrV2lzZToyLFJvdGF0ZUNvdW50ZXJDbG9ja1dpc2U6MyxNb3ZlTGVmdDo0LE1vdmVSaWdodDo1LFNvZnREcm9wOjYsVG9nZ2xlUnVubmluZzo3LCB9KTtcbi8qKlxuKi9cbmV4cG9ydCBjb25zdCBDZWxsID0gT2JqZWN0LmZyZWV6ZSh7IEk6MCxPOjEsVDoyLFM6MyxaOjQsSjo1LEw6NixFTVBUWTo3LCB9KTtcblxubGV0IGNhY2hlZ2V0VWludDhNZW1vcnkgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDhNZW1vcnkgPT09IG51bGwgfHwgY2FjaGVnZXRVaW50OE1lbW9yeS5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQ4TWVtb3J5ID0gbmV3IFVpbnQ4QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDhNZW1vcnk7XG59XG5cbmxldCBXQVNNX1ZFQ1RPUl9MRU4gPSAwO1xuXG5mdW5jdGlvbiBwYXNzQXJyYXk4VG9XYXNtKGFyZykge1xuICAgIGNvbnN0IHB0ciA9IHdhc20uX193YmluZGdlbl9tYWxsb2MoYXJnLmxlbmd0aCAqIDEpO1xuICAgIGdldFVpbnQ4TWVtb3J5KCkuc2V0KGFyZywgcHRyIC8gMSk7XG4gICAgV0FTTV9WRUNUT1JfTEVOID0gYXJnLmxlbmd0aDtcbiAgICByZXR1cm4gcHRyO1xufVxuXG5sZXQgY2FjaGVkVGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ3V0Zi04Jyk7XG5cbmZ1bmN0aW9uIGdldFN0cmluZ0Zyb21XYXNtKHB0ciwgbGVuKSB7XG4gICAgcmV0dXJuIGNhY2hlZFRleHREZWNvZGVyLmRlY29kZShnZXRVaW50OE1lbW9yeSgpLnN1YmFycmF5KHB0ciwgcHRyICsgbGVuKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diZ19lcnJvcl80YmI2YzJhOTc0MDcxMjlhKGFyZzAsIGFyZzEpIHtcbiAgICBsZXQgdmFyZzAgPSBnZXRTdHJpbmdGcm9tV2FzbShhcmcwLCBhcmcxKTtcblxuICAgIHZhcmcwID0gdmFyZzAuc2xpY2UoKTtcbiAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShhcmcwLCBhcmcxICogMSk7XG5cbiAgICBjb25zb2xlLmVycm9yKHZhcmcwKTtcbn1cblxuY29uc3QgaGVhcCA9IG5ldyBBcnJheSgzMik7XG5cbmhlYXAuZmlsbCh1bmRlZmluZWQpO1xuXG5oZWFwLnB1c2godW5kZWZpbmVkLCBudWxsLCB0cnVlLCBmYWxzZSk7XG5cbmxldCBoZWFwX25leHQgPSBoZWFwLmxlbmd0aDtcblxuZnVuY3Rpb24gYWRkSGVhcE9iamVjdChvYmopIHtcbiAgICBpZiAoaGVhcF9uZXh0ID09PSBoZWFwLmxlbmd0aCkgaGVhcC5wdXNoKGhlYXAubGVuZ3RoICsgMSk7XG4gICAgY29uc3QgaWR4ID0gaGVhcF9uZXh0O1xuICAgIGhlYXBfbmV4dCA9IGhlYXBbaWR4XTtcblxuICAgIGhlYXBbaWR4XSA9IG9iajtcbiAgICByZXR1cm4gaWR4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX193YmdfbmV3XzU5Y2I3NGU0MjM3NThlZGUoKSB7XG4gICAgcmV0dXJuIGFkZEhlYXBPYmplY3QobmV3IEVycm9yKCkpO1xufVxuXG5mdW5jdGlvbiBnZXRPYmplY3QoaWR4KSB7IHJldHVybiBoZWFwW2lkeF07IH1cblxubGV0IGNhY2hlZFRleHRFbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCd1dGYtOCcpO1xuXG5sZXQgcGFzc1N0cmluZ1RvV2FzbTtcbmlmICh0eXBlb2YgY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlSW50byA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHBhc3NTdHJpbmdUb1dhc20gPSBmdW5jdGlvbihhcmcpIHtcblxuICAgICAgICBsZXQgc2l6ZSA9IGFyZy5sZW5ndGg7XG4gICAgICAgIGxldCBwdHIgPSB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jKHNpemUpO1xuICAgICAgICBsZXQgd3JpdGVPZmZzZXQgPSAwO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmlldyA9IGdldFVpbnQ4TWVtb3J5KCkuc3ViYXJyYXkocHRyICsgd3JpdGVPZmZzZXQsIHB0ciArIHNpemUpO1xuICAgICAgICAgICAgY29uc3QgeyByZWFkLCB3cml0dGVuIH0gPSBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGVJbnRvKGFyZywgdmlldyk7XG4gICAgICAgICAgICB3cml0ZU9mZnNldCArPSB3cml0dGVuO1xuICAgICAgICAgICAgaWYgKHJlYWQgPT09IGFyZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFyZyA9IGFyZy5zdWJzdHJpbmcocmVhZCk7XG4gICAgICAgICAgICBwdHIgPSB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyhwdHIsIHNpemUsIHNpemUgKz0gYXJnLmxlbmd0aCAqIDMpO1xuICAgICAgICB9XG4gICAgICAgIFdBU01fVkVDVE9SX0xFTiA9IHdyaXRlT2Zmc2V0O1xuICAgICAgICByZXR1cm4gcHRyO1xuICAgIH07XG59IGVsc2Uge1xuICAgIHBhc3NTdHJpbmdUb1dhc20gPSBmdW5jdGlvbihhcmcpIHtcblxuICAgICAgICBjb25zdCBidWYgPSBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGUoYXJnKTtcbiAgICAgICAgY29uc3QgcHRyID0gd2FzbS5fX3diaW5kZ2VuX21hbGxvYyhidWYubGVuZ3RoKTtcbiAgICAgICAgZ2V0VWludDhNZW1vcnkoKS5zZXQoYnVmLCBwdHIpO1xuICAgICAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBidWYubGVuZ3RoO1xuICAgICAgICByZXR1cm4gcHRyO1xuICAgIH07XG59XG5cbmxldCBjYWNoZWdldFVpbnQzMk1lbW9yeSA9IG51bGw7XG5mdW5jdGlvbiBnZXRVaW50MzJNZW1vcnkoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDMyTWVtb3J5ID09PSBudWxsIHx8IGNhY2hlZ2V0VWludDMyTWVtb3J5LmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4gICAgICAgIGNhY2hlZ2V0VWludDMyTWVtb3J5ID0gbmV3IFVpbnQzMkFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWdldFVpbnQzMk1lbW9yeTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JnX3N0YWNrXzU1OGJhNTkxN2I0NjZlZGQocmV0LCBhcmcwKSB7XG5cbiAgICBjb25zdCByZXRwdHIgPSBwYXNzU3RyaW5nVG9XYXNtKGdldE9iamVjdChhcmcwKS5zdGFjayk7XG4gICAgY29uc3QgcmV0bGVuID0gV0FTTV9WRUNUT1JfTEVOO1xuICAgIGNvbnN0IG1lbSA9IGdldFVpbnQzMk1lbW9yeSgpO1xuICAgIG1lbVtyZXQgLyA0XSA9IHJldHB0cjtcbiAgICBtZW1bcmV0IC8gNCArIDFdID0gcmV0bGVuO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3dpZGxfZl9sb2dfMV8oYXJnMCkge1xuICAgIGNvbnNvbGUubG9nKGdldE9iamVjdChhcmcwKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diZ19yYW5kb21fNThiZDI5ZWQ0MzhjMTljMCgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JpbmRnZW5fc3RyaW5nX25ldyhwLCBsKSB7IHJldHVybiBhZGRIZWFwT2JqZWN0KGdldFN0cmluZ0Zyb21XYXNtKHAsIGwpKTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gX193YmluZGdlbl90aHJvdyhwdHIsIGxlbikge1xuICAgIHRocm93IG5ldyBFcnJvcihnZXRTdHJpbmdGcm9tV2FzbShwdHIsIGxlbikpO1xufVxuXG5mdW5jdGlvbiBmcmVlUG9pbnQocHRyKSB7XG5cbiAgICB3YXNtLl9fd2JnX3BvaW50X2ZyZWUocHRyKTtcbn1cbi8qKlxuKi9cbmV4cG9ydCBjbGFzcyBQb2ludCB7XG5cbiAgICBzdGF0aWMgX193cmFwKHB0cikge1xuICAgICAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKFBvaW50LnByb3RvdHlwZSk7XG4gICAgICAgIG9iai5wdHIgPSBwdHI7XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBmcmVlKCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLnB0cjtcbiAgICAgICAgdGhpcy5wdHIgPSAwO1xuICAgICAgICBmcmVlUG9pbnQocHRyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHdhc20uX193YmdfZ2V0X3BvaW50X3godGhpcy5wdHIpO1xuICAgIH1cbiAgICBzZXQgeChhcmcwKSB7XG4gICAgICAgIHJldHVybiB3YXNtLl9fd2JnX3NldF9wb2ludF94KHRoaXMucHRyLCBhcmcwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgZ2V0IHkoKSB7XG4gICAgICAgIHJldHVybiB3YXNtLl9fd2JnX2dldF9wb2ludF95KHRoaXMucHRyKTtcbiAgICB9XG4gICAgc2V0IHkoYXJnMCkge1xuICAgICAgICByZXR1cm4gd2FzbS5fX3diZ19zZXRfcG9pbnRfeSh0aGlzLnB0ciwgYXJnMCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmcmVlVGV0cmlzKHB0cikge1xuXG4gICAgd2FzbS5fX3diZ190ZXRyaXNfZnJlZShwdHIpO1xufVxuLyoqXG4qL1xuZXhwb3J0IGNsYXNzIFRldHJpcyB7XG5cbiAgICBzdGF0aWMgX193cmFwKHB0cikge1xuICAgICAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKFRldHJpcy5wcm90b3R5cGUpO1xuICAgICAgICBvYmoucHRyID0gcHRyO1xuXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgZnJlZSgpIHtcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5wdHI7XG4gICAgICAgIHRoaXMucHRyID0gMDtcbiAgICAgICAgZnJlZVRldHJpcyhwdHIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogQHJldHVybnMge1RldHJpc31cbiAgICAqL1xuICAgIHN0YXRpYyBuZXcoKSB7XG4gICAgICAgIHJldHVybiBUZXRyaXMuX193cmFwKHdhc20udGV0cmlzX25ldygpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGV2ZW50c1xuICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgKi9cbiAgICBldmVudF9oYW5kbGVyKGV2ZW50cykge1xuICAgICAgICBjb25zdCBwdHIwID0gcGFzc0FycmF5OFRvV2FzbShldmVudHMpO1xuICAgICAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHdhc20udGV0cmlzX2V2ZW50X2hhbmRsZXIodGhpcy5wdHIsIHB0cjAsIGxlbjApO1xuXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBldmVudHMuc2V0KGdldFVpbnQ4TWVtb3J5KCkuc3ViYXJyYXkocHRyMCAvIDEsIHB0cjAgLyAxICsgbGVuMCkpO1xuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocHRyMCwgbGVuMCAqIDEpO1xuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICAvKipcbiAgICAqIFVwZGF0ZSB0aGUgdGV0cmlzIGJvYXJkXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZWxhcHNlZF90aW1lXG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAqL1xuICAgIHVwZGF0ZShlbGFwc2VkX3RpbWUpIHtcbiAgICAgICAgcmV0dXJuICh3YXNtLnRldHJpc191cGRhdGUodGhpcy5wdHIsIGVsYXBzZWRfdGltZSkpICE9PSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICBnZXRfc2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB3YXNtLnRldHJpc19nZXRfc2NvcmUodGhpcy5wdHIpID4+PiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJldHVybiB0aGUgd2lkdGggb2YgdGhlIGdhbWUgYm9hcmRcbiAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICBnZXRfd2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB3YXNtLnRldHJpc19nZXRfd2lkdGgodGhpcy5wdHIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBnYW1lIGJvYXJkXG4gICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgZ2V0X2hlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHdhc20udGV0cmlzX2dldF9oZWlnaHQodGhpcy5wdHIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJldHVybiB0aGUgb2Zmc2V0IGhlaWdodCB0byBtYWtlIHRoZSBnYW1lIGZpZWxkXG4gICAgKiAxMCB4IDIwXG4gICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgZ2V0X29mZnNldF9oZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB3YXNtLnRldHJpc19nZXRfb2Zmc2V0X2hlaWdodCh0aGlzLnB0cik7XG4gICAgfVxuICAgIC8qKlxuICAgICogUmV0dXJuIHRoZSBuZXh0IGxldmVsXFwncyBnb2FsXG4gICAgKlxuICAgICogVGhlIG5leHQgbGV2ZWxzIGdvYWwgaXMgYWx3YXlzIHRoZSBjdXJyZW50IGxldmVsICogNVxuICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAqL1xuICAgIGdldF9uZXh0X2xldmVsX2dvYWwoKSB7XG4gICAgICAgIHJldHVybiB3YXNtLnRldHJpc19nZXRfbmV4dF9sZXZlbF9nb2FsKHRoaXMucHRyKSA+Pj4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgbGV2ZWwgb2YgdGhlIGdhbWUgYm9hcmRcbiAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICBnZXRfbGV2ZWwoKSB7XG4gICAgICAgIHJldHVybiB3YXNtLnRldHJpc19nZXRfbGV2ZWwodGhpcy5wdHIpID4+PiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIHJvd3MgdGhhdCBoYXZlIGJlZW4gY29tcGxldGVkXG4gICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgZ2V0X3Jvd3NfY29tcGxldGVkKCkge1xuICAgICAgICByZXR1cm4gd2FzbS50ZXRyaXNfZ2V0X3Jvd3NfY29tcGxldGVkKHRoaXMucHRyKSA+Pj4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgZ2V0X2hvbGRfcGllY2UoKSB7XG4gICAgICAgIHJldHVybiB3YXNtLnRldHJpc19nZXRfaG9sZF9waWVjZSh0aGlzLnB0cik7XG4gICAgfVxuICAgIC8qKlxuICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAqL1xuICAgIGdldF9xdWV1ZWRfcGllY2VzKCkge1xuICAgICAgICByZXR1cm4gd2FzbS50ZXRyaXNfZ2V0X3F1ZXVlZF9waWVjZXModGhpcy5wdHIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJldHVybiBhIHBvaW50ZXIgdG8gdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGJvYXJkcyB2ZWN0b3JcbiAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICBnZXRfY2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB3YXNtLnRldHJpc19nZXRfY2VsbHModGhpcy5wdHIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJldHVybiB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIGFjdGl2ZSBwaWVjZVxuICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAqL1xuICAgIGdldF9waWVjZXMoKSB7XG4gICAgICAgIHJldHVybiB3YXNtLnRldHJpc19nZXRfcGllY2VzKHRoaXMucHRyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXQgdGhlIHBpZWNlcyBib3VuZGluZyBib3ggc2l6ZVxuICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAqL1xuICAgIGdldF9waWVjZV9ib3VuZGluZ19ib3goKSB7XG4gICAgICAgIHJldHVybiB3YXNtLnRldHJpc19nZXRfcGllY2VfYm91bmRpbmdfYm94KHRoaXMucHRyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXQgdGhlIGFjdGl2ZXMgcGllY2VzIHR5cGVcbiAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICBnZXRfcGllY2VfdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHdhc20udGV0cmlzX2dldF9waWVjZV90eXBlKHRoaXMucHRyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXQgdGhlIHdvcmxkIGNvb3JkaW5hdGVzIG9mIHRoZSBhY3RpdmUgcGllY2UgcG9zaXRpb25cbiAgICAqIEByZXR1cm5zIHtQb2ludH1cbiAgICAqL1xuICAgIGdldF9waWVjZV9wb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBvaW50Ll9fd3JhcCh3YXNtLnRldHJpc19nZXRfcGllY2VfcG9zaXRpb24odGhpcy5wdHIpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAcmV0dXJucyB7UG9pbnR9XG4gICAgKi9cbiAgICBnZXRfc2hhZG93X3BpZWNlX3Bvc2l0aW9uKCkge1xuICAgICAgICByZXR1cm4gUG9pbnQuX193cmFwKHdhc20udGV0cmlzX2dldF9zaGFkb3dfcGllY2VfcG9zaXRpb24odGhpcy5wdHIpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyb3BPYmplY3QoaWR4KSB7XG4gICAgaWYgKGlkeCA8IDM2KSByZXR1cm47XG4gICAgaGVhcFtpZHhdID0gaGVhcF9uZXh0O1xuICAgIGhlYXBfbmV4dCA9IGlkeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JpbmRnZW5fb2JqZWN0X2Ryb3BfcmVmKGkpIHsgZHJvcE9iamVjdChpKTsgfVxuXG4iLCJpbXBvcnQgeyBDZWxsLCBUZXRyaXMsIEFjdGlvbiB9IGZyb20gXCJydXN0eS13ZWItdGV0cmlzXCI7XG5pbXBvcnQgeyBtZW1vcnkgfSBmcm9tIFwicnVzdHktd2ViLXRldHJpcy9ydXN0eV93ZWJfdGV0cmlzX2JnXCI7XG5pbXBvcnQgSW5wdXRDb250cm9sbGVyIGZyb20gXCIuL0lucHV0Q29udHJvbGxlclwiO1xuXG5jb25zdCBERUJVR19HQU1FID0gZmFsc2U7XG5cbmNsYXNzIEdhbWUge1xuXG4gICAgcHJpdmF0ZSB0ZXRyaXM6IFRldHJpcztcbiAgICBwcml2YXRlIGlucHV0Q29udHJvbGxlcjogSW5wdXRDb250cm9sbGVyO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSByZWFkb25seSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdG90YWxIZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJvYXJkSGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGFuaW1hdGlvbklkPzogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gICAgcHJpdmF0ZSBjb25maWc6IGFueSA9IHtcbiAgICAgICAgZ3JpZENvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgY2VsbFNpemU6IDM1LFxuICAgIH07XG5cbiAgICBnZXQgaXNQYXVzZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbklkID09PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGlzUnVubmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uSWQgIT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBoZWlnaHQoKSB7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLmJvYXJkSGVpZ2h0O1xuICAgICAgICBpZiAoREVCVUdfR0FNRSkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy50b3RhbEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IG9mZnNldEhlaWdodCgpIHtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMudG90YWxIZWlnaHQgLSB0aGlzLmJvYXJkSGVpZ2h0O1xuICAgICAgICBpZiAoREVCVUdfR0FNRSkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHRldHJpczogVGV0cmlzLCBjb25maWc6IHt9ID0ge30pIHtcbiAgICAgICAgdGhpcy50ZXRyaXMgPSB0ZXRyaXM7XG4gICAgICAgIHRoaXMud2lkdGggPSB0ZXRyaXMuZ2V0X3dpZHRoKCk7XG4gICAgICAgIHRoaXMudG90YWxIZWlnaHQgPSB0ZXRyaXMuZ2V0X2hlaWdodCgpO1xuICAgICAgICB0aGlzLmJvYXJkSGVpZ2h0ID0gdGhpcy50b3RhbEhlaWdodCAtIHRldHJpcy5nZXRfb2Zmc2V0X2hlaWdodCgpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV0cmlzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSE7XG4gICAgICAgIHRoaXMuY29uZmlnID0geyAuLi50aGlzLmNvbmZpZywgLi4uY29uZmlnIH07XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9ICh0aGlzLmNvbmZpZy5jZWxsU2l6ZSArIDEpICogdGhpcy5oZWlnaHQgKyAxO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9ICh0aGlzLmNvbmZpZy5jZWxsU2l6ZSArIDEpICogdGhpcy53aWR0aCArIDE7XG4gICAgICAgIHRoaXMuaW5wdXRDb250cm9sbGVyID0gbmV3IElucHV0Q29udHJvbGxlcigpO1xuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5zdGFydCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUXVldWVkUGllY2VzKCk7XG4gICAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGF1c2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUnVubmluZykge1xuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25JZCEpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25JZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHBhdXNlIHRoZSBnYW1lIHdoZW4gaXQgaXMgYWxyZWFkeSBwYXVzZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucnVuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHBsYXkgdGhlIGdhbWUgd2hlbiBpdCBpcyBhbHJlYWR5IHBsYXlpbmdcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJ1biA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRDb250cm9sbGVyLklucHV0LkVzY2FwZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNSdW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRldHJpcy5ldmVudF9oYW5kbGVyKHRoaXMuaW5wdXRDb250cm9sbGVyLmdldEV2ZW50UXVldWUoKSk7XG4gICAgICAgIGNvbnN0IGJvYXJkTWVyZ2VkID0gdGhpcy50ZXRyaXMudXBkYXRlKHBlcmZvcm1hbmNlLm5vdygpKTtcbiAgICAgICAgdGhpcy5kcmF3R3JpZCgpO1xuICAgICAgICB0aGlzLmRyYXdDZWxscygpO1xuICAgICAgICB0aGlzLmRyYXdQaWVjZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhvbGRQaWVjZSgpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjb3JlXCIpIS50ZXh0Q29udGVudCA9IGAke3RoaXMudGV0cmlzLmdldF9zY29yZSgpfWA7XG5cbiAgICAgICAgaWYgKGJvYXJkTWVyZ2VkKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgcXVldWVkIHBpZWNlcyB2aWV3XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVF1ZXVlZFBpZWNlcygpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZXZlbFwiKSEudGV4dENvbnRlbnQgPSBgJHt0aGlzLnRldHJpcy5nZXRfbGV2ZWwoKX1gO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3dzX2NvbXBsZXRlZFwiKSEudGV4dENvbnRlbnQgPSBgJHt0aGlzLnRldHJpcy5nZXRfcm93c19jb21wbGV0ZWQoKX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb25JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJ1bik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3R3JpZCgpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb25maWcuZ3JpZENvbG9yO1xuXG4gICAgICAgIC8vIFZlcnRpY2FsIGxpbmVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMud2lkdGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKGkgKiAodGhpcy5jb25maWcuY2VsbFNpemUgKyAxKSArIDEsIDApO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKFxuICAgICAgICAgICAgICAgIGkgKiAodGhpcy5jb25maWcuY2VsbFNpemUgKyAxKSArIDEsXG4gICAgICAgICAgICAgICAgKHRoaXMuY29uZmlnLmNlbGxTaXplICsgMSkgKiB0aGlzLmhlaWdodCArIDEsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSG9yaXpvbnRhbCBsaW5lc1xuICAgICAgICBmb3IgKGxldCBqID0gdGhpcy5oZWlnaHQ7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8odGhpcy5vZmZzZXRIZWlnaHQsIGogKiAodGhpcy5jb25maWcuY2VsbFNpemUgKyAxKSArIDEpO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKFxuICAgICAgICAgICAgICAgICh0aGlzLmNvbmZpZy5jZWxsU2l6ZSArIDEpICogdGhpcy53aWR0aCArIDEsXG4gICAgICAgICAgICAgICAgaiAqICh0aGlzLmNvbmZpZy5jZWxsU2l6ZSArIDEpICsgMSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdDZWxscygpIHtcbiAgICAgICAgY29uc3QgY2VsbHNQdHIgPSB0aGlzLnRldHJpcy5nZXRfY2VsbHMoKTtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyLCBjZWxsc1B0ciwgdGhpcy53aWR0aCAqIHRoaXMudG90YWxIZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gdGhpcy5vZmZzZXRIZWlnaHQ7IHJvdyA8IHRoaXMudG90YWxIZWlnaHQ7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLndpZHRoOyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRJbmRleChyb3csIGNvbCk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxzW2luZGV4XSA9PT0gQ2VsbC5FTVBUWSAmJiByb3cgPCB0aGlzLnRvdGFsSGVpZ2h0IC0gdGhpcy5ib2FyZEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiMxMzI0NTZcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmdldENvbG9yKGNlbGxzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2VsbChyb3csIGNvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoREVCVUdfR0FNRSkge1xuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSB0aGlzLm9mZnNldEhlaWdodDsgcm93IDwgdGhpcy50b3RhbEhlaWdodDsgcm93KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLndpZHRoOyBjb2wrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxNHB4IEFyaWFsXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMuZ2V0SW5kZXgocm93LCBjb2wpfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wgKiAodGhpcy5jb25maWcuY2VsbFNpemUgKyAxKSArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAocm93IC0gdGhpcy5vZmZzZXRIZWlnaHQpICogKHRoaXMuY29uZmlnLmNlbGxTaXplICsgMSkgKyB0aGlzLmNvbmZpZy5jZWxsU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdQaWVjZSgpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnRldHJpcy5nZXRfcGllY2VfcG9zaXRpb24oKTtcbiAgICAgICAgY29uc3Qgc2hhZG93UGllY2VQb3NpdGlvbiA9IHRoaXMudGV0cmlzLmdldF9zaGFkb3dfcGllY2VfcG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgYm91bmRpbmdCb3ggPSB0aGlzLnRldHJpcy5nZXRfcGllY2VfYm91bmRpbmdfYm94KCk7XG4gICAgICAgIGNvbnN0IGNlbGxzUHRyID0gdGhpcy50ZXRyaXMuZ2V0X3BpZWNlcygpO1xuICAgICAgICBjb25zdCBjZWxsVHlwZSA9IHRoaXMudGV0cmlzLmdldF9waWVjZV90eXBlKCk7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gbmV3IFVpbnQ4QXJyYXkobWVtb3J5LmJ1ZmZlciwgY2VsbHNQdHIsIGJvdW5kaW5nQm94ICogYm91bmRpbmdCb3gpO1xuXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib3VuZGluZ0JveDsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGJvdW5kaW5nQm94OyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcm93ICogYm91bmRpbmdCb3ggKyBjb2w7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2VsbHNbaW5kZXhdICE9PSBDZWxsLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuZ2V0Q29sb3IoY2VsbFR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IDAuNTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2VsbChyb3cgKyBzaGFkb3dQaWVjZVBvc2l0aW9uLnksIGNvbCArIHNoYWRvd1BpZWNlUG9zaXRpb24ueCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Q2VsbChyb3cgKyBwb3NpdGlvbi55LCBjb2wgKyBwb3NpdGlvbi54KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVF1ZXVlZFBpZWNlcygpIHtcbiAgICAgICAgY29uc3QgcHJldmlld3M6IE5vZGVMaXN0T2Y8SFRNTENhbnZhc0VsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmV2aWV3XCIpO1xuICAgICAgICBjb25zdCBxdWV1ZWRQaWVjZXMgPSB0aGlzLnRldHJpcy5nZXRfcXVldWVkX3BpZWNlcygpO1xuICAgICAgICBjb25zdCBjZWxscyA9IG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIsIHF1ZXVlZFBpZWNlcywgNik7XG4gICAgICAgIHByZXZpZXdzLmZvckVhY2goIChjYW52YXMsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSE7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gY2VsbHNbaW5kZXhdO1xuXG4gICAgICAgICAgICAvLyBkcmF3IGluIGJhY2tncm91bmRcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCAxNTAsIDE1MCk7XG5cbiAgICAgICAgICAgIGxldCBib3VuZGluZ0JveCA9IDM7XG4gICAgICAgICAgICBpZiAoY2VsbCA9PT0gQ2VsbC5PKSB7XG4gICAgICAgICAgICAgICAgYm91bmRpbmdCb3ggPSAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsID09PSBDZWxsLkkpIHtcbiAgICAgICAgICAgICAgICBib3VuZGluZ0JveCA9IDQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHBpZWNlXG4gICAgICAgICAgICBjb25zdCBwaWVjZXMgPSBnZXRDZWxscyhjZWxsKTtcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZ2V0Q29sb3IoY2VsbCk7XG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib3VuZGluZ0JveDsgcm93KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBib3VuZGluZ0JveDsgY29sKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IHJvdyAqIGJvdW5kaW5nQm94ICsgY29sO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2VzW2ldICE9PSBDZWxsLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZ2V0Q29sb3IoY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wgKiAodGhpcy5jb25maWcuY2VsbFNpemUgKyAxKSArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgKiAodGhpcy5jb25maWcuY2VsbFNpemUgKyAxKSArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5jZWxsU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmNlbGxTaXplLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVIb2xkUGllY2UoKSB7XG4gICAgICAgIGNvbnN0IGhvbGRDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvbGRfcGllY2VcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGhvbGRDZWxsID0gdGhpcy50ZXRyaXMuZ2V0X2hvbGRfcGllY2UoKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGhvbGRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpITtcbiAgICAgICAgLy8gZHJhdyBpbiBiYWNrZ3JvdW5kXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgMTUwLCAxNTApO1xuXG4gICAgICAgIGxldCBib3VuZGluZ0JveCA9IDM7XG4gICAgICAgIGlmIChob2xkQ2VsbCA9PT0gQ2VsbC5PKSB7XG4gICAgICAgICAgICBib3VuZGluZ0JveCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAoaG9sZENlbGwgPT09IENlbGwuSSkge1xuICAgICAgICAgICAgYm91bmRpbmdCb3ggPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGllY2VcbiAgICAgICAgY29uc3QgcGllY2VzID0gZ2V0Q2VsbHMoaG9sZENlbGwpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZ2V0Q29sb3IoaG9sZENlbGwpO1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBib3VuZGluZ0JveDsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGJvdW5kaW5nQm94OyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSByb3cgKiBib3VuZGluZ0JveCArIGNvbDtcbiAgICAgICAgICAgICAgICBpZiAocGllY2VzW2ldICE9PSBDZWxsLkVNUFRZKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5nZXRDb2xvcihob2xkQ2VsbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICAgICAgY29sICogKHRoaXMuY29uZmlnLmNlbGxTaXplICsgMSkgKyAxLFxuICAgICAgICAgICAgICAgICAgICByb3cgKiAodGhpcy5jb25maWcuY2VsbFNpemUgKyAxKSArIDEsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmNlbGxTaXplLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5jZWxsU2l6ZSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdDZWxsKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChcbiAgICAgICAgICAgIGNvbCAqICh0aGlzLmNvbmZpZy5jZWxsU2l6ZSArIDEpICsgMSxcbiAgICAgICAgICAgIChyb3cgLSB0aGlzLm9mZnNldEhlaWdodCkgKiAodGhpcy5jb25maWcuY2VsbFNpemUgKyAxKSArIDEsXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jZWxsU2l6ZSxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmNlbGxTaXplLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW5kZXgocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiByb3cgKiB0aGlzLndpZHRoICsgY29sO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29sb3IoY2VsbDogQ2VsbCk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAoY2VsbCkge1xuICAgICAgICAgICAgY2FzZSBDZWxsLkVNUFRZOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIiMwMDBcIjsgLy8gYmxhY2tcbiAgICAgICAgICAgIGNhc2UgQ2VsbC5JOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIiMwMEZGRkZcIjsgLy8gY3lhblxuICAgICAgICAgICAgY2FzZSBDZWxsLk86XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiI0ZGRkYwMFwiOyAvLyB5ZWxsb3dcbiAgICAgICAgICAgIGNhc2UgQ2VsbC5UOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIiM4MDAwODBcIjsgLy8gcHVycGxlXG4gICAgICAgICAgICBjYXNlIENlbGwuUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIjMDBGRjAwXCI7IC8vIGdyZWVuXG4gICAgICAgICAgICBjYXNlIENlbGwuWjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIjRkYwMDAwXCI7IC8vIFJlZFxuICAgICAgICAgICAgY2FzZSBDZWxsLko6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiIzAwMDBGRlwiOyAvLyBCbHVlXG4gICAgICAgICAgICBjYXNlIENlbGwuTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIjRkZBNTAwXCI7IC8vIE9yYW5nZVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIjRkZGRkZGXCI7IC8vIHdoaXRlXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldENlbGxzKGNlbGw6IENlbGwpIHtcbiAgICBzd2l0Y2ggKGNlbGwpIHtcbiAgICAgICAgY2FzZSBDZWxsLk86XG4gICAgICAgICAgICByZXR1cm4gW0NlbGwuTywgQ2VsbC5PLFxuICAgICAgICAgICAgICAgICAgICBDZWxsLk8sIENlbGwuT107XG4gICAgICAgIGNhc2UgQ2VsbC5JOlxuICAgICAgICAgICAgcmV0dXJuIFtDZWxsLkVNUFRZLCBDZWxsLkVNUFRZLCBDZWxsLkVNUFRZLCBDZWxsLkVNUFRZLFxuICAgICAgICAgICAgICAgICAgICBDZWxsLkksICAgICBDZWxsLkksICAgICBDZWxsLkksICAgICBDZWxsLkksXG4gICAgICAgICAgICAgICAgICAgIENlbGwuRU1QVFksIENlbGwuRU1QVFksIENlbGwuRU1QVFksIENlbGwuRU1QVFksXG4gICAgICAgICAgICAgICAgICAgIENlbGwuRU1QVFksIENlbGwuRU1QVFksIENlbGwuRU1QVFksIENlbGwuRU1QVFldO1xuICAgICAgICBjYXNlIENlbGwuVDpcbiAgICAgICAgICAgIHJldHVybiBbQ2VsbC5FTVBUWSwgQ2VsbC5ULCBDZWxsLkVNUFRZLFxuICAgICAgICAgICAgICAgICAgICBDZWxsLlQsIENlbGwuVCwgQ2VsbC5ULFxuICAgICAgICAgICAgICAgICAgICBDZWxsLkVNUFRZLCBDZWxsLkVNUFRZLCBDZWxsLkVNUFRZXTtcbiAgICAgICAgY2FzZSBDZWxsLlM6XG4gICAgICAgICAgICByZXR1cm4gW0NlbGwuRU1QVFksIENlbGwuUywgQ2VsbC5TLFxuICAgICAgICAgICAgICAgICAgICBDZWxsLlMsIENlbGwuUywgQ2VsbC5FTVBUWSxcbiAgICAgICAgICAgICAgICAgICAgQ2VsbC5FTVBUWSwgQ2VsbC5FTVBUWSwgQ2VsbC5FTVBUWV07XG4gICAgICAgIGNhc2UgQ2VsbC5aOlxuICAgICAgICAgICAgcmV0dXJuIFtDZWxsLlosIENlbGwuWiwgQ2VsbC5FTVBUWSxcbiAgICAgICAgICAgICAgICAgICAgQ2VsbC5FTVBUWSwgQ2VsbC5aLCBDZWxsLlosXG4gICAgICAgICAgICAgICAgICAgIENlbGwuRU1QVFksIENlbGwuRU1QVFksIENlbGwuRU1QVFldO1xuICAgICAgICBjYXNlIENlbGwuSjpcbiAgICAgICAgICAgIHJldHVybiBbQ2VsbC5FTVBUWSwgQ2VsbC5FTVBUWSwgQ2VsbC5KLFxuICAgICAgICAgICAgICAgICAgICBDZWxsLkosIENlbGwuSiwgQ2VsbC5KLFxuICAgICAgICAgICAgICAgICAgICBDZWxsLkVNUFRZLCBDZWxsLkVNUFRZLCBDZWxsLkVNUFRZXTtcbiAgICAgICAgY2FzZSBDZWxsLkw6XG4gICAgICAgICAgICByZXR1cm4gW0NlbGwuTCwgQ2VsbC5FTVBUWSwgQ2VsbC5FTVBUWSxcbiAgICAgICAgICAgICAgICAgICAgQ2VsbC5MLCBDZWxsLkwsIENlbGwuTCxcbiAgICAgICAgICAgICAgICAgICAgQ2VsbC5FTVBUWSwgQ2VsbC5FTVBUWSwgQ2VsbC5FTVBUWV07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gW0NlbGwuRU1QVFldO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCJydXN0eS13ZWItdGV0cmlzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0Q29udHJvbGxlciB7XG5cbiAgICBwcml2YXRlIGxpc3RlbmluZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIGlucHV0OiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHtcbiAgICAgICAgU2hpZnRMZWZ0OiBmYWxzZSxcbiAgICAgICAgQ29udHJvbExlZnQ6IGZhbHNlLFxuICAgICAgICBFc2NhcGU6IGZhbHNlLFxuICAgICAgICBTcGFjZTogZmFsc2UsXG4gICAgICAgIEFycm93TGVmdDogZmFsc2UsXG4gICAgICAgIEFycm93VXA6IGZhbHNlLFxuICAgICAgICBBcnJvd1JpZ2h0OiBmYWxzZSxcbiAgICAgICAgQXJyb3dEb3duOiBmYWxzZSxcbiAgICAgICAgS2V5QzogZmFsc2UsXG4gICAgICAgIEtleVg6IGZhbHNlLFxuICAgICAgICBLZXlaOiBmYWxzZSxcbiAgICAgICAgTnVtcGFkMDogZmFsc2UsXG4gICAgICAgIE51bXBhZDE6IGZhbHNlLFxuICAgICAgICBOdW1wYWQyOiBmYWxzZSxcbiAgICAgICAgTnVtcGFkMzogZmFsc2UsXG4gICAgICAgIE51bXBhZDQ6IGZhbHNlLFxuICAgICAgICBOdW1wYWQ1OiBmYWxzZSxcbiAgICAgICAgTnVtcGFkNjogZmFsc2UsXG4gICAgICAgIE51bXBhZDc6IGZhbHNlLFxuICAgICAgICBOdW1wYWQ4OiBmYWxzZSxcbiAgICAgICAgTnVtcGFkOTogZmFsc2UsXG4gICAgICAgIEYxOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgZ2V0IElucHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGtleU1hcDogeyBba2V5OiBudW1iZXJdOiBzdHJpbmcgfSA9IHtcbiAgICAgICAgMTY6ICBcIlNoaWZ0TGVmdFwiLFxuICAgICAgICAxNzogIFwiQ29udHJvbExlZnRcIixcbiAgICAgICAgMjc6ICBcIkVzY2FwZVwiLFxuICAgICAgICAzMjogIFwiU3BhY2VcIixcbiAgICAgICAgMzc6ICBcIkFycm93TGVmdFwiLFxuICAgICAgICAzODogIFwiQXJyb3dVcFwiLFxuICAgICAgICAzOTogIFwiQXJyb3dSaWdodFwiLFxuICAgICAgICA0MDogIFwiQXJyb3dEb3duXCIsXG4gICAgICAgIDY3OiAgXCJLZXlDXCIsXG4gICAgICAgIDg4OiAgXCJLZXlYXCIsXG4gICAgICAgIDkwOiAgXCJLZXlaXCIsXG4gICAgICAgIDk2OiAgXCJOdW1wYWQwXCIsXG4gICAgICAgIDk3OiAgXCJOdW1wYWQxXCIsXG4gICAgICAgIDk4OiAgXCJOdW1wYWQyXCIsXG4gICAgICAgIDk5OiAgXCJOdW1wYWQzXCIsXG4gICAgICAgIDEwMDogXCJOdW1wYWQ0XCIsXG4gICAgICAgIDEwMTogXCJOdW1wYWQ1XCIsXG4gICAgICAgIDEwMjogXCJOdW1wYWQ2XCIsXG4gICAgICAgIDEwMzogXCJOdW1wYWQ3XCIsXG4gICAgICAgIDEwNDogXCJOdW1wYWQ4XCIsXG4gICAgICAgIDEwNTogXCJOdW1wYWQ5XCIsXG4gICAgICAgIDExMjogXCJGMVwiLFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5pbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnQoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5rZXlib2FyZEV2ZW50KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMua2V5Ym9hcmRFdmVudCk7XG4gICAgICAgIHRoaXMubGlzdGVuaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmluZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBzdGFydCgpIHRoZSBJbnB1dENvbnRyb2xsZXIgYmVmb3JlIHlvdSBjYW4gc3RvcCgpIGl0IVwiKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMua2V5Ym9hcmRFdmVudCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmtleWJvYXJkRXZlbnQpO1xuICAgICAgICB0aGlzLmxpc3RlbmluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRPRE86IENvbnZlcnQgdG8gYmFjayB0byBBY3Rpb25bXVxuICAgIHB1YmxpYyBnZXRFdmVudFF1ZXVlKCk6IFVpbnQ4QXJyYXkgLypBY3Rpb25bXSovIHtcbiAgICAgICAgY29uc3QgaSA9IHRoaXMuaW5wdXQ7XG4gICAgICAgIGNvbnN0IGV2ZW50UXVldWU6IEFjdGlvbltdID0gW107XG4gICAgICAgIGlmIChpLk51bXBhZDEgfHwgaS5OdW1wYWQ1IHx8IGkuTnVtcGFkOSB8fCBpLktleVggfHwgaS5BcnJvd1VwKSB7XG4gICAgICAgICAgICBldmVudFF1ZXVlLnB1c2goQWN0aW9uLlJvdGF0ZUNsb2NrV2lzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkuTnVtcGFkMyB8fCBpLk51bXBhZDcgfHwgaS5Db250cm9sTGVmdCB8fCBpLktleVopIHtcbiAgICAgICAgICAgIGV2ZW50UXVldWUucHVzaChBY3Rpb24uUm90YXRlQ291bnRlckNsb2NrV2lzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkuTnVtcGFkOCB8fCBpLlNwYWNlKSB7XG4gICAgICAgICAgICBldmVudFF1ZXVlLnB1c2goQWN0aW9uLkhhcmREcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaS5OdW1wYWQwIHx8IGkuS2V5QyB8fCBpLlNoaWZ0TGVmdCkge1xuICAgICAgICAgICAgZXZlbnRRdWV1ZS5wdXNoKEFjdGlvbi5Ib2xkUGllY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpLk51bXBhZDQgfHwgaS5BcnJvd0xlZnQpIHtcbiAgICAgICAgICAgIGV2ZW50UXVldWUucHVzaChBY3Rpb24uTW92ZUxlZnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpLk51bXBhZDYgfHwgaS5BcnJvd1JpZ2h0KSB7XG4gICAgICAgICAgICBldmVudFF1ZXVlLnB1c2goQWN0aW9uLk1vdmVSaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkuTnVtcGFkMiB8fCBpLkFycm93RG93bikge1xuICAgICAgICAgICAgZXZlbnRRdWV1ZS5wdXNoKEFjdGlvbi5Tb2Z0RHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogVEhJUyBTSE9VTEROJ1QgQkUgTkVFREVELCBQT1NUIEFuIElTU1VFXG4gICAgICAgIGNvbnN0IGJ5dGVFdmVudFF1ZXVlID0gbmV3IFVpbnQ4QXJyYXkoZXZlbnRRdWV1ZS5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGV2ZW50UXVldWUubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRRdWV1ZVtqXTtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEFjdGlvbi5IYXJkRHJvcDogYnl0ZUV2ZW50UXVldWVbal0gPSAwOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEFjdGlvbi5Ib2xkUGllY2U6IGJ5dGVFdmVudFF1ZXVlW2pdID0gMTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb24uUm90YXRlQ2xvY2tXaXNlOiBieXRlRXZlbnRRdWV1ZVtqXSA9IDI7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uLlJvdGF0ZUNvdW50ZXJDbG9ja1dpc2U6IGJ5dGVFdmVudFF1ZXVlW2pdID0gMzsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb24uTW92ZUxlZnQ6IGJ5dGVFdmVudFF1ZXVlW2pdID0gNDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBBY3Rpb24uTW92ZVJpZ2h0OiBieXRlRXZlbnRRdWV1ZVtqXSA9IDU7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uLlNvZnREcm9wOiBieXRlRXZlbnRRdWV1ZVtqXSA9IDY7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQWN0aW9uLlRvZ2dsZVJ1bm5pbmc6IGJ5dGVFdmVudFF1ZXVlW2pdID0gNzsgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVFdmVudFF1ZXVlO1xuICAgIH1cblxuICAgIHByaXZhdGUga2V5Ym9hcmRFdmVudCA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5nZXRLZXlDb2RlKGV2ZW50KTtcbiAgICAgICAgdGhpcy5pbnB1dFtjb2RlXSA9IGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0S2V5Q29kZShldmVudDogS2V5Ym9hcmRFdmVudCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBjb2RlID0gZXZlbnQuY29kZTtcbiAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICBjb2RlID0gdGhpcy5rZXlNYXBbZXZlbnQua2V5Q29kZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVGV0cmlzIH0gZnJvbSBcInJ1c3R5LXdlYi10ZXRyaXNcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxuY29uc3QgdCA9IG5ldyBHYW1lKFRldHJpcy5uZXcoKSk7XG50LnN0YXJ0R2FtZSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==