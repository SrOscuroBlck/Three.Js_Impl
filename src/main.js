import MyApp from "./MyApp";
import scene from "./Scene";
import renderer from "./Renderer";
import camera from "./Camera";
import DotGraph3D from "./data-structures/DotGraph3D";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import RotationalController from "./controllers/RotationalController";
import StateController from "./controllers/StateController";
import TranslationalController from "./controllers/TraslationalController";
//import DotLinkedList from "./DotLinkedList";
//const model =  DotLinkedList.create(5);

const model = new DotGraph3D();

/* 
front-face
*/
model.addNode(1, 1, 1, 0xffffff, 0.2);
model.addNode(1, 2, 1, 0xffffff, 0.2);
model.addNode(2, 1, 1, 0xffffff, 0.2);
model.addNode(2, 2, 1, 0xffffff, 0.2);

/*
back-face
*/
model.addNode(1, 1, 0, 0xffffff, 0.2);
model.addNode(1, 2, 0, 0xffffff, 0.2);
model.addNode(2, 1, 0, 0xffffff, 0.2);
model.addNode(2, 2, 0, 0xffffff, 0.2);

/* front-face connections */
model.connectNodes(model.get(0), model.get(1), 0x00ff00, 0.2);
model.connectNodes(model.get(2), model.get(3), 0x00ff00, 0.2);
model.connectNodes(model.get(0), model.get(2), 0x00ff00, 0.2);
model.connectNodes(model.get(1), model.get(3), 0x00ff00, 0.2);


/*
back-face connections
*/
model.connectNodes(model.get(4), model.get(5), 0x00ff00, 0.2);
model.connectNodes(model.get(6), model.get(7), 0x00ff00, 0.2);
model.connectNodes(model.get(4), model.get(6), 0x00ff00, 0.2);
model.connectNodes(model.get(5), model.get(7), 0x00ff00, 0.2);

/*
face to face connections */
model.connectNodes(model.get(0), model.get(4), 0x00ff00, 0.2);
model.connectNodes(model.get(1), model.get(5), 0x00ff00, 0.2);
model.connectNodes(model.get(2), model.get(6), 0x00ff00, 0.2);
model.connectNodes(model.get(3), model.get(7), 0x00ff00, 0.2);

/**
 * The following algorithm is used to calculate the
 * center of the cube
 */
// Initialize variables to store the sum of coordinates
let sumX = 0;
let sumY = 0;
let sumZ = 0;

// Iterate through all the nodes
for (let i = 0; i < 8; i++) {
    const node = model.get(i);
    sumX += node.geometry.attributes.position.array[0];
    sumY += node.geometry.attributes.position.array[1];
    sumZ += node.geometry.attributes.position.array[2];
}

// Calculate the center of the cube
const centerX = sumX / 8;
const centerY = sumY / 8;
const centerZ = sumZ / 8;

// Create a node at the center of the cube
model.addNode(centerX, centerY, centerZ, 0x00ff00, 0.2);

const stateMachine = new MyApp(scene, model);

const mainController = new StateController(stateMachine, model.get(8));
const rotationalController = new RotationalController(
  stateMachine,
  model.get(8)
);
const translationalController = new TranslationalController(stateMachine, model.get(8));


stateMachine.dispatch("enter", [{ scene: scene, dataStructure3D: model }]);
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 5, 1 );
controls.update();


function animate() {
  requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
}

animate();
