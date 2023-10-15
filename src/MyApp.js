import StaticListState from "./states/StaticListState";
import IFiniteStateMachine from "../IFiniteStateMachine";

class MyApp extends IFiniteStateMachine {
  
  constructor(scene) {
    super();
    this.state = "STATICLIST";
    this.transitions = {
      STATICLIST: new StaticListState(scene),
      STATICGRAPH: null,
    };
  }

  addTransition(name, transitionFunction) {
    this.transitions[name] = transitionFunction;
  }

  dispatch(actionName, ...args) {
    const actions = this.transitions[this.state];

    const action = actions[actionName]; 

    if (action) {
      action.apply(this, ...args);
    } else {
      throw new Error(`Invalid action: ${actionName} for state: ${this.state}`);
    }
  }

  changeState(newState) {
    this.state = newState;
  }
}

export default MyApp;
