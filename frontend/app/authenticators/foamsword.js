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

			$.ajax( {
				type: "POST",
				timeout: 5000,
				url: "/api/login",
				data: { identification: options.identification, hashedAndSaltedPassword: new jsSHA( options.identification + options.password, "TEXT" ).getHash( "SHA-512", "HEX" ) },
				success: function( result ){
					if( !result.loggedIn ){
						return reject( );
					}
					return resolve( result.session );
				},
				error: function( ){
					return reject( );
				}
			} );

			
		} );
	},

	invalidate: function( data ){
		return new Ember.RSVP.Promise( function( resolve, reject ){
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
