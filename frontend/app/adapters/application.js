import DS from 'ember-data';

export default DS.RESTAdapter.extend( {
	namespace: 'api/data',
	primaryKey: "_id",
	pathForType: function( type ){
		return type;
	},
} );
