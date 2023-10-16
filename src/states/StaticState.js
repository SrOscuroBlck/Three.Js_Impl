import IState from "./IState";



/**
 * This class is a instanciable state that represents the static state implementing
 * the pseudo interface IState.
 * The constructor takes no arguments.
 */
class StaticState extends IState {
    dataStructure3D;
    constructor() {
      super();
    }
  
    enter({scene, dataStructure3D}) {
      this.dataStructure3D = dataStructure3D;
      this.dataStructure3D.render(scene);
    }
    handleInput({input}) {
      // No input handling needed in this state
    }
    update() {
      // No updates needed in this state
    }
  }

export default StaticState;