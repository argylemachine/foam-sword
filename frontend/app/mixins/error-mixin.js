import Ember from 'ember';

export default Ember.Mixin.create( {
	pushError: function( errorObject ){
		console.log( "I have errorObject of " + JSON.stringify( errorObject ) );
	}
} );
