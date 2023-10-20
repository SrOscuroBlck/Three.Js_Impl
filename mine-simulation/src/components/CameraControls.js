import * as THREE from '../../node_modules/three/build/three.module.js';

export default class CameraControls {
    constructor(viewWidth, viewHeight) {
        this.camera = new THREE.PerspectiveCamera(75, viewWidth / viewHeight, 0.1, 1000);
        this.camera.position.z = 50;
    }

    getCamera() {
        return this.camera;
    }
}