import Ember from 'ember';
export default Ember.View.extend( {
	didInsertElement: function( ){
		this.hookDropdowns( );
		console.log( this );
	},

	hookDropdowns: function( ){
		$( "#" + this.get( "elementId" ) ).find( ".nav .dropdown-toggle" ).each( function( ){
			var clicked = this;
			$(this).unbind("click");
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
	},

	hookOnAuthenticated: function( ){
		var self = this;
		setTimeout( function( ){
			self.hookDropdowns( );
		}, 200 );
	}.observes( "controller.session.isAuthenticated" ),


	closeAnyOpenDropdowns: function( ){
		$(".dropdown-toggle").each( function( ){
			if( $(this).next().is(":visible") ){
				$(this).next().hide();
			}
		} );
	}
} );
