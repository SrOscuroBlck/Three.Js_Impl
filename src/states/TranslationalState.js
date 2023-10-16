import IState from "./IState";
import * as THREE from "three";
class TranslationalState extends IState {
  dataStructure3D;

  constructor() {
    super();
  }

  
  enter({ scene, dataStructure3D }) {
    this.dataStructure3D = dataStructure3D;
    this.dataStructure3D.render(scene);
  }


  /**
   * This method generate the translation of the entire structure.
   * By sum the diferential in the position of the nodes, iterating
   * trough the nodes and edges and updating their position.
   * @param {number} deltaX - The amount of translation in the x axis.
   * @param {number} deltaY - The amount of translation in the y axis.
   * @param {number} deltaZ - The amount of translation in the z axis.
   */
  translateStructure({ deltaX, deltaY, deltaZ }) {
    this.dataStructure3D.forEachNode((node) => {
      const position = node.points.geometry.attributes.position;

      for (let i = 0; i < position.count; i++) {
        position.setX(i, position.getX(i) + deltaX);
        position.setY(i, position.getY(i) + deltaY);
        position.setZ(i, position.getZ(i) + deltaZ);
      }

      position.needsUpdate = true;
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

export default TranslationalState;
