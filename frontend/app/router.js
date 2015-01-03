import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map( function( ){
	this.route( "about" );
	this.route( "config" );
	this.route( "login" );
	this.route( "logout" );
	this.route( "add" );
	this.route( "view" );
	this.route( "explore" );
} );

export default Router;
