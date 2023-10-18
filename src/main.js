import Octree from "./data-structures/Octree";
import * as THREE from "three";
import scene from "./Scene";
import renderer from "./Renderer";
import camera from "./Camera";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import DotGraph3D from "./data-structures/DotGraph3D";
import Automata from "./Automata";
import StateController from "./controllers/StateController";  
import RotationalController from "./controllers/RotationalController";
import TranslationalController from "./controllers/TranslationalController";
import {createCubeAndConnectFaces, calculateCenter }from "./utils/createCube";
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set( 0, 5, 10 );
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);


// Create an octree
const octree = new Octree();
// Create your graph and add objects to the octree
const graph = new DotGraph3D();
createCubeAndConnectFaces(graph);
const cubeCenter = calculateCenter();
graph.add(cubeCenter.x,cubeCenter.y,cubeCenter.z,0x00ff00,0.2);
const axisNode = graph.get(24); //get the center of the cube
const automata = new Automata();
const stateController = new StateController(automata,axisNode);
const rotationalController = new RotationalController(automata,axisNode);
const translationalController = new TranslationalController(automata,axisNode);
automata.dispatch('enter', [{ octree : octree , dataStructure3D: graph }]);

function animate() {
  controls.update();
  camera.updateMatrixWorld();
  camera.updateProjectionMatrix();
  cameraHelper.update();
  const frustum = new THREE.Frustum();
  frustum.setFromProjectionMatrix(
    camera.projectionMatrix.clone().multiply(camera.matrixWorldInverse)
  );

  // Use the octree to quickly determine which objects intersect the frustum
  const visibleObjects = octree.frustumCast(frustum);

  // Clear the scene
 // scene.children.length = 0;

  // Render the visible objects
  for (let i = 0; i < visibleObjects.length; i++) {
    let object;
    if (visibleObjects[i].points) {
      object = visibleObjects[i].points;
    } else if (visibleObjects[i].edge) {
      object = visibleObjects[i].edge;
    }
    scene.add(object);
  }
 
  // Render the scene
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
