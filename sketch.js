const SIZE = 4;
const WIDTH = 128;
const HEIGHT = 128;

let sandPile;
let img;

function setup() {

    // Create Canvas
    createCanvas(SIZE * WIDTH, SIZE * HEIGHT);

    // Create Sand Pile
    sandPile = new Uint32Array(WIDTH * HEIGHT);

    // Find Center
    let cx = Math.round(WIDTH / 2);
    let cy = Math.round(HEIGHT / 2);

    // Add Sand to Center
    sandPile[cx + WIDTH * cy] = 10000;

    img = createImage(width, height);

    frameRate(30);
}

function render() {
    for (let i = 0; i < sandPile.length; i++) {
        let x = i % WIDTH;
        let y = (i - x) / WIDTH;

        let c = sandPile[i];

        let col;

        switch (c) {
            case 0:
                col = [0, 0, 255, 255];
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
                col = [255, 0, 0, 255];
                break;
        }

        for (let k = 0; k < SIZE; k++) {
            for (let j = 0; j < SIZE; j++) {
                img.set((x * SIZE) + k, (y * SIZE) + j, col);
            }
        }
    }
    img.updatePixels();
    image(img, 0, 0);
}

function update() {
    let newPile = new Int32Array(WIDTH * HEIGHT);

    for (let i = 0; i < sandPile.length; i++) {
        if (sandPile[i] <= 3) {
            newPile[i] += sandPile[i];
        } else {
            let x = i % WIDTH;
            let y = (i - x) / WIDTH;
            newPile[i] += sandPile[i] - 4;

            if (x > 0)
                newPile[(x - 1) + WIDTH * y] += 1;
            if (x < WIDTH - 1)
                newPile[(x + 1) + WIDTH * y] += 1;
            if (y > 0)
                newPile[x + WIDTH * (y - 1)] += 1;
            if (y < HEIGHT - 1)
                newPile[x + WIDTH * (y + 1)] += 1;
        }
    }

    sandPile = newPile;
}

function clickHandle() {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height && mouseIsPressed) {
        let x = Math.floor(mouseX / SIZE);
        let y = Math.floor(mouseY / SIZE);
        sandPile[x + WIDTH * y] += 1;
    }
}


function draw() {
    render();
    update();
    clickHandle();
}