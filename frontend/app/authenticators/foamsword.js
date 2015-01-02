import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend( {
	restore: function( data ){
		return new Ember.RSVP.Promise( function( resolve, reject ){
			$.ajax( {
				type: "GET",
				timeout: 5000,
				url: "/api/status",
				success: function( result ){
					if( !result.loggedIn ){
						return reject( );
					}
					return resolve( data );
				},
				error: function( ){
					return reject( );
				}
			} );
		} );
	},
	authenticate: function( options ){
		var self = this;
		return new Ember.RSVP.Promise( function( resolve, reject ){
			// Make a call to the backend with options.identification and options.password.

			var _data = { identification: options.identification, hashedAndSaltedPassword: new jsSHA( options.identification + options.password, "TEXT" ).getHash( "SHA-512", "HEX" ) };

			$.ajax( {
				type: "POST",
				timeout: 5000,
				url: "/api/login",
				data: _data, 
				success: function( result ){
					if( !result.loggedIn ){
						return reject( );
					}
					console.log( "I'm resolving with session of " + JSON.stringify( result.session ) );
					return resolve( result.session );
				},
				error: function( err ){
					console.log( err );
					return reject( );
				}
			} );

			
		} );
	},

	invalidate: function( data ){
		return new Ember.RSVP.Promise( function( resolve, reject ){
			console.log( "I'm posting to invalidate.." );
			$.ajax( {
				type: "POST",
				timeout: 5000,
				url: "/api/logout",
				data: { },
				success: function( result ){
					return resolve( );
				},
				error: function( ){
					return reject( );
				}
			} );
		} );
	}
} );
