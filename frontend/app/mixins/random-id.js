import Ember from 'ember';

export default Ember.Mixin.create( {
	randomId: function( ){
		return uuid.v4( );
	}.property( ).volatile( )
} );
