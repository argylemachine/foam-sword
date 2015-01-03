import DS from 'ember-data';

export default DS.Transform.extend( {
	serialize: function( a ){
		return a;
	},
	deserialize: function( a ){
		return a;
	}
} );
