// An octant id is defined by a 3 bit flag (representing xyz). 0 is positive, 1 is negative.
const X_FLAG = 1 << 0;
const Y_FLAG = 1 << 1;
const Z_FLAG = 1 << 2;
const iterateOverOctants = ( flags, cb ) => {

	for ( let x = 0; x <= 1; x ++ ) {

		const xf = 1 << ( 0 + 3 * x );
		if ( ! ( xf & flags ) ) continue;

		for ( let y = 0; y <= 1; y ++ ) {

			const yf = 1 << ( 1 + 3 * y );
			if ( ! ( yf & flags ) ) continue;

			for ( let z = 0; z <= 1; z ++ ) {

				const zf = 1 << ( 2 + 3 * z );
				if ( ! ( zf & flags ) ) continue;

				let octant = 0;
				if ( x === 0 ) octant |= X_FLAG;
				if ( y === 0 ) octant |= Y_FLAG;
				if ( z === 0 ) octant |= Z_FLAG;

				cb( octant );

			}

		}

	}

};

export { iterateOverOctants };