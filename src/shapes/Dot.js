import * as THREE from 'three';

/**
 * This class represents a single dot in 3D space.
 * @constructor color - The color of the dot in hex format.
 * @constructor size - The size of the dot could be an integer or a double.
 */
class Dot {
  geometry;
  material;
  points;
  axis; 

  constructor(color = 0xff0000, size = 0.05) {
    this.geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([0, 0, 0]);
    this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    this.material = new THREE.PointsMaterial({ color, size });
    this.points = new THREE.Points(this.geometry, this.material);
    this.axis = new THREE.Vector3(1, 0, 0); 
  }

  /**
   * This method sets the position and axis of the dot.
   * @param  x axis integer or double
   * @param  y axis integer or double
   * @param  z axis integer or double
   */
  setPosition(x, y, z) {
    this.geometry.attributes.position.setXYZ(0, x, y, z);
    this.geometry.attributes.position.needsUpdate = true;

  }

}

export default Dot;
