// ----------Start of Classes---------- //
class Node {
    constructor(name, position, connectionsbyid, id) {
        this.name = name;               // String (e.g. "Korman Center 111")
        this.position = position;       // Tuple of floats (x,y)
        this.connectionsbyid = connectionsbyid; // Array of integer objects
        this.connections = [];          // Arrat of Node objects
        this.id = id
        this.heuristic = 999999;        // Used to track order in the queue
        this.previous = null;           // Node object (previous connection in A*)
    }

    // Getters
    get x() {
        return this.position[0];
    }

    get y() {
        return this.position[1];
    }

    getShifted(offsetX, offsetY, scale) {
        // Accounts for offset and scale of the map image
        let newX = Math.floor((this.x * scale + offsetX));
        let newY = Math.floor((this.y * scale + offsetY));
        return [newX, newY]
    }

    calculateDistance(node) {
        return Math.sqrt((node.x - this.x) ** 2 + (node.y - this.y) ** 2)
    }

    calculateRoute() {
        // Calculates the route through all previous connections
        if (this.previous != null) {
            return (this.calculateDistance(this.previous) + this.previous.calculateRoute())
        }
        else {
            return 0
        }
    }

    // Setters
    setPrevious(node) {
        this.previous = node;
    }

    setHeuristic(value) {
        this.heuristic = value;
    }

    setConnections(nodes) {
        for (var id of this.connectionsbyid) {
            for (node of nodes) {
                if (id == node.id) {
                    this.connections.push(node);
                }
            }
        }
    }

