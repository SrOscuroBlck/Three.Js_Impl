
/**
 * @interface
 * Defines the interface for a finite state machine.
 * Do not instantiate this class directly.
 */
class IFiniteStateMachine {
  state; // string
  transitions; // {}


  constructor() {
    this.state = null;
    this.transitions = {};
  }

  /**
   * This method change the current state of the finite state machine.
   * @param {string} newState a string A-Z that represents the new state, it needs to
   * exist in the machine previously.
   */
  changeState(newState){
    throw new Error('Subclasses must implement the changeState method.');
  }

  /**
   * This method dispatch between the actions of the current state
   * and execute the action with the given args.
   * @param {string} actionName 
   * @param  {...any} args 
   */
  dispatch(actionName, ...args){
    throw new Error('Subclasses must implement the dispatch method.');
  }




}

export default IFiniteStateMachine;