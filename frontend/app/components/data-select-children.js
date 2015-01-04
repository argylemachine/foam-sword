import Ember from 'ember';

export default Ember.Component.extend( {
	didInsertElement: function( ){

		// Hide the dom elements that are marked as hidden right away.
		$( "#" + this.get( "elementId" ) ).find( "hidden" ).each( function( ){
			$(this).hide();
		} );
	}
} );
