var config	= require( "config" );
var express	= require( "express" );
var session	= require( "express-session" );
var bodyParser	= require( "body-parser" );
var nano	= require( "nano" )( config.db );

var getDatabase = function( identification, cb ){
	nano.db.get( "u-" + identification, function( err, body ){
		if( err ){
			if( err.error && err.error == "not_found" && err.reason == "no_db_file" ){
				return nano.db.create( "u-" + identification, function( err, body ){
					if( err ){ return cb( err ); }
					return cb( null, nano.use( "u-" + identification ) );
				} );
			}
			return cb( err );
		}

		return cb( null, nano.use( "u-" + identification ) );
	} );
};

var create_view = function( designDoc, keys, cb ){

	// Check if the design document exists.
	req.db.head( "_design/" + designDoc, function( err, _, headers ){
		if( err ){
			console.log( err );
			return cb( err );
		}

		req.db.get( "_design/" + designDoc, function( err, getResponse ){
			if( err ){ return cb( err ); }
			
			console.log( "I have getResponse of " );
			console.log( getResponse );
			return cb( "crap" );
		} );
	} );

};

var run_query = function( req, cb  ){

	var _query;
	if( req.method == "GET" ){
		_query = req.query;
	}else if( req.method == "POST" ){
		_query = req.body;
	}


	// Determine the keys we should use.
	var keys = Object.keys( _query );
	var key = keys.map( function( key ){ return _query[key]; } );

	req.db.view( req.model_name, keys.join("-"), { key: key }, function( err, viewResponse ){
		if( err ){

			// Check to see if the view is missing; if it is 
			// we should dynamically create it ( because hey; whats the point in
			// a lot of work? );

			if( err.error && err.error == "not_found" && err.reason && err.reason == "missing" ){
				create_view( req.model_name, keys, function( err ){

					if( err ){ return cb( err ); }
					return run_query( req, cb );
				} );

				return;
			}

			console.log( err );
			return cb( err );
		}

		return cb( null, viewResponse );
	} );
};

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
			return _failed( );
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

	// Lets get the users database; we're going to be doing something..
	getDatabase( req.session.identification, function( err, database ){
		req.db		= database;
		return cb( err, null );
	} );
} );

app.param( "model_name", function( req, res, cb, model_name ){

	// Prep the request object we're going to pass to *ouchdb.
	req.model_name = model_name;
	
	cb( );
} );

app.get( "/api/data/:model_name", function( req, res ){
	return run_query( req, function( err, queryResponse ){
		if( err ){ return res.json( 500, err ); }
		return res.json( queryResponse );
	} );
} );

app.post( "/api/data/:model_name", function( req, res ){
	
	if( Object.keys( req.body ).indexOf( req.model_name ) < 0 ){
		return res.json( false );
	}

	// Lets create the object that will be stored.
	var _obj = { dateCreated: new Date( ), dateModified: new Date( ), createdBy: req.session.identification };

	Object.keys(req.body[req.model_name]).forEach( function( key ){
		if( !_obj[key] ){
			_obj[key] = req.body[req.model_name][key];
		}
	} );

	req.db.insert( _obj, function( err, insertRes ){
		if( err ){ return res.json( err ); }
		
		var _returnObj = { };
		_returnObj[req.model_name] = [ _obj ];
		return res.json( _returnObj );
	} );
} );

app.get( "/api/data/:model_name/:model_id", function( req, res ){
	
} );

// At this point we can define more routes, assuming that the user
// is authenticated.

app.listen( config.port );
