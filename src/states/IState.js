
class IState {

  /**
   * This methods is intended to  set the graphics, often
   * only sets the structure that we want to render
   * and adds it to the scene.
   * @param {Scene} scene 
   */
    enter({scene, dataStructure3D}) {
      throw new Error('Subclasses must implement the enter method.');
    }
    
    /**
     * 
     * @param {string} input 
     */
    handleInput({input}) {
      throw new Error('Subclasses must implement the handleInput method.');
    }

    update() {
      throw new Error('Subclasses must implement the update method.');
    }
  }

  export default IState;