import * as THREE from 'three';

class Dot {
  geometry;
  material;
  points;
  
  constructor(color = 0xff0000, size = 0.05) {
    this.geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([0, 0, 0]);
    this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    this.material = new THREE.PointsMaterial({ color, size });

    this.points = new THREE.Points(this.geometry, this.material);
  }

  setPosition(x, y, z) {
    this.geometry.attributes.position.setXYZ(0, x, y, z);
    this.geometry.attributes.position.needsUpdate = true;
  }
}

export default Dot;
