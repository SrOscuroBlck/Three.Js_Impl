import StaticState from "./states/StaticState";
import IFiniteStateMachine from "../IFiniteStateMachine";
import RotationalState from "./states/RotationalState";

/**
 * This class represents the main application.
 * It implements the pseudo interface IFiniteStateMachine with
 * four states: INITIAL, ROTATIONAL, TRANSLATIONAL, FLEX.
 * @constructor @param {Scene} scene - The three.js scene where the application will be rendered.
 */
class MyApp extends IFiniteStateMachine {

  constructor(scene) {
    super();
    this.state = "INITIAL";
    this.transitions = {
      INITIAL: new StaticState(),
      ROTATIONAL: new RotationalState(),
      TRANSLATIONAL: null,
      FLEX: null,
    };
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
    console.log(`State changed to: ${this.state}`)
  }
}

export default MyApp;
