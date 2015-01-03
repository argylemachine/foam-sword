import Ember from 'ember';
export default Ember.View.extend( {
	didInsertElement: function( ){
		this.hookOnNavChange( );
	},

	hookOnNavChange: function( ){
		$( "#" + this.get( "elementId" ) ).find( ".nav .dropdown-toggle" ).each( function( ){
			var clicked = this;
			$(this).on( "click", function( ){
				$(this).parents( "ul" ).find( ".dropdown-toggle" ).each( function( ){
					if( this === clicked ){
						$(this).next().toggle();
					}else if( $(this).next().is( ":visible" ) ){
						$(this).next().hide();
					}
				} );
			} );
		} );
	}
} );
