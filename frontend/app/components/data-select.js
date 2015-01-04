import Ember from 'ember';
import RandomIdMixin from '../mixins/random-id';

export default Ember.Component.extend( RandomIdMixin, {

	dataPart: [ ],

	didInsertElement: function( ){
		var self	= this;

		// Go through and parse the data into dataPart so that it can be used
		// in handlebars.
		var _dataPart	= [ ];
		Object.keys( this.get( "data" ) ).forEach( function( key ){
			_dataPart.push( { name: key, checked: false, children: self.getChildren( self.get("data")[key] ), randomId: self.get("randomId") } );
		} );
		this.set( "dataPart", _dataPart );

		// We want to make sure we hook on checkbox select.
		self.hookCheckboxes( );
	},

	getChildren: function( data ){
		var self = this;
		try{
			if( Array.isArray( data ) ){
				return [ ];
			}else if( typeof data !== "object" ){
				return [ ];
			}

			var _return = [ ];
			Object.keys( data ).forEach( function( key ){
				_return.push( { name: key, checked: false, children: self.getChildren( data[key] ), randomId: self.get("randomId") } );
			} );
			return _return;
		}catch( err ){
			return [ ];
		}
	},

	hookCheckboxes: function( rootElement ){

		var self = this;

		if( !rootElement ){
			rootElement = this.get( "elementId" );
		}

		// Checkboxes that we can see currently.
		$("#" + rootElement ).find( ":checkbox" ).each( function( ){

			// If we already have a hook on this checkbox
			// lets ignore it.
			if( $(this).data( ).hooked ){ return; }

			// Mark this checkbox as being hooked.
			$(this).data( "hooked", true );

			// Setup the change listener
			$(this).change( function( ){
				if( $(this).is( ":checked" ) ){
					console.log( "I have checked of " );
					console.log( this );
				}else{
					// Uncheck already selected item.
				}
			} );
		} );

		// Lets setup a DOMSubtreeModified event listener so that we 
		// make sure to hook on any new checkboxes that get shoved in.
		$("#" + rootElement ).one( "DOMSubtreeModified", function( ){
			self.hookCheckboxes( rootElement );
		} );
	},

	actions: {
		expandClicked: function( id ){
			var _dom = $("#children-"+id);
			if( _dom.hasClass( "hidden" ) ){
				$("#link-"+id).html("Hide");
				_dom.removeClass('hidden');

				// We want to enable checkboxes below this.
				this.hookCheckboxes( "children-"+id );

			}else{
				$("#link-"+id).html("Expand");
				_dom.addClass("hidden");
			}
		},
		selectData: function( details ){
			console.log( "This is selectData; I have details of " );
			console.log( details );
		}
	}
} );
