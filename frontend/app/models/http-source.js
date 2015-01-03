import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Model.extend( {
	name: DS.attr( "string" ),
	url: DS.attr( "string" ),
	queryString: DS.attr( "jsonObject" )
} );
