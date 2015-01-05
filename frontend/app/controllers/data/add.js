import Ember from 'ember';
import ErrorMixin from '../../mixins/error-mixin';
import RandomIdMixin from '../../mixins/random-id';

export default Ember.Controller.extend( ErrorMixin, RandomIdMixin, {

	validHttpTypes: [ "GET", "POST" ],
	validPollingIntervals: [	{ name: "1 Minute", value: 60000 },
					{ name: "5 Minutes", value: 60000*5 },
					{ name: "10 Minutes", value: 60000*10 },
					{ name: "30 Minutes", value: 60000*30 },
					{ name: "1 Hour", value: 60000*60 },
					{ name: "1 Day", value: 60000*60*24 } ],
	showStepTwo: false,
	showStepThree: false,

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
		
			this.set( "selectedData", dataSpecification );
			this.set( "showStepThree", true );
		},

		createDataModel: function( ){
			console.log( "At this point I should have everything I need.." );
			console.log( this );
		}
	}
} );
