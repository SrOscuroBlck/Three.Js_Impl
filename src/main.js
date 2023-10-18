import Octree from "./data-structures/Octree";
import * as THREE from "three";
import scene from "./Scene";
import renderer from "./Renderer";
import camera from "./Camera";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create an octree
const octree = new Octree();

// Create the orbit controls instance
const controls = new OrbitControls(camera, renderer.domElement);

// Set the camera position
camera.position.set(1, 5, 100);

// Add some objects to the octree
const objects = [];
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color

for (let i = 0; i < 100; i++) {
  const geometry = new THREE.BoxGeometry(1, 1, 1); 
  const object = new THREE.Mesh(geometry, material); 
  object.position.set(Math.random() * 100, Math.random() * 100, Math.random() * 100);

  // Ensure that the object has a boundingSphere and boundingBox
  object.geometry.computeBoundingSphere();
  object.geometry.computeBoundingBox(); 

  const customObject = {
    mesh: object,
    boundingSphere: object.geometry.boundingSphere.clone(),
    boundingBox: object.geometry.boundingBox.clone(),
  };

  objects.push(customObject);


  octree.add(customObject);
}


function animate() {

  controls.update();


  const frustum = new THREE.Frustum();
  frustum.setFromProjectionMatrix(camera.projectionMatrix.clone().multiply(camera.matrixWorldInverse));

  // Use the octree to quickly determine which objects intersect the frustum
  const visibleObjects = octree.frustumCast(frustum);

  // Clear the scene
  scene.children.length = 0;

  // Render the visible objects
  for (let i = 0; i < visibleObjects.length; i++) {
    const object = visibleObjects[i];
    scene.add(object.mesh);
  }

  // Render the scene
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
