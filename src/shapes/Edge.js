import * as THREE from "three";

/**
 * This class represents an edge between two nodes.
 * @constructor @param {Node} node1 - The first node.
 * @constructor @param {Node} node2 - The second node.
 * @constructor @param {number} lineColor - The color of the line in hex format.
 * @constructor @param {number} lineWidth - The width of the line could be an integer or a double.
 * @property {Line} edge - The edge object that needs to be added to the scene later.
 */
class Edge {
  edge;
  node1;
  node2;
  boundingSphere;
  boundingBox;
  constructor(node1, node2, lineColor, lineWidth) {
    this.node1 = node1;
    this.node2 = node2;
  
    const position1 = node1.geometry.attributes.position.array;
    const position2 = node2.geometry.attributes.position.array;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',
      new THREE.Float32BufferAttribute([...position1, ...position2], 3));
    this.edge = new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: lineColor,
      linewidth: lineWidth,
    }));
    this.edge.geometry.computeBoundingSphere();
    this.edge.geometry.computeBoundingBox();
    this.boundingSphere = this.edge.geometry.boundingSphere;
    this.boundingBox = this.edge.geometry.boundingBox;
  }
}

export default Edge;
