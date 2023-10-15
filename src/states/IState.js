class IState {
    enter({scene}) {
      throw new Error('Subclasses must implement the enter method.');
    }
  
    update() {
      throw new Error('Subclasses must implement the update method.');
    }
  }

  export default IState;