import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend( ApplicationRouteMixin, {

	actions: {
		willTransition: function( ){
			this.get( "container" ).lookup( "view:application" ).closeAnyOpenDropdowns( );
		}
	}
} );
