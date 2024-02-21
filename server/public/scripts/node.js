class Node {
    constructor(name, position) {
        this.name = name;               // String (e.g. "Korman Center 111")
        this.position = position;       // Tuple of floats (x,y)
        //this.connections = connections; // Array of Node objects
        this.heuristic = 9999;          // Used to track order in the queue
        this.previous = null;           // Node object (previous connection in A*)
    }

    drawCircle(canvasContext) {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, 15, 0, Math.PI * 2);
        canvasContext.fillStyle = 'blue'; // You can set any color you want
        canvasContext.fill();
        canvasContext.closePath();
    }
}