    // Drawing functions
    drawCircle(ctx, offsetX, offsetY, scale, color) {
        const newPos = this.getShifted(offsetX, offsetY, scale)
        ctx.beginPath();
        ctx.arc(newPos[0], newPos[1], 3, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath()
    }

    drawStart(ctx, offsetX, offsetY, scale) {
        this.drawCircle(ctx, offsetX, offsetY, scale, "yellow")
    }

    drawEnd(ctx, offsetX, offsetY, scale) {
        this.drawCircle(ctx, offsetX, offsetY, scale, "red")
    }

    drawTo(ctx, offsetX, offsetY, scale, toNode, color) {
        let fromPos = this.getShifted(offsetX, offsetY, scale);
        let toPos = toNode.getShifted(offsetX, offsetY, scale);
        ctx.beginPath();
        ctx.moveTo(fromPos[0], fromPos[1]);
        ctx.lineTo(toPos[0], toPos[1]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    }

    drawRoute(ctx, offsetX, offsetY, scale) {
        // Draws the entire route
        this.drawPath(ctx, offsetX, offsetY, scale);
        this.drawEnd(ctx, offsetX, offsetY, scale);
    }

    drawPath(ctx, offsetX, offsetY, scale) {
        // Draws the route and the starting location
        if (this.previous != null) {
            // Continue working backwards through the nodes
            this.drawTo(ctx, offsetX, offsetY, scale, this.previous, "blue");
            this.previous.drawPath(ctx, offsetX, offsetY, scale);
        }
        else {
            // Reached the start of the path
            this.drawStart(ctx, offsetX, offsetY, scale);
        }
    }

    drawConnections(ctx, offsetX, offsetY, scale) {
        // Test function to show how all of the nodes are connected
        for (var item of this.connections) {
            this.drawTo(ctx, offsetX, offsetY, scale, item, "black")
        }
    }

    drawText(ctx, offsetX, offsetY, scale) {
        let newPos = this.getShifted(offsetX, offsetY, scale);
        ctx.font = "12px Arial";
        ctx.fillText(String(this.id), newPos[0], newPos[1])
    }
}

class PriorityQueue {
    constructor(start, end) {
        this.start = start;     // Starting Node
        this.end = end;         // Ending Node
        this.queue = [start];   // Array of nodes
        this.explored = [];     // Already explored nodes
    }

    get top() {
        return this.queue[0]
    }

    astar() {
        // Umm idk how to explain this atm
        if (this.top != this.end) {
            for (var item of this.top.connections) {
                if (item != this.top.previous && !this.explored.includes(item)) {
                    let dToNode = this.top.calculateDistance(item);
                    let dToEnd = item.calculateDistance(this.end);
                    if (item.heuristic > (item.calculateRoute() + dToNode + dToEnd)) {
                        item.setPrevious(this.top);
                        item.setHeuristic(dToNode + dToEnd);
                    }
                    this.addToQueue(item);
                }
            }
            this.explored.push(this.top);
            this.queue.shift();
            this.sortQueue();
            this.astar();
        }
    }

    printQueue() {
        let s = "";
        for (let i = 0; i < this.queue.length; i++) {
            s += (this.queue[i].name);
        }
        console.log(s);
    }

    sortQueue() {
        // Sorted with lower heuristic values at the top
        this.queue.sort((a, b) => a.heuristic - b.heuristic); // Updates the queue
    }

    addToQueue(node) {
        // Makes sure duplicates are not added
        if (!this.queue.includes(node)) {
            this.queue.push(node);
        }
    }
}

// ----------End of Classes---------- //

// Reads in the Nodes
let nodes = []; // Define nodes outside the function
async function fetchNodes() {
    try {
        const response = await fetch("other/building_locations.json");
        if (!response.ok) {
            throw new Error("Could not fetch resource.");
        }
        const values = await response.json();
        nodes = values.map(value => new Node(value.name, value.position, value.connections, value.id));

        return nodes;
    } catch (error) {
        console.error(error);
        return []; // or handle the error as needed
    }
}
function getNode(input) {
    // Gets the node based on name
    for (var node of nodes) {
        if (node.name == input) {
            return node;
        }
    }
    return; // Return null for unknown input
}

// Toggles connections on and off
var connectionson = false
function toggleconnections() {
    if (connectionson) {
        connectionson = false
    }
    else {
        connectionson = true
    }
    draw() // "Refreshes" the page
}

// Canvas
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match the viewport initially
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load map image
const mapImage = new Image();
mapImage.src = 'img/map3.svg';

// Initial position and scale
let offsetX = -100;
let offsetY = -500;
let scale = .5;

// For adding points to the map
points = []

var destinationstart = document.getElementById("destinationstart");
const DestStart = destinationstart.textContent;
var destinationend = document.getElementById("destinationend");
const DestEnd = destinationend.textContent;
var destinationNodeStart = null;
var destinationNodeEnd = null;
fetchNodes().then(nodes => {
    // Define starting and end node
    destinationNodeStart = getNode(DestStart);
    destinationNodeEnd = getNode(DestEnd);

    // Define connections
    for (node of nodes) {
        node.setConnections(nodes);
    }

    stack = new PriorityQueue(destinationNodeStart, destinationNodeEnd);
    stack.astar(); // Creates linked list of fastest route with head being the end node

    // Initial draw
    draw();
});

// Draw map image
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Waits to draw until nodes have been fetched from json
    if (nodes.length != 0) {
        ctx.drawImage(mapImage, offsetX, offsetY, mapImage.width * scale, mapImage.height * scale);

        // Draw all the points and connections
        for (var node of nodes) {
            
            if (connectionson) {
                node.drawCircle(ctx, offsetX, offsetY, scale, "green");
                node.drawConnections(ctx, offsetX, offsetY, scale);
                node.drawText(ctx, offsetX, offsetY, scale);
            }
            
        }

        try {
            destinationNodeStart.drawCircle(ctx, offsetX, offsetY, scale, "green")
            destinationNodeEnd.drawCircle(ctx, offsetX, offsetY, scale, "blue")

            destinationNodeEnd.drawRoute(ctx, offsetX, offsetY, scale); // Draw the path starting from the ending node
        } catch {
            console.log("Input Not Recieved")
        }
    }
    else {
        console.log("JSON loading... Try panning the page to refresh");
    }

    for (point of points) {
        var newX = Math.floor((point.position[0] * scale + offsetX));
        var newY = Math.floor((point.position[1] * scale + offsetY));
        ctx.beginPath();
        ctx.arc(newX, newY, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

    }
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

/* Uncomment when you want to add points to the map,
make sure to the id and update the starting id accordingly 

startingid = 181 // Must be +1 of last id in json

// Left click to add point
document.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var xnative = Math.floor(((event.clientX - rect.left) - offsetX)/scale); 
    var ynative = Math.floor(((event.clientY - rect.top) - offsetY)/scale);

    points.push({ name: "road", position: [xnative, ynative], connections: [], id: startingid });
    startingid = startingid + 1;
    draw();
});

// Right click to delete last point
document.addEventListener('contextmenu', function (event) {
    points.pop()
    startingid = startingid - 1;
    draw();
});

// To save points created press s
document.addEventListener('keydown', function (event) {
    if (event.key == 's') {
        console.log("Update startingid to: " + String(startingid));
        downloadJsonFile();
    };
});

// Downloads a json file that you can copy paste to end of actual json
function downloadJsonFile() {
    var jsonContent = JSON.stringify(points, null, 2);
    var blob = new Blob([jsonContent], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'road_locations.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
*/