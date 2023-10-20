export default class Box {
    constructor(x, y, z, d) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.d = d; // half the side length of the cube.
    }

    contains(node) {
        // Check if a node is within this box.
        return (node.x >= this.x - this.d && 
                node.x < this.x + this.d && 
                node.y >= this.y - this.d && 
                node.y < this.y + this.d && 
                node.z >= this.z - this.d && 
                node.z < this.z + this.d);
    }
}
