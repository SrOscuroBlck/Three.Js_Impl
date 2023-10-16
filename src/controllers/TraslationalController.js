/**
 * This class represents the controller for the translational state.
 * Has only one constructor that receives the instance of the application
 * and the axisNode, and add an event listener to the keyup event.
 * @constructor @param {MyApp}  myAppInstance - The instance of the application.
 * @constructor @param {Node}  axisNode - The axisNode of the structure.
 * @method handleKeyPress - The method that handles the key press event.
 * 
 */
class TranslationalController {
    myApp;
    axisNode;
    constructor(myAppInstance, axisNode) {
      this.myApp = myAppInstance;
      this.axisNode = axisNode;
      document.addEventListener('keyup', this.handleKeyPress);
    }
  
    /**
     * This method is responsible for handleInput of the translational
     * state, it is a lambda function because we need to bind it to the context.
     * It checks for the state and key press and if it is a valid key press (keyboard arrows) for
     * the current state , it dispatch
     * the action to the application.
     * @param {KeyboardEvent} event 
     * @returns void
     */
    handleKeyPress = (event) => {
    if(this.myApp.currentState() !== 'TRANSLATIONAL') return;

      if (event.key === 'ArrowRight') {
        this.myApp.dispatch("translateStructure", [{ deltaX: 1, deltaY: 0, deltaZ: 0 }]);
      }
  
      if (event.key === 'ArrowLeft') {
        this.myApp.dispatch("translateStructure", [{ deltaX: -1, deltaY: 0, deltaZ: 0 }]);
      }
  
      if (event.key === 'ArrowUp') {
        this.myApp.dispatch("translateStructure", [{ deltaX: 0, deltaY: 1, deltaZ: 0 }]);
      }
  
      if (event.key === 'ArrowDown') {
        this.myApp.dispatch("translateStructure", [{ deltaX: 0, deltaY: -1, deltaZ: 0 }]);
      }
    }
  }
  
  export default TranslationalController;
  