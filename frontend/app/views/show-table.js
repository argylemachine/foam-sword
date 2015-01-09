import Ember from 'ember';

export default Ember.View.extend( {
	didInsertElement: function( ){
		
	},

	keys: function( ){

		// Make sure we can get the model.
		var path = "frontend/models/" + Ember.String.dasherize( this.get( "modelName" ) );
		if( !requirejs.entries[path] ){
			return [ ];
		}

		var _instance = new require( path ).default;
		return Ember.get( _instance, "attributes" ).keys.toArray( );

	}.property( "keys" ).volatile( )
} );
