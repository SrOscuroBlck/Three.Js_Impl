
import * as THREE from '../../node_modules/three/build/three.module.js';

export default class LidarSimulator {
    constructor(min, max, pointCount) {
        this.min = min;        // Minimum coordinate value
        this.max = max;        // Maximum coordinate value
        this.pointCount = pointCount;  // Number of points to generate
    }

    generatePoints() {
        let points = [];

        for (let i = 0; i < this.pointCount; i++) {
            let x = this.randomCoordinate(this.min, this.max);
            let y = this.randomCoordinate(this.min, this.max);
            let z = this.randomCoordinate(this.min, this.max);
            points.push({x, y, z});
        }

        return points;
    }

    randomCoordinate(min, max) {
        return Math.random() * (max - min) + min;
    }
}


export function generateMinePoints(numPoints) {
    const points = [];
    const TUNNEL_RADIUS = 1.5; // Adjust this value to control the thickness of the tunnel wall

    for (let i = 0; i < numPoints; i++) {
        let point;
        
        // 70% chance to generate a point in a tunnel, 30% in a chamber.
        if (Math.random() < 0.7) {
            // Simulating a tunnel running along the z-axis
            do {
                point = new THREE.Vector3(
                    Math.random() * 4 - 2, // Random offset from the center for x-axis
                    Math.random() * 4 - 2, // Random offset from the center for y-axis
                    Math.random() * 50 - 25  // Length of the tunnel along z-axis
                );
            } while (point.x * point.x + point.y * point.y < TUNNEL_RADIUS * TUNNEL_RADIUS); // Check if point is inside the tunnel's interior
        } else {
            // Simulating a chamber: spherical region at a specific point in the tunnel
            const chamberCenter = new THREE.Vector3(0, 0, Math.random() * 30 - 15);
            const r = 5;  // radius of the chamber
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            point = chamberCenter.clone().add(new THREE.Vector3(x, y, z));
        }

        points.push(point);
    }
    console.log("Finished generating points.")
    return points;
}