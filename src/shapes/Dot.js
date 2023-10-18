import * as THREE from "three";

/**
 * This class represents a single dot in 3D space.
 * @constructor color - The color of the dot in hex format.
 * @constructor size - The size of the dot could be an integer or a double.
 * @method setPosition - Sets the position of the dot.
 * @property points - The three.js points object.
 * @property axis - The axis of the dot.
 * @property next - The next dot used to iterate trough a data structure.
 * @property geometry - The three.js geometry object it is where you define the shape and attributes of your object (such as its position).
 * @property material - The three.js material object it is where you define the appearance of your object (such as its color and texture).
 * @property points - The three.js points object it is a visual representation that renders this geometry with the specified material.
 */
class Dot {
  geometry;
  material;
  points;
  axis;
  next;
  boundingSphere;
  boundingBox;
  x;
  y;
  z;

  constructor(x , y , z , color = 0xff0000, size = 0.05) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([x, y, z]);
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    this.material = new THREE.PointsMaterial({ color, size });
    this.points = new THREE.Points(this.geometry, this.material);
    this.axis = new THREE.Vector3(x, y, z);
    this.next = null;
    this.points.geometry.computeBoundingSphere();
    this.points.geometry.computeBoundingBox();
    this.boundingSphere = this.points.geometry.boundingSphere;
    this.boundingBox = this.points.geometry.boundingBox;
  }

  /**
   * This method sets the position and axis of the dot.
   * @param x - Axis coordinate (integer or double).
   * @param y - Axis coordinate (integer or double).
   * @param z - Axis coordinate (integer or double).
   */
  setPosition(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.axis.set(this.x, this.y, this.z);
    this.geometry.attributes.position.setXYZ(0, this.x, this.y, this.z);
    this.geometry.attributes.position.needsUpdate = true;
  }

  /**
   * This method updates the color of the dot.
   * @param {number} color - The new color in hex format.
   */
  setColor(color) {
    this.material.color.setHex(color);
  }


  render(scene) {
    scene.add(this.points);
  }
}

export default Dot;
