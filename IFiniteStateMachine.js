

class IFiniteStateMachine {
  state; // string
  transitions; // {}


  constructor() {
    this.state = null;
    this.transitions = {};
  }

  changeState(newState){
    throw new Error('Subclasses must implement the changeState method.');
  }

  dispatch(actionName, ...args){
    throw new Error('Subclasses must implement the dispatch method.');
  }




}

export default IFiniteStateMachine;