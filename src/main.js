import MyApp from "./MyApp";
import scene from "./Scene";
import renderer from "./Renderer";
import camera from "./Camera";
import DotLinkedList from "./DotLinkedList";

const model =  DotLinkedList.create(5);

const stateMachine = new MyApp(scene, model);

stateMachine.dispatch("enter", [{ scene, dataStructure3D: model }]);
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      stateMachine.changeState("ROTATIONAL");
      stateMachine.dispatch("enter", [{ scene, dataStructure3D: model }])
      break;
    case "ArrowRight":
      const angleInRadians = Math.PI / 8; 
      const direction = "clockwise"; 
      stateMachine.dispatch("rotateEntireStructure", [{ angle: angleInRadians, amount: 0.01, direction }]);
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
