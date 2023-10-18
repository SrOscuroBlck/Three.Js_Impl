import { getOctantFlag } from './getOctantFlag.js';
// asks for where the next octant to place the sphere in within a node
// about "center" with width "width"
const getSphereOctantFlag = ( sphere, center, width ) => {

	// if any of the planes doesn't fully contain the
	// object, then it can't be put in any cell
	const xflags = getOctantFlag( sphere.center.x, sphere.radius, center.x, 0, width );
	if ( xflags === 0 ) return 0;

	const yflags = getOctantFlag( sphere.center.y, sphere.radius, center.y, 1, width );
	if ( yflags === 0 ) return 0;

	const zflags = getOctantFlag( sphere.center.z, sphere.radius, center.z, 2, width );
	if ( zflags === 0 ) return 0;

	return xflags | yflags | zflags;

};
export { getSphereOctantFlag };