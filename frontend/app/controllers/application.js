import Ember from 'ember';

export default Ember.ObjectController.extend( {
	
	navigationLinks: Ember.ArrayProxy.create( { content: Ember.A( [ ] ) } ),

	hookNavigationLinks: function( ){

		var _return = [ { route: "about", title: "About" } ];
		if( !this.get( "session" ).isAuthenticated ){
			_return.push( { route: "login", title: "Login" } );
		}else{
			_return.push( { route: "config", title: "Configure" } );
			_return.push( { route: "logout", title: "Logout" } );
		}
		
		this.get( "navigationLinks" ).set( "content", _return );

	}.observes( "session.isLoggedIn" ).on( "init" )
} );
