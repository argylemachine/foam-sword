import Ember from 'ember';

export default Ember.ObjectController.extend( {
	navigationLinks: function( ){
		var _return = [ { route: "about", title: "About" } ];
		if( !this.get( "session" ).isAuthenticated ){
			_return.push( { route: "login", title: "Login" } );
		}else{
			_return.push( { route: "config", title: "Configure" } );
		}
		return _return;
	}.property( "navigationLinks" ).volatile( )
} );
