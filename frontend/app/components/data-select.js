import Ember from 'ember';
import RandomIdMixin from '../mixins/random-id';

export default Ember.Component.extend( RandomIdMixin, {

	dataPart: [ ],

	didInsertElement: function( ){
		var self	= this;

		var dataPart	= [ ];
		Object.keys( this.get( "data" ) ).forEach( function( key ){
			dataPart.push( { name: key, checked: false, children: self.getChildren( self.get("data")[key] ), randomId: self.get("randomId" ) } );
		} );

		this.set( "dataPart", dataPart );
	},

	getChildren: function( topLevel ){
		var self	= this;
		try{
			var _return	= [ ];

			// If we have an array we don't want to iterate through
			// the children.
			if( Array.isArray( topLevel ) ){
				return [ ];
			}

			if( typeof topLevel !== "object" ){
				// We got an actual value..
				return [ ];
			}

			Object.keys( topLevel ).forEach( function( key ){
				_return.push( { name: key, checked: false, children: self.getChildren( topLevel[key] ), randomId: self.get("randomId") } );
			} );

			return _return;
		} catch( err ){
			return [ ];
		}
	},

	actions: { 
		expandClicked: function( id ){
			console.log( "I have id of " +id );
		}
	}
} );
