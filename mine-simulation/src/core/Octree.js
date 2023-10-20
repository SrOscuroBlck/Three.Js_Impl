import Box from './Box.js';
import Node from './Node.js';

export default class Octree {
    constructor(bounds, capacity) {
        this.bounds = bounds;
        this.capacity = capacity;
        this.nodes = [];
        this.divided = false;
        this.octants = [];
    }

    insert(node) {
        if (!this.bounds.contains(node)) {
            return false;
        }

        if (this.nodes.length < this.capacity) {
            this.nodes.push(node);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        for (let octant of this.octants) {
            if (octant.insert(node)) {
                return true;
            }
        }

        return false;
    }

    subdivide() {
        let x = this.bounds.x;
        let y = this.bounds.y;
        let z = this.bounds.z;
        let d = this.bounds.d / 2;

        let octant1 = new Octree(new Box(x - d, y - d, z - d, d), this.capacity);
        let octant2 = new Octree(new Box(x + d, y - d, z - d, d), this.capacity);
        let octant3 = new Octree(new Box(x - d, y + d, z - d, d), this.capacity);
        let octant4 = new Octree(new Box(x + d, y + d, z - d, d), this.capacity);
        let octant5 = new Octree(new Box(x - d, y - d, z + d, d), this.capacity);
        let octant6 = new Octree(new Box(x + d, y - d, z + d, d), this.capacity);
        let octant7 = new Octree(new Box(x - d, y + d, z + d, d), this.capacity);
        let octant8 = new Octree(new Box(x + d, y + d, z + d, d), this.capacity);

        this.octants.push(octant1);
        this.octants.push(octant2);
        this.octants.push(octant3);
        this.octants.push(octant4);
        this.octants.push(octant5);
        this.octants.push(octant6);
        this.octants.push(octant7);
        this.octants.push(octant8);

        this.divided = true;
    }
}
