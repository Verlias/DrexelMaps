// Node class
class Node {
    constructor(name, position, connections) {
        this.name = name;               // String (e.g. "Korman Center 111")
        this.position = position;       // Tuple of floats (x,y)
        this.connections = connections; // Array of Node objects
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
        this.connections = nodes;
    }

    // Drawing functions
    drawCircle(ctx, offsetX, offsetY, scale, color) {
        const newPos = this.getShifted(offsetX, offsetY, scale)
        ctx.beginPath();
        ctx.arc(newPos[0], newPos[1], 5, 0, 2 * Math.PI);
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
        ctx.closePath()
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

// Canvas
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match the viewport initially
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load map image
const mapImage = new Image();
mapImage.src = 'img/map3.svg'; // Path to your map image

// Initial position and scale
let offsetX = -100;
let offsetY = -500;
let scale = .5;

// List of Test Nodes
a = new Node("A", [1506, 1324], [])
b = new Node("B", [1679, 1310], []);
c = new Node("C", [1474, 1400], []);
d = new Node("D", [1681, 1385], []);
e = new Node("E", [1495, 1475], []);
f = new Node("F", [1466, 1523], []);
g = new Node("G", [1364, 1596], []);
h = new Node("H", [1593, 1598], []);
i = new Node("I", [1717, 1611], []);
j = new Node("J", [1821, 1556], []);
k = new Node("K", [1451, 1652], []);
l = new Node("L", [1583, 1652], []);
m = new Node("M", [1708, 1725], []);
n = new Node("N", [1779, 1669], []);
o = new Node("O", [1830, 1669], []);
p = new Node("P", [622, 1774], []);
q = new Node("Q", [1080, 1824], []);
r = new Node("R", [1311, 1830], []);
s = new Node("S", [1625, 1876], []);
t = new Node("T", [1884, 1853], []);
u = new Node("U", [495, 1863], []);
v = new Node("V", [1046, 1949], []);
w = new Node("W", [1307, 1987], []);
x = new Node("X", [1441, 1995], []);
y = new Node("Y", [1673, 2070], []);
z = new Node("Z", [1725, 1951], []);
aa = new Node("AA", [1865, 2066], []);
ab = new Node("AB", [1394, 2154], []);
ac = new Node("AC", [1463, 2158], []);
ad = new Node("AD", [1541, 2170], []);
ae = new Node("AE", [1735, 2180], []);
af = new Node("AF", [1967, 2225], []);
ag = new Node("AG", [2049, 2252], []);
ah = new Node("AH", [2147, 2244], []);
ai = new Node("AI", [2151, 2313], []);
aj = new Node("AJ", [1549, 2315], []);
ak = new Node("AK", [1641, 2321], []);
al = new Node("AL", [1831, 2397], []);
am = new Node("AM", [1637, 2443], []);
an = new Node("AN", [1623, 2486], []);
ao = new Node("AO", [1692, 2523], []);
ap = new Node("AP", [1794, 2505], []);
aq = new Node("AQ", [1857, 2494], []);

const nodes = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, r]; // All of the nodes
// o, p, q, r, s, t, u, v, w, x, y, z, aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an, ao, ap, aq]

// Sample connections
a.setConnections([b, c, d]);
b.setConnections([a, c, d]);
c.setConnections([a, b, d, e]);
d.setConnections([a, b, c, j]);
e.setConnections([f, c, j]);
f.setConnections([e, g, h]);
g.setConnections([f, k]);
h.setConnections([f, i, k, l]);
i.setConnections([h, j, m, n]);
j.setConnections([d, e]);
k.setConnections([g, h, l, r]);
l.setConnections([h, k, m]);
m.setConnections([i, l, n]);
n.setConnections([i, m]);

r.setConnections([k]);

function fillinput1(button) {
    var inputbox = document.getElementById('startdestination');
    var autofillValue = button.innerText;
    inputbox.value = autofillValue;
}

function fillinput2(button) {
    var inputbox = document.getElementById('enddestination');
    var autofillValue = button.innerText;
    inputbox.value = autofillValue;
}

function getDestinationNodeStart(input) {
    // Map lowercase input to the corresponding node
    switch (input) {
        case 'Disque Hall 108':
            return a;
        case 'Randell Hall 120':
            return b;
        case 'Lebow Engineering Center 134':
            return c;
        case 'Korman Center 111':
            return d;
        // Add more cases for other nodes if needed
        default:
            return; // Return null for unknown input
    }
}

function getDestinationNodeEnd(input) {
    // Map lowercase input to the corresponding node
    switch (input) {
        case 'Disque Hall 108':
            return a;
        case 'Randell Hall 120':
            return b;
        case 'Lebow Engineering Center 134':
            return c;
        case 'Korman Center 111':
            return d;
        // Add more cases for other nodes if needed
        default:
            return; // Return null for unknown input
    }
}

function validateinput(input) {
    // Validation will check if the class is in the database
    if (["Disque Hall 108", "Randell Hall 120", "Lebow Engineering Center 134", "Korman Center 111",].includes(input)) {
        document.getElementById("msg").innerHTML = "Input Recieved!"
        return true
    }
    else {
        document.getElementById("msg").innerHTML = "Please Input a Valid Location"
        return false
    }
}





var destinationstart = document.getElementById("destinationstart");
var DestStart = destinationstart.textContent;
var destinationend = document.getElementById("destinationend");
var DestEnd = destinationend.textContent;
const destinationNodeStart = getDestinationNodeStart(DestStart);
const destinationNodeEnd = getDestinationNodeEnd(DestEnd);
stack = new PriorityQueue(destinationNodeStart, r);
stack.astar();

// Draw map image
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mapImage, offsetX, offsetY, mapImage.width * scale, mapImage.height * scale);

    // Draw all the points and connections
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].drawCircle(ctx, offsetX, offsetY, scale, "green");
        nodes[i].drawConnections(ctx, offsetX, offsetY, scale);
    }

    r.drawRoute(ctx, offsetX, offsetY, scale); // Draw the path starting from the ending node
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
