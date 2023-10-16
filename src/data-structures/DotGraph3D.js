import Dot from "../shapes/Dot.js";
import Edge from "../shapes/Edge.js";

/**
 * This class represents a graph of dots in 3D space.
 * @property nodes - An array of nodes (dots).
 * @property edges - An array of edges (lines).
 * @constructor does not accept parameters, it initializes the nodes and edges arrays as empty arrays.
 * @method addNode - Adds a new node (3D dot) to the graph.
 * @method connectNodes - Connects two nodes (dots) by creating an edge (line).
 * @method removeNode - Removes a node from the graph.
 * @method removeEdge - Removes an edge between two nodes.
 * @method render - Renders the nodes and edges in the scene.
 */
class DotGraph3D {
  nodes;
  edges;
  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  /**
   * This method adds a new node (3D dot) to the graph.
   * Also accepts parameters for the node's position, color, and size.
   * @param {number} x - Axis coordinate (integer or double).
   * @param {number} y - Axis coordinate (integer or double).
   * @param {number} z - Axis coordinate (integer or double).
   * @param {number} color - The color of the dot in hex format.
   * @param {number} size - The size of the dot could be an integer or a double.
   */
  addNode(x, y, z, color, size) {
    const newNode = new Dot(color, size);
    newNode.setPosition(x, y, z);
    this.nodes.push(newNode);
  }

  /**
   * This method instantiates a new edge (line) between two nodes (dots)
   * and add them to the instance edges array.
   * @param {Dot} node1 - The first node (dot).
   * @param {Dot} node2 - The second node (dot).
   * @param {number} lineColor - The color of the line in hex format.
   * @param {number} lineWidth - The width of the line could be an integer or double.
   */
  connectNodes(node1, node2, lineColor, lineWidth) {
    const edge = new Edge(node1, node2, lineColor, lineWidth);
    this.edges.push(edge);
  }

  /**
   * This method removes a node from the instance of the graph.
   * @param {Dot} node - The node to be removed.
   */
  removeNode(node) {
    const index = this.nodes.indexOf(node);
    if (index !== -1) {
      this.nodes.splice(index, 1);
    }
  }

  /* to do */
  removeEdge(node1, node2) {}

  /**
   * This method iterates trough the nodes and edges and add
   * them to the parameter scene.
   * @param {Scene} scene
   */
  render(scene) {
    this.nodes.forEach((node) => {
      scene.add(node.points);
    });
    this.edges.forEach((edge) => {
      scene.add(edge.edge);
    });
  }
}

export default DotGraph3D;
