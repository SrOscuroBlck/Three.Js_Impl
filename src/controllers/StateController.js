class StateController {
  myApp;
  axisNode;

    constructor(myAppInstance, axisNode) {
      this.myApp = myAppInstance;
      this.axisNode = axisNode;
      document.addEventListener('keyup', this.handleKeyPress);
    }
  
    handleKeyPress = (event) => {
      // Check for "R" or "r" key press
      if (event.key === 'R' || event.key === 'r') {

        this.myApp.changeState('ROTATIONAL');
        this.axisNode.setColor(0xff0000);
      }
      // Check for "S" or "s" key press
      else if(event.key === 'S' || event.key === 's') {

        this.myApp.changeState('STATIC');
        this.axisNode.setColor(0xffffff);
      }
    }
  }

export default StateController;