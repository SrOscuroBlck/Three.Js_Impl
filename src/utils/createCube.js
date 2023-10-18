const vertices = [
    // Front face
    { x: 1, y: 1, z: 1 },
    { x: 2, y: 1, z: 1 },
    { x: 1, y: 2, z: 1 },
    { x: 2, y: 2, z: 1 },
  
    // Back face
    { x: 1, y: 1, z: 2 },
    { x: 2, y: 1, z: 2 },
    { x: 1, y: 2, z: 2 },
    { x: 2, y: 2, z: 2 },
  
    // Lateral faces
    { x: 1, y: 1, z: 1 },
    { x: 1, y: 2, z: 1 },
    { x: 1, y: 1, z: 2 },
    { x: 1, y: 2, z: 2 },
    { x: 2, y: 1, z: 1 },
    { x: 2, y: 2, z: 1 },
    { x: 2, y: 1, z: 2 },
    { x: 2, y: 2, z: 2 },
  
    // Up-down face
    { x: 1, y: 1, z: 1 },
    { x: 2, y: 1, z: 1 },
    { x: 1, y: 1, z: 2 },
    { x: 2, y: 1, z: 2 },
    { x: 1, y: 2, z: 1 },
    { x: 2, y: 2, z: 1 },
    { x: 1, y: 2, z: 2 },
    { x: 2, y: 2, z: 2 },
  ];
function createCubeAndConnectFaces(graph) {
    // Define the cube vertices

  
    // Add the vertices to the graph
    for (const vertex of vertices) {
      graph.add(vertex.x, vertex.y, vertex.z, 0xff0000, 0.2);
    }
  
    // Connect front face vertices
    graph.connectNodes(graph._nodes[0], graph._nodes[1], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[0], graph._nodes[2], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[1], graph._nodes[3], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[2], graph._nodes[3], 0x0000ff, 0.05);
    //connect backface
    graph.connectNodes(graph._nodes[4], graph._nodes[5], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[4], graph._nodes[6], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[5], graph._nodes[7], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[6], graph._nodes[7], 0x0000ff, 0.05);
    //connect lateral-faces
    graph.connectNodes(graph._nodes[8], graph._nodes[9], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[8], graph._nodes[10], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[9], graph._nodes[11], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[10], graph._nodes[11], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[12], graph._nodes[13], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[12], graph._nodes[14], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[13], graph._nodes[15], 0x0000ff, 0.05);
    graph.connectNodes(graph._nodes[14], graph._nodes[15], 0x0000ff, 0.05);
  }


  function calculateCenter() {
    const center = { x: 0, y: 0, z: 0 };
    for (const vertex of vertices) {
      center.x += vertex.x;
      center.y += vertex.y;
      center.z += vertex.z;
    }
    center.x /= vertices.length;
    center.y /= vertices.length;
    center.z /= vertices.length;
    return center;
  }
export {createCubeAndConnectFaces, calculateCenter};