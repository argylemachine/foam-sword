var config	= require( "config" );
var express	= require( "express" );
var session	= require( "express-session" );
var bodyParser	= require( "body-parser" );

var app = express( );

app.use( session( { name: config.cookieName, secret: config.cookieSecret } ) );
app.use( bodyParser.json( ) );
app.use( bodyParser.urlencoded( ) );

app.post( "/api/login", function( req, res ){
	var _failed = function( ){
		return res.json( { loggedIn: false } );
	};

	["identification","hashedAndSaltedPassword"].forEach( function( what ){
		if( req.body[what] == undefined ){
			return _failed;
		}
	} );

	// TODO: lookup user; match authentications.

	req.session.isLoggedIn		= true;
	req.session.identification	= req.body.identification;
	
	return res.json( { loggedIn: true, session: { identification: req.body.identification } } );
} );

app.post( "/api/logout", function( req, res ){
	if( !req.session.isLoggedIn ){
		return res.json( false );
	}

	req.session.destroy( function( err ){
		return res.json( true );
	} );
} );

app.get( "/api/status", function( req, res ){
	var _o = { loggedIn: req.session.isLoggedIn };
	if( _o.loggedIn ){
		_o.identification = req.session.identification;
	}

	return res.json( _o );
} );

app.use( function( req, res, cb ){
	if( !req.session.isLoggedIn ){
		return cb( "Permission Denied" );
	}

	return cb( null );
} );

// At this point we can define more routes, assuming that the user
// is authenticated.

app.listen( config.port );
