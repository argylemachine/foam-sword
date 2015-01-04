import Ember from 'ember';
import RandomIdMixin from '../mixins/random-id';

export default Ember.Component.extend( RandomIdMixin, {

	dataPart: [ ],
	selectedCheckboxes: [ ],

	didInsertElement: function( ){
		this.splitData( );
	
		// We want to make sure we hook on checkbox select.
		this.hookCheckboxes( );
	},

	splitData: function( ){
		var self = this;

		// Go through and parse the data into dataPart so that it can be used
		// in handlebars.
		var _dataPart	= [ ];
		Object.keys( this.get( "data" ) ).forEach( function( key ){
			_dataPart.push( { name: key, checked: false, children: self.getChildren( self.get("data")[key] ), randomId: self.get("randomId") } );
		} );

		this.set( "dataPart", _dataPart );

		// Because this function is called whenever data is set, we want to clear
		// any checkboxes that may have been selected..
		this.set( "selectedCheckboxes", [ ] );
	}.observes( "data"),

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

				// Figure out what the name of this should be.
				var getChildName = function( current, runningName ){

					runningName.push( $(current).prev().html().trim() );

					var _dataChildrenElement = $($(current).closest(".data-children"));

					if( _dataChildrenElement.parents( ".data-children" ).length > 0 ){
						// Another child.. recurse.
						return getChildName( _dataChildrenElement.parents(".data-children")[0], runningName );
					}else{
						// Top level; Lets make sure to grab the name of the main data element.
						runningName.unshift( $(current).parents(".data-select-item").children(".control-label").html().trim() );

						// We're done; lets return
						return runningName;
					}
				};

				var name;
				if( $(this).parents( ".data-children" ).length !== 0 ){
					name = getChildName( this, [] ).join(".");
				}else{
					name = $(this).parent().prev( ).html().trim();
				}

				
				// Act accordingly; we should add/remove based on if we're 
				// being checked or unchecked.
				if( $(this).is( ":checked" ) ){
					self.get( "selectedCheckboxes" ).addObject( name );
				}else{
					// Uncheck already selected item.
					self.get( "selectedCheckboxes" ).removeObject( name );
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
				$("#link-"+id).html("Collapse");
				_dom.removeClass('hidden');

				// We want to enable checkboxes below this.
				this.hookCheckboxes( "children-"+id );

			}else{
				$("#link-"+id).html("Expand");
				_dom.addClass("hidden");
			}
		},
		selectData: function( ){
			console.log( "I have selectedCheckboes of " );
			console.log( this.get( "selectedCheckboxes" ) );
		}
	}
} );
