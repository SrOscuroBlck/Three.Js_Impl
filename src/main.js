import MyApp from "./MyApp";
import scene from "./Scene";
import renderer from "./Renderer";
import camera from "./Camera";
import DotGraph3D from "./data-structures/DotGraph3D";
//import DotLinkedList from "./DotLinkedList";
//const model =  DotLinkedList.create(5);

const model = new DotGraph3D();
model.addNode(1, 1.2, 1, 0xffffff, 0.2);
model.addNode(2, 0.5, 1, 0xffffff, 0.2);
model.addNode(3, 0.5, 1, 0xffffff, 0.2);
model.addNode(4, 0.5, 1, 0xffffff, 0.2);
model.connectNodes(model.nodes[0], model.nodes[1], 0xffffff, 1, scene);
model.connectNodes(model.nodes[1], model.nodes[2], 0xffffff, 1, scene);
model.connectNodes(model.nodes[2], model.nodes[3], 0xffffff, 1, scene);
model.connectNodes(model.nodes[3], model.nodes[0], 0xffffff, 1, scene);


const stateMachine = new MyApp(scene, model);
stateMachine.dispatch("enter", [{ scene: scene, dataStructure3D: model }]);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
