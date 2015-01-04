import Ember from 'ember';
import dataSelectComponentMixin from '../mixins/data-select-component-mixin';

export default Ember.Component.extend( dataSelectComponentMixin, {

	dataPart: [ ],

	didInsertElement: function( ){

		// Hide the dom elements that are marked as hidden right away.
		$( "#" + this.get( "elementId" ) ).find( "hidden" ).each( function( ){
			$(this).hide();
		} );

		this.splitData( );
	},

	hookOnData: function( ){
		console.log( "This is data-select-children and I have new data: ");
		console.log( this.get("dataPart") );
	}.observes( "dataPart" )
} );
