import { isInside } from './isInside.js';
const getOctantFlag = ( spPos, radius, centPos, i, width ) => {

	let flags = 0;

	const w2 = width / 2;
	const negmin = centPos - w2;
	const negmax = centPos;

	const posmin = centPos;
	const posmax = centPos + w2;

	// checks if the sphere is within given min max ranges (edges of the bounds)
	const inPos = isInside( spPos, radius, posmin, posmax );
	const inNeg = isInside( spPos, radius, negmin, negmax );

	if ( inPos ) flags |= 1 << i;
	if ( inNeg ) flags |= 1 << ( i + 3 );

	return flags;

};
export { getOctantFlag };