import Ember from 'ember';

export default Ember.Controller.extend( {
	validHttpTypes: [ "GET", "POST" ],
	showStepTwo: false,
	actions: {
		submitUrl: function( ){
			var _url	= this.get( "url" );
			var _type	= this.get( "type" );

			console.log( "I have type of " + _type );
		}
	}
} );
