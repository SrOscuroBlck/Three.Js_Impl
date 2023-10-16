/**
 * This class is the main controller of the application
 * it handles the key press and change the state of the main application.
 * @constructor @param {MyApp}  myAppInstance - The instance of the application.  
 * @constructor @param {Node}  axisNode - The axisNode of the structure.
 * @method handleKeyPress - The method that handles the key press event.
 * 
 */
class StateController {
  myApp;
  axisNode;

    constructor(myAppInstance, axisNode) {
      this.myApp = myAppInstance;
      this.axisNode = axisNode;
      document.addEventListener('keyup', this.handleKeyPress);
    }
  
    /**
     * This method handles the key press event to change the state of the application.
     * you could be in any state of the application to use it, it may cause conflict if 
     * you add another controller that uses the same keys.
     * It is a lambda function because we need to bind it to the context.
     * The R/r key changes the state to ROTATIONAL and set the color of the axisNode to red.
     * The S/s key changes the state to STATIC and set the color of the axisNode to white.
     * The T/t key changes the state to TRANSLATIONAL and set the color of the axisNode to blue.
     * @param {KeyboardEvent} event 
     */
    handleKeyPress = (event) => {

      if (event.key === 'R' || event.key === 'r') {

        this.myApp.changeState('ROTATIONAL');
        this.axisNode.setColor(0xff0000);
      }

      else if(event.key === 'S' || event.key === 's') {

        this.myApp.changeState('STATIC');
        this.axisNode.setColor(0xffffff);
      }

      else if(event.key === 'T' || event.key === 't') {
        this.myApp.changeState('TRANSLATIONAL');
        this.axisNode.setColor(0x0000ff);
      }
    }
  }

export default StateController;