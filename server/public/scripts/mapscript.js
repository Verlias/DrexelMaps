const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match the viewport initially
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load map image
const mapImage = new Image();
mapImage.src = 'img/mapbig.png'; // Path to your map image

// Initial position and scale
let offsetX = -100;
let offsetY = -500;
let scale = .5;

// Draw map image
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mapImage, offsetX, offsetY, mapImage.width * scale, mapImage.height * scale);
}

// Handle arrow keys for panning
document.addEventListener('keydown', e => {
    const panSpeed = 10;
    switch (e.key) {
        case 'ArrowUp':
            if (offsetY + panSpeed < 0)
                offsetY += panSpeed;
            else
                offsetY = 0;
            break;
        case 'ArrowDown':
            if ((offsetY - panSpeed) - canvas.height > -mapImage.height * scale)
                offsetY -= panSpeed;
            break;
        case 'ArrowLeft':
            if (offsetX + panSpeed < 0)
                offsetX += panSpeed;
            else
                offsetX = 0;
            break;
        case 'ArrowRight':
            if ((offsetX - panSpeed) - canvas.width > -mapImage.height * scale)
                offsetX -= panSpeed;
            break;
    }
    draw();
});

// Handle + and - keys for zooming
document.addEventListener('keydown', e => {
    const zoomSpeed = 0.1;
    const zoomOut = .5
    const zoomIn = 1.5;
    switch (e.key) {
        case '+':
            if (scale < zoomIn)
                scale += zoomSpeed;
            else
                scale = zoomIn;
            break;
        case '-':
            if (scale > zoomOut)
                scale -= zoomSpeed;
            else
                scale = zoomOut;
            break;
    }
    draw();
});


// Initial draw
mapImage.onload = draw;
