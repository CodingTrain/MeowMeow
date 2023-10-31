# Meow Meow Puzzle

- [Where's Meow Meow?](https://meow-meow-ceo.netlify.app/)
- Code based on [Slide Puzzle Challenge](https://thecodingtrain.com/challenges/165-slide-puzzle)

## Code Structure

- **`Tile` Class**: Represents a tile in the puzzle, holding information like its index and associated image segment.
- **`preload()`**: Preloads necessary assets before the application starts, such as the image used in the puzzle.
- **`setup()`**: Initializes the canvas, resizes the source image, and sets up the initial state of the puzzle, including tiles and board configurations.
- **`initializeTiles()`**: Creates and initializes the tiles and the board. Tiles are created with positions, and an image segment and the board keeps track of tile indices.
- **`updateTiles()`**: Aligns the original image segments to the tiles, ensuring that each tile has the correct segment of the image.
- **`swap(i, j, arr)`**: A utility function that swaps two elements in an array, used to swap tiles on the board.
- **`simpleShuffle(arr)` and `randomMove(arr)`**: These functions shuffle the board tiles randomly, ensuring that the puzzle starts in a mixed state.
- **`mousePressed()`**: Handles user input, allowing tiles to be moved when clicked, as long as the move is valid.
- **`draw()`**: Continuously renders the puzzle, updating tile positions, displaying images, and handling tile animations and movements.
- **`isSolved()`**: Checks whether the puzzle is solved by comparing the current state of the board with the correct sequence of tiles.
- **`isNeighbor(i, j, x, y)`**: Utility function to check whether two tiles are neighbors and therefore, can be swapped.
- **`findBlank()`**: Finds the position of the blank tile, facilitating various operations like valid move checks and tile swapping.
