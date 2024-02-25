// Node class
class Node {
    constructor(name, position, connections) {
        this.name = name;               // String (e.g. "Korman Center 111")
        this.position = position;       // Tuple of floats (x,y)
        this.connections = connections; // Array of Node objects
        this.heuristic = 9999;          // Used to track order in the queue
        this.previous = null;           // Node object (previous connection in A*)
    }
    get x() {
        return this.position[0];
    }

    get y() {
        return this.position[1];
    }

    setPrevious(node) {
        this.previous = node;
    }

    getShifted(offsetX, offsetY, scale) {
        let newX = Math.floor((this.x * scale + offsetX));
        let newY = Math.floor((this.y * scale + offsetY));
        return [newX, newY]
    }

    drawCircle(ctx, offsetX, offsetY, scale) {
        const newPos = this.getShifted(offsetX, offsetY, scale)
        ctx.beginPath();
        ctx.arc(newPos[0], newPos[1], 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath()
    }

    drawPath(ctx, offsetX, offsetY, scale) {
        if (this.previous != null) {
            let fromPos = this.getShifted(offsetX, offsetY, scale)
            let toPos = this.previous.getShifted(offsetX, offsetY, scale)
            ctx.beginPath();
            ctx.moveTo(fromPos[0], fromPos[1]);
            ctx.lineTo(toPos[0], toPos[1]);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath()
            this.previous.drawPath(ctx, offsetX, offsetY, scale)
        }
    }
}

// Canvas
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match the viewport initially
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load map image
const mapImage = new Image();
mapImage.src = 'src/assets/mapbig.png'; // Path to your map image

// Initial position and scale
let offsetX = -100;
let offsetY = -500;
let scale = .5;

// Nodes
testnode = new Node("Korman Center", [1460, 1755], []);
testnode2 = new Node("Disque Hall", [1540, 1790], []);
testnode3 = new Node("Lebow Hall", [1520, 1720], []);
testnode.setPrevious(testnode2)
testnode2.setPrevious(testnode3)

// Draw map image
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mapImage, offsetX, offsetY, mapImage.width * scale, mapImage.height * scale);
    testnode.drawPath(ctx, offsetX, offsetY, scale);
    testnode.drawCircle(ctx, offsetX, offsetY, scale);
    //testnode2.drawCircle(ctx, offsetX, offsetY, scale);
    testnode3.drawCircle(ctx, offsetX, offsetY, scale);
}

// Handle arrow keys for panning
document.addEventListener('keydown', e => {
    const panSpeed = 15;
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