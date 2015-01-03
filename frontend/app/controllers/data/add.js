import Ember from 'ember';

export default Ember.Controller.extend( {
	validHttpTypes: [ "GET", "POST" ],
	showStepTwo: false,
	actions: {
		submitUrl: function( ){
			var _url	= this.get( "url" );
			var _type	= this.get( "type" );
			var _data	= this.get( "data" );

			var _method;
			if( _type === "GET" ){
				_method = $.get;
			}else if( _type === "POST" ){
				_method = $.post;
			}else{
				console.log( "What the hell is _type: " + _type );
			}

			var _request = _method( _url, _data, function( rawResponse ){
				self.set( "rawResponse", rawResponse );
				self.set( "showStepTwo", true );
			} );
		}
	}
} );
