import Dot from "../shapes/Dot.js";
import Edge from "../shapes/Edge.js";

/**
 * This class represents a graph of dots in 3D space using a traditional adjacency list.
 * @property _nodes - An array of _nodes (dots).
 * @property _edges - An array of _edges (lines).
 * @property _adjacencyList - An array of linked lists to represent the adjacency list.
 * @constructor does not accept parameters, it initializes the _nodes, _edges, and _adjacencyList.
 * @method add - Adds a new node (3D dot) to the graph.
 * @method connect_Nodes - Connects two _nodes (dots) by creating an edge (line) and adding it to the _edges array.
 * @method removeNode - Removes a node from the graph and updates the adjacency list.
 * @method removeEdge - Removes an edge between two _nodes from the adjacency list.
 * @method render - Renders the _nodes and _edges in the scene.
 */
class DotGraph3D {
  _nodes;
  _edges;
  _adjacencyList;

  constructor() {
    this._nodes = [];
    this._edges = [];
    this._adjacencyList = [];
  }

  /**
   * This method adds a new node (3D dot) to the graph.
   * Also accepts parameters for the node's position, color, and size.
   * Initializes a new node (dot) and adds it to the _nodes array.
   * Initializes an empty linked list and adds it to the adjacency list.
   * @param {number} x - Axis coordinate (integer or double).
   * @param {number} y - Axis coordinate (integer or double).
   * @param {number} z - Axis coordinate (integer or double).
   * @param {number} color - The color of the dot in hex format.
   * @param {number} size - The size of the dot could be an integer or a double.
   */
  add(x, y, z, color, size) {
    const newNode = new Dot(x,y,z ,color, size);
    this._nodes.push(newNode);
    this._adjacencyList.push([]);
  }

  /**
   * This method check if the node is in the graph.
   * instantiates a new edge (line) between two _nodes (dots)
   * and adds it to the _edges array. The edge is also recorded in the adjacency list.
   * @param {Dot} node1 - The first node (dot).
   * @param {Dot} node2 - The second node (dot).
   * @param {number} lineColor - The color of the line in hex format.
   * @param {number} lineWidth - The width of the line could be an integer or double.
   */
  connectNodes(node1, node2, lineColor, lineWidth) {
    const index1 = this._nodes.indexOf(node1);
    const index2 = this._nodes.indexOf(node2);
    if (index1 !== -1 && index2 !== -1) {
      const edge = new Edge(node1, node2, lineColor, lineWidth);
      this._edges.push(edge);
      this._adjacencyList[index1].push(index2);
      this._adjacencyList[index2].push(index1);
    }
  }

  /**
   * This method removes a node from the instance of the graph.
   * Remove the node and its adjacency list entry.
   * Remove any _edges connected to the removed node.
   * Remove _edges associated with the removed node.
   * @param {Dot} node - The node to be removed.
   */
  removeNode(node) {
    const index = this._nodes.indexOf(node);
    if (index !== -1) {
      this._nodes.splice(index, 1);
      this._adjacencyList.splice(index, 1);

      const neighbors = this._adjacencyList[index];
      neighbors.forEach((neighborIndex) => {
        const neighbor = this._adjacencyList[neighborIndex];
        const neighborIndexToRemove = neighbor.indexOf(index);
        if (neighborIndexToRemove !== -1) {
          neighbor.splice(neighborIndexToRemove, 1);
        }
      });

      this._edges = this._edges.filter(
        (edge) => edge.node1 !== node && edge.node2 !== node
      );
    }
  }

  /**
   * This method removes an edge between two _nodes from the adjacency list and the _edges array.
   * Remove the edge by updating the adjacency list for both _nodes,
   * and remove the edge from the _edges array by filtering it out.
   * @param {Dot} node1 - The first node.
   * @param {Dot} node2 - The second node.
   */
  removeEdge(node1, node2) {
    const index1 = this._nodes.indexOf(node1);
    const index2 = this._nodes.indexOf(node2);
    if (index1 !== -1 && index2 !== -1) {
      const neighbors1 = this._adjacencyList[index1];
      const neighbors2 = this._adjacencyList[index2];

      const index1ToRemove = neighbors1.indexOf(index2);
      const index2ToRemove = neighbors2.indexOf(index1);

      if (index1ToRemove !== -1 && index2ToRemove !== -1) {
        neighbors1.splice(index1ToRemove, 1);
        neighbors2.splice(index2ToRemove, 1);
      }

      this._edges = this._edges.filter(
        (edge) => !(edge.node1 === node1 && edge.node2 === node2)
      );
    }
  }

  /**
   * This method accept an index and returns the node at that index.
   * @param {number} index - An integer representing the index of the node.
   * @returns {Dot || null} - The node at the given index or null if the index is out of bounds. 
   */
  get(index) {
    if (index >= 0 && index < this._nodes.length) {
      return this._nodes[index];
    }
    return null;
  }

/**
 * Utility method to transverse the nodes
 * without violating encapsulation may change in future
 * 
 * @param {*} callback 
 */
forEachNode(callback) {
  this._nodes.forEach((node, index) => {
    // For each node in _nodes, call the provided callback function.
    // Pass the node and its index as arguments to the callback.
    callback(node, index);
  });
}
/**
 * Utility method to transverse the edges
 * without violating encapsulation may change in future
 * @param {*} callback 
 */
forEachEdge(callback) {
  this._edges.forEach((edge, index) => {
    // For each edge in _edges, call the provided callback function.
    // Pass the edge and its index as arguments to the callback.
    callback(edge, index);
  });
}
  /**
   * This method adds the _nodes and _edges to the actual octree
   * 
   * 
   */
  addToOctree(octree) {
    this._nodes.forEach((node) => {
      octree.add(node);
    });

    this._edges.forEach((edge) => {
      octree.add(edge);
    });
  }
}

export default DotGraph3D;
