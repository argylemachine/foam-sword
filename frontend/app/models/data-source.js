import DS from 'ember-data';

export default DS.Model.extend( {
	name: DS.attr( "string" ),
	url: DS.attr( "string" ),
	urlArguments: DS.attr( "json-object" ),
	method: DS.attr( "string" ),
	pollingInterval: DS.attr( "number" )
} );
