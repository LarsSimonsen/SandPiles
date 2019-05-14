const WIDTH = 800;
const HEIGHT = 800;

let sandPile;
let newPile;
let img;
let isDone = false;
let firstX;
let firstY;

function setup() {
  // Create Canvas
  createCanvas(WIDTH, HEIGHT);
  // Create Sand Pile
  sandPile = [];
  newPile = [];
  for (let i = 0; i < HEIGHT; i++) {
    sandPile.push(new Uint8Array(WIDTH));
    newPile.push(new Uint8Array(WIDTH));
  }
  for (let y = 0; y < sandPile.length; y++) {
    for (let x = 0; x < sandPile[y].length; x++) {
      sandPile[y][x] = 0;
      newPile[y][x] = 0;
    }
  }
  addSand();
  img = createImage(width, height);
  frameRate(60);
  firstY = Math.floor(sandPile.length / 2) - 2;
  firstX = Math.floor(sandPile[0].length / 2) - 2;
  //firstX = 1;
  //firstY = 1;
  for (let y = 0; y < sandPile.length; y++) {
    for (let x = 0; x < sandPile[y].length; x++) {
      img.set(x, y, [31, 31, 31, 255]);
    }
  }
}

function addSand() {
  sandPile[Math.floor(HEIGHT / 2)][Math.floor(WIDTH / 2)] = 127;
}

function render() {
  let xlength = sandPile[0].length;
  for (let y = firstY; y < sandPile.length - firstY; y++) {
    for (let x = firstX; x < xlength - firstX; x++) {
      let c = sandPile[y][x];
      let col;
      switch (c) {
        case 0:
          col = [0, 0, 0, 255];
          break;
        case 1:
          col = [128, 192, 255, 255];
          break;
        case 2:
          col = [255, 255, 0, 255];
          break;
        case 3:
          col = [128, 0, 0, 255];
          break;
        default:
          col = [255, 255, 255, 255];
          break;
      }
      img.set(x, y, col);
    }
  }
  img.updatePixels();
  image(img, 0, 0);
}

function topple() {
  let expandedX = false;
  let expandedY = false;
  let toppled = false;
  for (let y = firstY; y < sandPile.length - firstY + 1; y++) {
    for (let x = firstX; x < sandPile[y].length - firstX + 1; x++) {
      newPile[y][x] = sandPile[y][x];
    }
  }
  for (let y = firstY; y < sandPile.length - firstY + 1; y++) {
    for (let x = firstX; x < sandPile[y].length - firstX + 1; x++) {
      if (sandPile[y][x] !== 0 && sandPile[y][x] !== 1 && sandPile[y][x] !== 2 && sandPile[y][x] !== 3) {
        newPile[y][x] -= 4;
        newPile[y][x - 1] += 1;
        newPile[y][x + 1] += 1;
        newPile[y - 1][x] += 1;
        newPile[y + 1][x] += 1;
        toppled = true;
        if (x === firstX) {
          expandedX = true;
          if (x === 2) {
            isDone = true;
          }
        }
        if (y === firstY) {
          expandedY = true;
          if (y === 2) {
            isDone = true;
          }
        }
      }
    }
  }
  {
    const oldPile = sandPile;
    sandPile = newPile;
    newPile = oldPile;
  }
  if (expandedX === true) {
    firstX--;
    if (firstX < 0) {
      firstX = 0;
    }
  }
  if (expandedY === true) {
    firstY--;
    if (firstY < 0) {
      firstY = 0;
    }
  }
}

function clickHandle() {
  /*
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height && mouseIsPressed) {
    let x = Math.floor(mouseX / SIZE);
    let y = Math.floor(mouseY / SIZE);
    sandPile[x + WIDTH * y] += 1;
  }
  */
  if (mouseIsPressed) {
    addSand();
  }
}

function draw() {
  render();
  for (let i = 0; i < 1000 && !isDone; i++) {
    topple();
    addSand();
  }
  if (isDone) {
    //noLoop();
  }

  //clickHandle();
}
