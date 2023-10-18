import * as THREE from "three";
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1, 45);
camera.position.z = 60;
camera.far = 750;
camera.updateProjectionMatrix();
export default camera;
