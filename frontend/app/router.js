import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map( function( ){
	this.route( "about" );
	this.route( "login" );
	this.route( "logout" );

	this.resource( "data", function( ){
		this.route( "add" );
		this.route( "manage" );
		this.route( "query" );
	} );

	this.resource( "compute", function( ){
		this.route( "add" );
		this.route( "manage" );
	} );

	this.resource( "view", function( ){
		this.route( "add" );
		this.route( "manage" );
		this.route( "go" );
	} );
} );

export default Router;
