class RotationalController {
  myApp;
  axisNode;
    constructor(myAppInstance, axisNode) {
      this.myApp = myAppInstance;
      this.axisNode = axisNode;
      document.addEventListener('keyup', this.handleKeyPress);
    }
  
    handleKeyPress = (event) => {
      // Check for "Left" key press to rotate counterclockwise
      if (event.key === 'ArrowLeft') {
        this.myApp.dispatch("rotateEntireStructure", [{ axisNode: this.axisNode, direction: 'counterclockwise', angle: Math.PI / 4 }]);
      }
  
      // Check for "Right" key press to rotate clockwise
      if (event.key === 'ArrowRight') {
        this.myApp.dispatch("rotateEntireStructure", [{ axisNode: this.axisNode, direction: 'clockwise', angle: Math.PI / 4 }]);
      }
    }
  }
export default RotationalController;