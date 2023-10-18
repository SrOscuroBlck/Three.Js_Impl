import * as THREE from "three";
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
camera.position.z = 60;
camera.far = 1000;
camera.updateProjectionMatrix();
export default camera;
