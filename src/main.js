import MyApp from "./MyApp";
import scene from "./Scene";
import renderer from "./Renderer";
import camera from "./Camera";
import DotGraph3D from "./data-structures/DotGraph3D";

import RotationalController from "./controllers/RotationalController";
import StateController from "./controllers/StateController";
//import DotLinkedList from "./DotLinkedList";
//const model =  DotLinkedList.create(5);

const model = new DotGraph3D();
model.addNode(1, 1.2, 1, 0xffffff, 0.2);
model.addNode(2, 0.5, 1, 0xffffff, 0.2);
model.addNode(3, 0.5, 1, 0xffffff, 0.2);
model.addNode(4, 0.5, 1, 0xffffff, 0.2);
model.connectNodes(model.get(0), model.get(1), 0xffffff, 1, scene);
model.connectNodes(model.get(1), model.get(2), 0xffffff, 1, scene);
model.connectNodes(model.get(2), model.get(3), 0xffffff, 1, scene);
model.connectNodes(model.get(3), model.get(0), 0xffffff, 1, scene);


const stateMachine = new MyApp(scene, model);
const mainController = new StateController(stateMachine, model.get(3));
const rotationalController = new RotationalController(stateMachine, model.get(3));
stateMachine.dispatch("enter", [{ scene: scene, dataStructure3D: model }]);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
