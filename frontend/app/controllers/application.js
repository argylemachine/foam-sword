import Ember from 'ember';

export default Ember.ObjectController.extend( {
	
	navigationLinks: Ember.ArrayProxy.create( { content: Ember.A( [ ] ) } ),

	hookNavigationLinks: function( ){

		var _return = [ { route: "about", title: "About" } ];
		if( this.get( "session" ).isAuthenticated ){
			_return.push( { title: "Configuration", children: [ { route: "config", title: "Preferences" }, { route: "add", title: "Add Data Source" } ] } );
			_return.push( { title: "View", children: [ { route: "view", title: "Overview" }, { route: "explore", title: "Explore" } ] } );
		}
		
		this.get( "navigationLinks" ).set( "content", _return );

	}.observes( "session.isLoggedIn" ).on( "init" )
} );
