import { OrbitControls as THREEOrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';

export default class OrbitControls {
    constructor(camera, domElement) {
        this.controls = new THREEOrbitControls(camera, domElement);
    }

    getControls() {
        return this.controls;
    }
}
