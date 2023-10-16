
/**
 * RotationalController class
 * This class represents the controller for the rotational state.
 * Has only one constructor and one method that handles the key press event.
 * @constructor @param {MyApp}  myAppInstance - The instance of the application.
 * @constructor @param {Node}  axisNode - The axisNode of the structure.
 * @method handleKeyPress - The method that handles the key press event.
 */
class RotationalController {


  myApp;
  axisNode;

    constructor(myAppInstance, axisNode) {
      this.myApp = myAppInstance;
      this.axisNode = axisNode;
      document.addEventListener('keyup', this.handleKeyPress);
    }
  
    /**
     * This method handle the key press event for the rotational state.
     * It checks for the state and key press and if it is a valid key press for
     * the current state , it dispatch
     * the action to the application.
     * It is a lambda function because we need to bind it to the context.
     * @param {KeyboardEvent} event 
     * @returns 
     */
    handleKeyPress = (event) => {

      if(this.myApp.currentState() !== 'ROTATIONAL') return;

      if (event.key === 'ArrowLeft') {
        this.myApp.dispatch("rotateEntireStructure", [{ axisNode: this.axisNode, direction: 'counterclockwise', angle: Math.PI / 6 }]);
      }
  

      else if (event.key === 'ArrowRight') {
        this.myApp.dispatch("rotateEntireStructure", [{ axisNode: this.axisNode, direction: 'clockwise', angle: Math.PI / 6 }]);
      }

    }
  }
export default RotationalController;