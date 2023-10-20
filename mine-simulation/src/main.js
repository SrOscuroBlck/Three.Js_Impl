import * as THREE from '../node_modules/three/build/three.module.js';
import Box from './core/Box.js';
import Node from './core/Node.js';
import Octree from './core/Octree.js';
import { generateMinePoints } from './helpers/LidarSimulator.js';
import { PointerLockControls } from '../node_modules/three/examples/jsm/controls/PointerLockControls.js';
import { ConvexGeometry } from '../node_modules/three/examples/jsm/geometries/ConvexGeometry.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Set a brighter background color
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.setAttribute('tabindex', '0');
document.body.appendChild(renderer.domElement);

const controls = new PointerLockControls(camera, document.body);
renderer.domElement.addEventListener('click', () => {
    controls.lock();
});

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 0, 20);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x606060); // Slightly brighter ambient light
scene.add(ambientLight);

// Variables to store the state of keys
const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false
};

document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'KeyW':
            keys.forward = true;
            break;
        case 'KeyS':
            keys.backward = true;
            break;
        case 'KeyA':
            keys.right = true;
            break;
        case 'KeyD':
            keys.left = true;
            break;
        case 'KeyR':
            keys.up = true;
            break;
        case 'KeyF':
            keys.down = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'KeyW':
            keys.forward = false;
            break;
        case 'KeyS':
            keys.backward = false;
            break;
        case 'KeyA':
            keys.right = false;
            break;
        case 'KeyD':
            keys.left = false;
            break;
        case 'KeyR':
            keys.up = false;
            break;
        case 'KeyF':
            keys.down = false;
            break;
    }
});

const rootBox = new Box(0, 0, 0, 50);
const rootOctree = new Octree(rootBox, 4);
const lidarPoints = generateMinePoints(20000);

const vertices = [];

lidarPoints.forEach(point => {
    const node = new Node(point.x, point.y, point.z);
    rootOctree.insert(node);

    const geometry = new THREE.SphereGeometry(0.05, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x3498db }); // Use a different color for the spheres
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(node.x, node.y, node.z);
    scene.add(sphere);

    vertices.push(node.x, node.y, node.z);
});


// Create a 3D object based on the points generated


// // Create lines connecting the points
// const bufferGeometry = new THREE.BufferGeometry();
// bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
// const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3498db }); // Use the same color for the lines
// const lines = new THREE.LineSegments(bufferGeometry, lineMaterial);
// scene.add(lines);

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

function animate() {
    if (controls.isLocked) {
        const speed = 0.5;

        const dir = new THREE.Vector3();
        controls.getDirection(dir);

        if (keys.forward) {
            camera.position.addScaledVector(dir, speed);
        }
        if (keys.backward) {
            camera.position.addScaledVector(dir, -speed);
        }
        if (keys.left) {
            camera.position.addScaledVector(new THREE.Vector3(-dir.z, 0, dir.x).normalize(), speed);
        }
        if (keys.right) {
            camera.position.addScaledVector(new THREE.Vector3(dir.z, 0, -dir.x).normalize(), speed);
        }
        if (keys.up) {
            camera.position.y += speed;
        }
        if (keys.down) {
            camera.position.y -= speed;
        }
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
