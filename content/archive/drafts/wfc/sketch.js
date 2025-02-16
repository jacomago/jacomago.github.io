w = 600;
DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let baseImage;

function preload() {
  baseImage = loadImage("/archive/drafts/wfc/imgs/flowerex.png");
}

function imageHash(img) {
  let hash = 0;
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let pixel = img.get(i, j);
      for (let c of pixel) {
        hash = hash * 31 + c;
      }
    }
  }
  return hash;
}

function processImage(img, tile_size = 3) {
  let tiles = new Map();
  let w = img.width;
  let h = img.height;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let img_tile = img.get(i, j, tile_size, tile_size);
      let img_tile_hash = imageHash(img_tile);
      if (tiles.has(img_tile_hash)) {
        let tile = tiles.get(img_tile_hash);
        tile.updateFrequency();
      } else {
        tiles.set(img_tile_hash, new Tile(img_tile));
      }
    }
  }
  for (let [key, tile] of tiles) {
    tile.calc_allowedNeighbours(tiles);
  }
  return tiles;
}

class Tile {
  constructor(img) {
    this.allowed_neighbours = new Map(
      [...DIRECTIONS].map((d) => [d, new Set()])
    );
    this.img = img;
    this.frequency = 1;
    this.hash = imageHash(img);
  }

  updateFrequency() {
    this.frequency = this.frequency + 1;
  }
  allowed(direction, tile_key) {
    return this.allowed_neighbours.get(direction).has(tile_key);
  }
  draw(x, y, w) {
    image(this.img, x, y, w, w);
  }
  calc_allowedNeighbours(tiles) {
    for (let [key, tile] of tiles) {
      for (const direction of DIRECTIONS) {
        let allowed_neighbours = this.allowed_neighbours.get(direction);
        if (this.overlaps(tile, direction)) {
          allowed_neighbours.add(tile.hash);
          this.allowed_neighbours.set(direction, allowed_neighbours);
        }
      }
    }
  }
  overlaps(tile, direction) {
    for (let i = direction[0]; i < this.img.width + direction[0]; i++) {
      for (let j = direction[1]; j < this.img.height + direction[1]; j++) {
        if (i < 0 || j < 0) {
          continue;
        }
        if (i >= this.img.width || j >= this.img.height) {
          continue;
        }
        let pixel = tile.img.get(i, j);
        let pixel2 = this.img.get(i - direction[0], j - direction[1]);

        if (pixel.length != pixel2.length) {
          return false;
        }
        for (let c = 0; c < pixel.length; c++) {
          if (pixel[c] != pixel2[c]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

function checkDirection(direction, grid, pickedTilePos) {
  // check if the direction is valid
  // if it is, return the cell position
  // if not, return null
  let [i, j] = pickedTilePos;
  let [di, dj] = direction;
  let newI = i + di;
  let newJ = j + dj;
  if (newI < 0 || newI >= grid.length || newJ < 0 || newJ >= grid[0].length) {
    return null;
  }
  let newTile = grid[newI][newJ];
  if (newTile.length == 1) {
    return null;
  }
  return [newI, newJ];
}

class Cell {
  constructor(tile_keys) {
    this.tile_keys = tile_keys;
  }
  tile() {
    if (this.tile_keys.length == 1) {
      return this.tile_keys[0];
    }
    return null;
  }
  entropy(tiles) {
    return this.tile_keys
      .map((key) => tiles.get(key).frequency)
      .reduce((a, b) => a + b, 0);
  }
  collapsed() {
    return this.tile_keys.length == 1;
  }
  allowed(direction, key, tiles) {
    return this.tile_keys.some((tile_key) =>
      tiles.get(tile_key).allowed(direction, key)
    );
  }
  update(direction, cell, tiles) {
    if (this.collapsed()) {
      return false;
    }
    let new_tile_keys = this.tile_keys.filter((key) =>
      cell.allowed(direction, key, tiles)
    );
    if (new_tile_keys.length == this.tile_keys.length) {
      return false;
    }
    if (new_tile_keys.length == 0) {
      this.tile_keys = [this.tile_keys[0]];
      return true;
    }
    this.tile_keys = new_tile_keys;
    return true;
  }
  pick(tiles) {
    let weighted_list = this.tile_keys
      .map((key) => Array(tiles.get(key).frequency).fill(key))
      .flat(1);
    let pick = random(weighted_list);
    this.tile_keys = [pick];
    return pick;
  }
}

class Board {
  grid;
  constructor(size, tiles, tile_keys) {
    this.grid = [...Array(size)].map((row) =>
      [...Array(size)].map((col) => new Cell(tile_keys))
    );
    this.tiles = tiles;
  }

  pickCell() {
    // find all the tiles of least entropy, i.e. shortest length

    let minEntropy = Infinity;
    let candidates = [];

    // Find the minimum length (entropy) across all cells
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (
          this.grid[i][j].entropy(this.tiles) < minEntropy &&
          !this.grid[i][j].collapsed()
        ) {
          minEntropy = this.grid[i][j].entropy(this.tiles);
          candidates = [[i, j]];
        } else if (this.grid[i][j].entropy(this.tiles) == minEntropy) {
          candidates.push([i, j]);
        }
      }
    }
    // Pick one of the candidates at random
    return random(candidates);
  }

  draw(w) {
    for (let index = 0; index < this.grid.length; index++) {
      const row = this.grid[index];
      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        if (this.tiles.get(element.tile())) {
          this.tiles.get(element.tile()).draw(index * w, j * w, w);
        } else {
          fill(0);
          text(element, 10, 10);
        }
      }
    }
  }

  totalEntropy() {
    let sum = 0;
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        sum += this.grid[i][j].entropy(this.tiles);
      }
    }
    return sum;
  }
  wfc() {
    let pickedCellPos = this.pickCell();
    if (!pickedCellPos) {
      return;
    }
    console.log(this.totalEntropy());
    console.log(this);
    let pickedCell = this.grid[pickedCellPos[0]][pickedCellPos[1]];
    if (!pickedCell.collapsed()) {
      this.grid[pickedCellPos[0]][pickedCellPos[1]].pick(this.tiles);
      this.reduceEntropy(
        pickedCellPos,
        this.grid[pickedCellPos[0]][pickedCellPos[1]]
      );
    }
  }

  reduceEntropy(pickedCellPos, cell, recurse = 3) {
    if (recurse == 0) {
      return;
    }
    for (const direction of DIRECTIONS) {
      let newPos = checkDirection(direction, this.grid, pickedCellPos);
      if (newPos) {
        let updated = this.grid[newPos[0]][newPos[1]].update(
          direction,
          cell,
          this.tiles
        );
        if (updated) {
          let newCell = this.grid[newPos[0]][newPos[1]];
          this.reduceEntropy(newPos, newCell, recurse - 1);
        }
      }
    }
  }
}

let board;
function setup() {
  let cnv = createCanvas(w, w);

  baseImage.loadPixels();
  let tiles = processImage(baseImage);
  board = new Board(30, tiles, [...tiles.keys()]);
}

function draw() {
  background(250);

  board.wfc();
  board.draw(w / 10);
}
