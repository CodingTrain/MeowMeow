// Slide Puzzle Canvas
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/165-slide-puzzle.html
// https://youtu.be/uQZLzhrzEs4

// Image: https://editor.p5js.org/codingtrain/sketches/o_ljlLilZ
// Video: https://editor.p5js.org/codingtrain/sketches/YnLX7bGwW
// Canvas: https://editor.p5js.org/codingtrain/sketches/MVCd9trLw

// image, tiles, and puzzle configurations
let source;
let tiles = [];
let board = [];
let cols = 5;
let rows = 5;
let w, h;

let filenames = []; // to store the filenames
let images = []; // to store the loaded images

// Tile class, should include functionality
class Tile {
  constructor(i, img) {
    this.index = i;
    this.img = img;
  }
}

// Load filenames
function preload() {
  filenames = loadStrings('tiles.txt');
}

function setup() {
  createCanvas(600, 600);

  // Initializing the tiles and the board
  w = width / cols; // Calculate the width of each tile
  h = height / rows; // Calculate the height of each tile
  initializeTiles();

  filenames = filenames.filter((item) => item);
  filenames.forEach((filename, index) => {
    loadImage('tiles/' + filename, (img) => {
      img.resize(w, h);
      let tile = tiles[index];
      tile.img.copy(img, 0, 0, w, h, 0, 0, w, h);
    });
  });

  //tiles.pop();
  board.pop();
  board.push(-1); // Marking the last tile as blank

  // Shuffling the tiles
  simpleShuffle(board);
}

// Initialize tiles and board
function initializeTiles() {
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let img = createImage(floor(w), floor(h));
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles[index] = tile;
    }
  }
}

// Swap positions of two elements in array
function swap(i, j, arr) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// Shuffle of the board
function simpleShuffle(arr) {
  for (let i = 0; i < 1200; i++) {
    randomMove(arr);
  }
}
function randomMove(arr) {
  let blank = findBlank();
  let spots = [];
  let col = blank % cols;
  let row = floor(blank / rows);

  // (right, left, down, up)
  const directions = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ];

  // All movies
  for (const dir of directions) {
    let x = col + dir.dx;
    let y = row + dir.dy;

    // Check if new position is within the board
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      spots.push({ x, y });
    }
  }

  let choice = random(spots); // Choose a random move
  let a = blank;
  let b = choice.x + choice.y * cols;

  swap(a, b, arr); // Swap the tiles
  return { a, b };
}

// For animation of swapping tiles
let swapping = false;
let targetIndex = -2;
let amt = 0;
let targetX, targetY;

// A click!
function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);

  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / rows);

  // Valid move? Start the swap!
  if (isNeighbor(i, j, blankCol, blankRow)) {
    targetIndex = i + j * cols;
    swapping = true;
    amt = 0;
    let targetCol = blank % cols;
    let targetRow = floor(blank / rows);
    targetX = w * targetCol;
    targetY = h * targetRow;
  }
}

function draw() {
  background(0);

  // Draw everything
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        let img = tiles[tileIndex].img;
        // Handle animating tile
        if (swapping && index == targetIndex) {
          x = lerp(x, targetX, amt);
          y = lerp(y, targetY, amt);
          amt += 0.1;
          if (amt >= 1) {
            swapping = false;
            let blank = findBlank();
            swap(blank, targetIndex, board);
          }
        }
        image(img, x, y, w, h);
      }
    }
  }

  // Grid lines
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      stroke(0);
      strokeWeight(1);
      noFill();
      rect(x, y, w, h);
    }
  }

  if (isSolved()) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        image(tiles[i + j * cols].img, i * w, j * h);
      }
    }
    noLoop();
  }
}

// Check if the puzzle is solved
function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

// Check if two positions are neighbors (horizontally or vertically adjacent)

function isNeighbor(i, j, x, y) {
  if (i !== x && j !== y) {
    return false;
  }
  if (abs(i - x) == 1 || abs(j - y) == 1) {
    return true;
  }
  return false;
}

// Find the position of the blank tile on the board
function findBlank() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) return i;
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  const deviceWidth = screen.width;
  const canvasWidth = 600;

  const scale = (0.9 * deviceWidth) / canvasWidth;

  if (scale > 1) scale == 1.0;

  const viewport = document.querySelector('meta[name="viewport"]');

  viewport.setAttribute(
    'content',
    `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`
  );
});
