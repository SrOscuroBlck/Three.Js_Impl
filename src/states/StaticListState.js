import IState from "./IState";
import DotLinkedList from "../DotLinkedList";
import Dot from "../shapes/Dot";


class StaticListState extends IState {
    constructor() {
      super();
    }
  
    enter({scene}) {
      console.log('Entering StaticListState');
      this.linkedList = new DotLinkedList();
      const numDots = 5;
  
      for (let i = 0; i < numDots; i++) {
        const dot = new Dot(0xff0000, 0.1);
        dot.setPosition(i, 0, 0);
        this.linkedList.append(dot);
      }
  
      this.linkedList.render(scene); // Pass the scene as a parameter
    }
  
    update() {
      // No updates needed in this state
    }
  }

export default StaticListState;