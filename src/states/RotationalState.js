import RotationalController from "../controllers/RotationalController";
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

  enter({  dataStructure3D }) {
    this.dataStructure3D = dataStructure3D;
  }

  handleInput({ input }) {}
  /**
   * This method rotates the entire structure around a given axis.
   * If no axis is given, the method will use the middle point of the structure.
   * @param {any} axisNode - The axis node to rotate around.
   * @param {number} amount of rotation
   * @param {string} direction of rotation
   * To do modification for the graph3d structure
   */
  rotateEntireStructure({ axisNode, angle, direction }) {
    if (!axisNode) {
      throw new Error("You must provide an axisNode for rotation.");
    }
    
    axisNode.axis.normalize();
  
    const radians = direction === "clockwise" ? angle : -angle;
  
    const quaternion = new THREE.Quaternion();
    
    quaternion.setFromAxisAngle(axisNode.axis, radians);

    this.dataStructure3D.forEachNode((node) => {
      node.points.geometry.applyQuaternion(quaternion);
    });
  
    this.dataStructure3D.forEachEdge((edge) => {
      const position1 = edge.node1.geometry.attributes.position.array;
      const position2 = edge.node2.geometry.attributes.position.array;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute([...position1, ...position2], 3));
      edge.edge.geometry.dispose();
      edge.edge.geometry = geometry;
      edge.edge.geometry.attributes.position.needsUpdate = true;
    });
  }
}
export default RotationalState;
