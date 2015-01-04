import Ember from 'ember';
import RandomIdMixin from '../mixins/random-id';
import dataSelectComponentMixin from '../mixins/data-select-component-mixin';

export default Ember.Component.extend( RandomIdMixin, dataSelectComponentMixin, {
	actions: {
		expandClicked: function( id ){
			var _dom = $("#children-"+id);
			if( _dom.hasClass( "hidden" ) ){
				$("#link-"+id).html("Hide");
				_dom.removeClass('hidden');
			}else{
				$("#link-"+id).html("Expand");
				_dom.addClass("hidden");
			}
		}
	}
} );
