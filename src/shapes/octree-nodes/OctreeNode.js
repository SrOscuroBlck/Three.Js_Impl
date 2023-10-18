import * as THREE from "three";
import { getSphereOctantFlag } from "../../utils/getSphereOctantFlag.js";
import { iterateOverOctants } from "../../utils/iterateOverOctants.js";

const X_FLAG = 1 << 0;
const Y_FLAG = 1 << 1;
const Z_FLAG = 1 << 2;

const tempvec = new THREE.Vector3();

class OctreeNode {
  _childrens; // Array<OctreeNode>[8];
  _parent; // : OctreeNode optional
  _objects; //  Objects;
  _center; // : Vector3;
  _halfSize; // : Vector3;
  _isLeaf; // : boolean;
  _width; // : number;
  _octree; // : Octree;
  _octant; // : number;
  _octantCount; // : number;
  _bounds; // : Box3;
  _sphere; // : Sphere;
  _pendingInserts; // : Objects;

  constructor(octree, parent = null, octant = -1) {
    // hierarchy context
    this._octree = octree;
    this._parent = parent;
    this._octant = octant;

    // position
    this._center = new THREE.Vector3();
    this._width = 0;

    // bounds checkers
    this._bounds = new THREE.Box3();
    this._sphere = new THREE.Sphere();

    this._pendingInserts = [];
    this._objects = [];
    this._childrens = new Array(8).fill(null);
    this._octantCount = 0;

    if (parent) {
      const w2 = parent._width / 4;
      this._width = parent._width / 2;
      this._center.copy(parent._center);
      this._center.x += octant & X_FLAG ? w2 : -w2;
      this._center.y += octant & Y_FLAG ? w2 : -w2;
      this._center.z += octant & Z_FLAG ? w2 : -w2;
    }

    this._updateBounds();
  }


  frustumCast( frustum, intersects = [] ) {

		if (
			! frustum.intersectsSphere( this._sphere )
			|| ! frustum.intersectsBox( this._bounds )
		) {

			return;

		}

		this._flushPending();

		const obj = this._objects;
		for ( let i = 0, l = obj.length; i < l; i ++ ) {

			const o = obj[ i ];
			if ( frustum.intersectsSphere( o.boundingSphere ) ) {

				intersects.push( o );

			}

		}

		for ( let i = 0, l = this._childrens.length; i < l; i ++ ) {

			const n = this._childrens[ i ];
			if ( n !== null ) {

				n.frustumCast( frustum, intersects );

			}

		}
    
		return intersects;

	}

  _updateBounds() {
    const w2 = this._width / 2;
    tempvec.set(w2, w2, w2);

    // Set up box
    this._bounds.min.copy(this._center).sub(tempvec);
    this._bounds.max.copy(this._center).add(tempvec);

    // Set up sphere
    const len = tempvec.length();
    this._sphere.radius = len;
    this._bounds.getCenter(this._sphere.center);
  }

  _search(sphere, cb) {
    cb(this);

    if (this._childrens) {
      const flags = getSphereOctantFlag(sphere, this._center, this._width);

      iterateOverOctants(flags, (octant) => {
        const n = this._childrens && this._childrens[octant];
        if (n) n._search(sphere, cb);
      });
    }
  }
  _flushPending() {
    for (let i = 0, l = this._pendingInserts.length; i < l; i++) {
      const o = this._pendingInserts[i];
      const flags = getSphereOctantFlag(
        o.boundingSphere,
        this._center,
        this._width
      );

      if (flags === 0) {
        this._objects.push(o);
      } else {
        // find the node it belongs in.
        iterateOverOctants(flags, (octant) => {
          let n = this._getOctant(octant);
          n._addPending(o);
        });
      }
    }

    this._pendingInserts.length = 0;
  }
  _addPending(o) {
    if (!o.boundingSphere) throw new Error("Object has no boundingSphere", o);

    // insert into appropriate children
    if (this._octantCount === 0) {
      this._objects.push(o);

      if (this._objects.length >= this._octree._options.maxObjects) {
        this._pendingInserts.push(...this._objects);
        this._objects.length = 0;
      }
    } else {
      this._pendingInserts.push(o);
    }
  }
  _getOctant( octant ) {

		const n = this._childrens && this._childrens[ octant ];

		if ( ! n ) {

			this._childrens[ octant ] = new OctreeNode( this._octree, this, octant );
			this._octantCount ++;
			return this._childrens[ octant ];

		} else {

			return n;

		}

	}
}

export default OctreeNode;
