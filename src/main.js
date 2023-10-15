import MyApp from "./MyApp";

import scene from "./Scene";
import renderer from "./Renderer";
import camera from "./Camera";

const stateMachine = new MyApp(scene);
stateMachine.dispatch("enter", [{ scene }]);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
