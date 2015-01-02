import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend( {
	restore: function( data ){
		
	},
	authenticate: function( options ){
		var self = this;
		return new Ember.RSVP.Promise( function( resolve, reject ){
			// Make a call to the backend with options.identification and options.password.

			$.ajax( {
				type: "POST",
				timeout: 5000,
				url: "/api/login",
				data: { identification: options.identification, hashedAndSaltedPassword: new jsSHA( options.identification + options.password, "TEXT" ).getHash( "SHA-512", "HEX" ) },
				success: function( result ){
					console.log( "I have result of " + JSON.stringify( result ) );
				},
				error: function( ){
					console.log( "Couldn't login." );
				}
			} );

			
		} );
	},
	invalidate: function( data ){
		
	}
} );
