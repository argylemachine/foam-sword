import Ember from 'ember';
import ErrorMixin from '../../mixins/error-mixin';
import RandomIdMixin from '../../mixins/random-id';

export default Ember.Controller.extend( ErrorMixin, RandomIdMixin, {
	validHttpTypes: [ "GET", "POST" ],
	showStepTwo: false,
	actions: {
		submitUrl: function( ){

			var self = this;

			var _url	= this.get( "url" );
			var _data	= this.get( "data" );
			var _method	= this.get( "type" ).toLowerCase( );

			var _request = request[_method]( _url, function( err, response, body ){
				if( err ){
					return self.pushError( { message: "Couldn't make the request: " + err, timeout: 5000 } );
				}else if( response.statusCode === 404 ){
					return self.pushError( { message: "The requested URL wasn't found; 404 Back.", timeout: 5000 } );
				}

				self.set( "rawResponseString", body );
				self.set( "rawResponse", JSON.parse( body ) );
				self.set( "showStepTwo", true );
			} );
		},

		// This function is called when a user is selecting what particular
		// fields they would like to store.
		selectData: function( dataSpecification ){
			console.log( "I have dataSpecification of " );
			console.log( dataSpecification );
		}
	}
} );
