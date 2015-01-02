var config	= require( "config" );
var express	= require( "express" );
var session	= require( "express-session" );
var bodyParser	= require( "body-parser" );

var app = express( );

app.use( session( { name: config.cookieName, secret: config.cookieSecret } ) );
app.use( bodyParser.json( ) );
app.use( bodyParser.urlencoded( ) );

app.post( "/api/login", function( req, res ){
	console.log( req.body );
} );

app.post( "/api/logout", function( req, res ){
	
} );

app.get( "/api/status", function( req, res ){
	
} );

app.listen( config.port );
