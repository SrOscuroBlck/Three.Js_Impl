import IState from "./IState";

class StaticState extends IState {
    dataStructure3D;
    constructor() {
      super();
    }
  
    enter({scene, dataStructure3D}) {
      this.dataStructure3D = dataStructure3D;
      this.dataStructure3D.render(scene);
    }
  
    update() {
      // No updates needed in this state
    }
  }

export default StaticState;