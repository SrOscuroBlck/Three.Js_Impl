import IState from "./IState";
import * as THREE from "three";


/**
 * This class is a instanciable state that represents the rotational state implementing
 * the pseudo interface IState.
 * The constructor takes no arguments.
 * 
 */
class RotationalState extends IState {
  dataStructure3D;

  constructor() {
    super();
  }

  enter({ scene, dataStructure3D }) {
    this.dataStructure3D = dataStructure3D;
    this.dataStructure3D.render(scene);
  }

  handleInput({ input }) {




  }
  /**
   * This method rotates the entire structure around a given axis.
   * If no axis is given, the method will use the middle point of the structure.
   * @param {any} axisNode - The axis node to rotate around.
   * @param {number} amount of rotation
   * @param {string} direction of rotation
   * To do modification for the graph3d structure
   */
  rotateEntireStructure({ axisNode = null, angle, amount, direction }) {
    let axis;

    if (axisNode === null) {
      const length = this.dataStructure3D.length();
      const axisPosition = Math.round(length / 2);
      axis = this.dataStructure3D.get(axisPosition);
    } else {
      axis = axisNode;
    }

    axis.axis.normalize();

    const radians = direction === "clockwise" ? angle : -angle;

    const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(axis.axis, radians);

    while (this.dataStructure3D.next() !== null) {
      const currentDot = this.dataStructure3D.current();
      console.log("Before Rotation:");
      console.log(currentDot.points.geometry);

      // Apply the rotation
      currentDot.points.geometry.applyQuaternion(quaternion);

      console.log("After Rotation:");
      console.log(currentDot.points.geometry);
    }

    // Log the final axis
    console.log("Final Axis:");
    console.log(axis.axis);
  }
}
export default RotationalState;
