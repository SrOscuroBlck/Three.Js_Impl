// returns whether or not the provided range is within
// the give min max bounds
const isInside = ( point, range, min, max ) => {

	return point - range > min && point + range < max;

};

export { isInside };